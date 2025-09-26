export interface Reservation {
  id?: number;
  room_id: number;
  room_name?: string;
  user_name: string;
  phone: string;
  date_reservation: string;
  time_reservation: string;
  occasion?: string;
  intolerances?: string;
  status?: string;
}
