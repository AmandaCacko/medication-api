"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMedicines = listMedicines;
exports.searchMedicine = searchMedicine;
const medicine_service_1 = require("../services/medicine.service");
function listMedicines(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const medicines = yield (0, medicine_service_1.getAllMedicines)();
            res.json(medicines);
        }
        catch (error) {
            res.status(500).json({ message: "Error loading medicines", error: error.message || error });
        }
    });
}
function searchMedicine(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.query.name;
            if (!name) {
                return res.status(400).json({ message: "The 'name' parameter is required" });
            }
            const result = yield (0, medicine_service_1.getMedicineByName)(name);
            if (result.length === 0) {
                return res.status(404).json({ message: "No medicines found" });
            }
            res.json(result);
        }
        catch (error) {
            res.status(500).json({ message: "Error searching medicine", error: error.message || error });
        }
    });
}
