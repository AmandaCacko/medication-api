import { loadMedicines } from "../utils/csvLoader";
import { Medicine } from "../models/medicine.model";
import { REGULATORY_CATEGORY, REGISTRATION_STATUS } from "../models/enums";

let cachedMedicines: Medicine[] = [];

const mapToEnum = <T extends Record<string, string | number>>(value: string, enumType: T): T[keyof T] | undefined => {
  return Object.values(enumType).includes(value) ? (value as T[keyof T]) : undefined;
};


const ensureMedicinesLoaded = async () => {
  if (cachedMedicines.length === 0) {
    cachedMedicines = (await loadMedicines()).map(medicine => ({
      ...medicine,
      REGULATORY_CATEGORY: mapToEnum(medicine.REGULATORY_CATEGORY, REGULATORY_CATEGORY) || medicine.REGULATORY_CATEGORY,
      REGISTRATION_STATUS: mapToEnum(medicine.REGISTRATION_STATUS, REGISTRATION_STATUS) || medicine.REGISTRATION_STATUS
    }));
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

export const getAllMedicinesNames = async (): Promise<string[]> => {
  await ensureMedicinesLoaded();
  const uniqueNames = new Set(cachedMedicines.map(med => med.PRODUCT_NAME.trim()));
  return Array.from(uniqueNames);
};

export const getMedicineByRegistryNumber = async (registryNumber: string): Promise<Medicine[]> => {
  await ensureMedicinesLoaded();
  const trimmedRegistryNumber = registryNumber.trim();
  return cachedMedicines.filter(med => med.PRODUCT_REGISTRATION_NUMBER.trim() === trimmedRegistryNumber);
};
