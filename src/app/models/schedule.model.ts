import { ConsultingRoom } from "./consultingRoom.model";
import { Doctor } from "./doctor.model";
import { Specialty } from "./specialty.model";

export interface Schedule {
  id : string,
  dayOfWeek : string,
  startTime : string,
  endTime : string,
  slotDuration : string,
  totalSlots : string,
  doctor? :Doctor,
  speciality? : Specialty,
  consultingRoom? : ConsultingRoom,
}
