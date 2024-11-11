export interface DoctorSchedule {
  id : number;
  day_of_week : string;
  start_time? : string;
  end_time? : string;
  startTime : string;
  endTime :string;
  slot_duration : string;
  total_slots : number;
  status : number;
  doctor_id : number;
}


