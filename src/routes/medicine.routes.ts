import express, { Request, Response } from "express";
import { listMedicines, searchMedicine } from "../controllers/medicine.controller";

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
 * /medicines/search:
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
router.get("/search", async (req: Request, res: Response) => await listMedicines(req, res));

export default router;
