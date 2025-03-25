import { Request, Response } from "express";
import { getMedicineByName, getAllMedicines, getAllMedicinesNames, getMedicineByRegistryNumber } from "../services/medicine.service";
import { REGULATORY_CATEGORY, REGISTRATION_STATUS } from "../models/enums";

export async function listMedicines(req: Request, res: Response) {
    try {
        const medicines = await getAllMedicines();
        res.json(medicines);
    } catch (error: any) {
        console.error("Error loading medicines:", error);
        res.status(500).json({ message: "Error loading medicines", error: error.message || error });
    }
}

export async function searchMedicine(req: Request, res: Response) {
    try {
        const { name, registryNumber, category } = req.query;

        if (registryNumber) {
            const result = await getMedicineByRegistryNumber(registryNumber as string);
            if (result.length === 0) {
                return res.status(404).json({ message: "Nenhum medicamento encontrado para o número de registro fornecido." });
            }
            return res.json(result);
        }

        if (name) {
            const result = await getMedicineByName(name as string);
            if (result.length === 0) {
                return res.status(404).json({ message: "Nenhum medicamento encontrado com o nome fornecido." });
            }
            return res.json(result);
        }

        if (category) {
            const validCategory = Object.values(REGULATORY_CATEGORY).includes(category as any);
            if (!validCategory) {
                return res.status(400).json({ message: "Categoria regulatória inválida." });
            }
            const result = (await getAllMedicines()).filter(med => med.REGULATORY_CATEGORY === category);
            return res.json(result);
        }

        return res.status(400).json({ message: "Parâmetro 'name' ou 'registryNumber' é necessário." });
        
    } catch (error: any) {
        console.error("Erro ao buscar medicamento:", error);
        res.status(500).json({ message: "Erro ao buscar medicamento", error: error.message || error });
    }
}


export async function listMedicinesNames(req: Request, res: Response) {
    try {
        const medicineNames = await getAllMedicinesNames();
        res.json(medicineNames);
    } catch (error: any) {
        console.error("Error loading medicine names:", error);
        res.status(500).json({ message: "Error loading medicine names", error: error.message || error });
    }
}

export function listEnumValues(req: Request, res: Response) {
    res.json({
        REGULATORY_CATEGORY: Object.values(REGULATORY_CATEGORY),
        REGISTRATION_STATUS: Object.values(REGISTRATION_STATUS),
    });
}

