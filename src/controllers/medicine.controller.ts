import { Request, Response } from "express";
import { getMedicineByName, getAllMedicines } from "../services/medicine.service";

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
        const name = req.query.name as string;

        if (!name || !name.trim()) { // Evita nome vazio ou apenas espaços
            return res.status(400).json({ message: "The 'name' parameter is required" });
        }

        const result = await getMedicineByName(name);
        
        if (result.length === 0) {
            return res.status(404).json({ message: "No medicines found" });
        }

        res.json(result);
    } catch (error: any) {
        console.error("Error searching medicine:", error);
        res.status(500).json({ message: "Error searching medicine", error: error.message || error });
    }
}
