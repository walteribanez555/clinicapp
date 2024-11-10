import { User } from "./user.model";

export interface Patient {
  id : number;
  address: string;
  phone :string;
  birthdate : string;
  user : User;
}


