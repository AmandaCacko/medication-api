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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMedicines = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const CSV_FILE_PATH = path_1.default.join(__dirname, "../../data/medicamentos.csv");
const loadMedicines = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const medicines = [];
        if (!fs_1.default.existsSync(CSV_FILE_PATH)) {
            return reject(new Error("CSV file not found"));
        }
        fs_1.default.createReadStream(CSV_FILE_PATH)
            .pipe((0, csv_parser_1.default)({ separator: ";", headers: true }))
            .on("data", (data) => {
            const medicine = {
                PRODUCT_TYPE: (data["TIPO_PRODUTO"] || "").trim(),
                PRODUCT_NAME: (data["NOME_PRODUTO"] || "").trim(),
                PROCESS_FINALIZATION_DATE: (data["DATA_FINALIZACAO_PROCESSO"] || "").trim(),
                REGULATORY_CATEGORY: (data["CATEGORIA_REGULATORIA"] || "").trim(),
                PRODUCT_REGISTRATION_NUMBER: (data["NUMERO_REGISTRO_PRODUTO"] || "").trim(),
                REGISTRATION_EXPIRATION_DATE: (data["DATA_VENCIMENTO_REGISTRO"] || "").trim(),
                PROCESS_NUMBER: (data["NUMERO_PROCESSO"] || "").trim(),
                THERAPEUTIC_CLASS: (data["CLASSE_TERAPEUTICA"] || "").trim(),
                REGISTRATION_HOLDER_COMPANY: (data["EMPRESA_DETENTORA_REGISTRO"] || "").trim(),
                REGISTRATION_STATUS: (data["SITUACAO_REGISTRO"] || "").trim(),
                ACTIVE_INGREDIENT: (data["PRINCIPIO_ATIVO"] || "").trim(),
            };
            medicines.push(medicine);
        })
            .on("end", () => resolve(medicines))
            .on("error", (error) => reject(error));
    });
});
exports.loadMedicines = loadMedicines;
