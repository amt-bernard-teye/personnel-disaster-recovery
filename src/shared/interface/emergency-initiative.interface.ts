import { State } from "@prisma/client";
import { Manager } from "./manager.interface";
import { EmergencyType } from "./emergency-type.interface";

export interface EmergencyInitiative {
  id?: number;
  dispatched_date: Date,
  location: string;
  emergencyTypeId?: number;
  description: string;
  managerId?: number;
  end_date: Date;
  state: State,
  manager?: Manager,
  emergencyType?: EmergencyType
}

export interface EmergencyInitiativeProp {
  id: boolean;
  created_at: boolean;
  dispatched_date: boolean;
  location: boolean;
  emergencyType: boolean;
  description: boolean;
  manager: boolean;
  end_date: boolean;
  state: boolean;
}