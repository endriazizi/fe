export interface Reservation {
  id?: number;
  room_id: number;
  room_name?: string;
  user_nome: string;
  user_cognome: string;
  numero_persone: number;
  phone: string;
  date_reservation: string;
  time_reservation: string;
  occasion?: string;
  intolerances?: string;
  status?: string;
}
