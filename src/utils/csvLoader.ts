import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { Medicine } from "../models/medicine.model";

const CSV_FILE_PATH = path.resolve(__dirname, "../../data/DADOS_ABERTOS_MEDICAMENTOS.csv");

export const loadMedicines = async (): Promise<Medicine[]> => {
  return new Promise((resolve, reject) => {
    const medicines: Medicine[] = [];

    if (!fs.existsSync(CSV_FILE_PATH)) {
      return reject(new Error("CSV file not found"));
    }

    fs.createReadStream(CSV_FILE_PATH, { encoding: "utf8" })
      .pipe(csvParser({
        separator: ";",
        quote: '"',
        headers: [
          "TIPO_PRODUTO", "NOME_PRODUTO", "DATA_FINALIZACAO_PROCESSO", 
          "CATEGORIA_REGULATORIA", "NUMERO_REGISTRO_PRODUTO", 
          "DATA_VENCIMENTO_REGISTRO", "NUMERO_PROCESSO", "CLASSE_TERAPEUTICA", 
          "EMPRESA_DETENTORA_REGISTRO", "SITUACAO_REGISTRO", "PRINCIPIO_ATIVO"
        ]
      }))
      .on("data", (data) => {
        const medicine: Medicine = {
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
};
