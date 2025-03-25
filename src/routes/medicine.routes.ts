import express, { Request, Response } from "express";
import { listMedicines, searchMedicine, listMedicinesNames} from "../controllers/medicine.controller";

const router = express.Router();

/**
 * @swagger
 * /medicines/listAll:
 *   get:
 *     summary: Retorna a lista de medicamentos
 *     responses:
 *       200:
 *         description: Lista de medicamentos retornada com sucesso.
 */
router.get("/listAll", listMedicines);

/**
 * @swagger
 * /medicines/searchName:
 *   get:
 *     summary: Pesquisa medicamentos por nome
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nome do medicamento a ser pesquisado
 *     responses:
 *       200:
 *         description: Lista de medicamentos encontrados.
 */
router.get("/searchName", (req: Request, res: Response) => {
    searchMedicine(req, res).catch(error => {
        console.error("Erro ao buscar medicamento:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    });
});


/**
 * @swagger
 * /medicines/names:
 *   get:
 *     summary: Retorna a lista de nomes de medicamentos
 *     responses:
 *       200:
 *         description: Lista de nomes de medicamentos retornada com sucesso.
 */
router.get("/names", (req: Request, res: Response) => {
    listMedicinesNames(req, res).catch(error => {
        console.error("Erro ao listar nomes de medicamentos:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    });
});

/**
 * @swagger
 * /medicines/searchRegistry:
 *   get:
 *     summary: Pesquisa medicamentos por número de registro
 *     parameters:
 *       - in: query
 *         name: registryNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Número de registro a ser pesquisado
 *     responses:
 *       200:
 *         description: Lista de medicamentos encontrados.
 */
router.get("/searchRegistry", (req: Request, res: Response) => {
    searchMedicine(req, res).catch(error => {
        console.error("Erro ao buscar medicamento:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    });
});

export default router;
