import { Profession } from "./profession.interface";

export interface EmergencyInitiativeProfession {
  id?: number;
  professionId: number;
  profession?: Profession;
  number: number;
}