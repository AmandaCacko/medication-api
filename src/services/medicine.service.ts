import { loadMedicines } from "../utils/csvLoader";
import { Medicine } from "../models/medicine.model";

let cachedMedicines: Medicine[] = [];

const ensureMedicinesLoaded = async () => {
  if (cachedMedicines.length === 0) {
    cachedMedicines = await loadMedicines();
  }
};

export const getAllMedicines = async (): Promise<Medicine[]> => {
  await ensureMedicinesLoaded();
  return cachedMedicines;
};

export const getMedicineByName = async (name: string): Promise<Medicine[]> => {
  await ensureMedicinesLoaded();
  
  const trimmedName = name.trim();
  const regex = new RegExp(trimmedName, 'i');
  
  return cachedMedicines.filter(med => regex.test(med.PRODUCT_NAME.trim()));
};
