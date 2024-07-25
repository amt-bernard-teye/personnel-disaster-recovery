import { AvailabilityStatus } from "@prisma/client";

export interface Manager {
  id?: number;
  created_at?: Date;
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  status?: AvailabilityStatus
}

export interface ManagerProp {
  id: boolean;
  created_at: boolean;
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
  image: boolean;
  status: boolean;
}