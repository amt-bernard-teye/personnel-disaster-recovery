import { EmergencyInitiative } from "./emergency-initiative.interface";
import { Personnel } from "./personnel.interface";

export interface EmergencyInitiativePersonnel {
  id?: number;
  emergencyInitiativeId?: number;
  emergencyInitiative?: EmergencyInitiative;
  personnelId?: number;
  personnel?: Personnel
}

export interface EmergencyInitiativePersonnelProp {
  emergencyInitiative: boolean;
  personnel: boolean
}