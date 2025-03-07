import { loadMedicines } from "../utils/csvLoader";
import { Medicine } from "../models/medicine.model";

let cachedMedicines: Medicine[] = [];

export const getAllMedicines = async (): Promise<Medicine[]> => {
  if (cachedMedicines.length === 0) {
    cachedMedicines = await loadMedicines();
  }
  return cachedMedicines;
};

export const getMedicineByName = async (name: string): Promise<Medicine[]> => {
  const medicines = cachedMedicines.length > 0 ? cachedMedicines : await loadMedicines();
  const regex = new RegExp(name, 'i');
  return medicines.filter(med =>
    regex.test(med.PRODUCT_NAME)
  );
};
