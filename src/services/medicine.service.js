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
exports.getMedicineByName = exports.getAllMedicines = void 0;
const csvLoader_1 = require("../utils/csvLoader");
let cachedMedicines = [];
const getAllMedicines = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedMedicines.length === 0) {
        cachedMedicines = yield (0, csvLoader_1.loadMedicines)();
    }
    return cachedMedicines;
});
exports.getAllMedicines = getAllMedicines;
const getMedicineByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    // Aproveitando o cache se ele estiver disponível
    const medicines = cachedMedicines.length > 0 ? cachedMedicines : yield (0, csvLoader_1.loadMedicines)();
    return medicines.filter(med => med.PRODUCT_NAME.toLowerCase().includes(name.toLowerCase()));
});
exports.getMedicineByName = getMedicineByName;
