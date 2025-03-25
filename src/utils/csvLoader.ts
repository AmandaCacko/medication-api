import fs from "fs";
import path from "path";
import iconv from "iconv-lite";
import { Medicine } from "../models/medicine.model";
import { REGULATORY_CATEGORY, REGISTRATION_STATUS } from "../models/enums";

const CSV_FILE_PATH = path.resolve(__dirname, "../../data/DADOS_ABERTOS_MEDICAMENTOS.csv");

export const loadMedicines = async (): Promise<Medicine[]> => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(CSV_FILE_PATH)) {
      return reject(new Error("CSV file not found"));
    }

    fs.readFile(CSV_FILE_PATH, (err, buffer) => {
      if (err) return reject(err);

      let data = iconv.decode(buffer, "ISO-8859-1");

      const cleanText = (text: string) =>
        text
          .trim(); 

      data = data.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

      const entries = data.split('\n"MEDICAMENTO"').map((entry, index) =>
        index === 0 ? entry : `"MEDICAMENTO"${entry}`
      );

      const medicines: Medicine[] = [];

      for (const entry of entries) {
        const columns = entry.split(";").map(col =>
          cleanText(col.replace(/^"|"$/g, ""))
        );

        if (columns.length >= 11) {
          const medicine: Medicine = {
            PRODUCT_TYPE: columns[0] || "",
            PRODUCT_NAME: columns[1] || "",
            PROCESS_FINALIZATION_DATE: columns[2] || "",
            REGULATORY_CATEGORY: (Object.values(REGULATORY_CATEGORY) as string[]).includes(columns[3]) 
              ? (columns[3] as REGULATORY_CATEGORY) 
              : REGULATORY_CATEGORY.OUTRO,
            PRODUCT_REGISTRATION_NUMBER: columns[4] || "",
            REGISTRATION_EXPIRATION_DATE: columns[5] || "",
            PROCESS_NUMBER: columns[6] || "",
            THERAPEUTIC_CLASS: columns[7] || "",
            REGISTRATION_HOLDER_COMPANY: columns[8] || "",
            REGISTRATION_STATUS: (Object.values(REGISTRATION_STATUS) as string[]).includes(columns[9]) 
              ? (columns[9] as REGISTRATION_STATUS) 
              : REGISTRATION_STATUS.DESCONHECIDO,
            ACTIVE_INGREDIENT: columns[10] || "",
          };

          medicines.push(medicine);
        }
      }

      console.log("Medicines loaded:", medicines);
      resolve(medicines);
    });
  });
};
