import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reservation } from "../models/reservation.model";

// import { API_BASE_URL } from "../../config";

@Injectable({ providedIn: "root" })
export class ReservationService {
  // private apiUrl = environment.apiUrl;
  //   private baseUrl = `${apiUrl}/reservations`;
  // apiUrl = "https://dev.endriazizi.com/api/v1";
  // apiUrl = "http://localhost:3000/api/v1";

  // .post(`${environment.apiUrl}/reservations`, this.form.value)
  private baseUrl = `${environment.apiUrl}/api/v1/reservations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  create(reservation: Reservation): Observable<any> {
    return this.http.post(this.baseUrl, reservation);
  }

  update(id: number, reservation: Reservation): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, reservation);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
