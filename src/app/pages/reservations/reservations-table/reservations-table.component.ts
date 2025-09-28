import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { API_BASE_URL } from "../../../config";
import { Observable } from "rxjs";
import { ReservationService } from "../../../services/reservation.service";

import { Reservation } from "../../../models/reservation.model";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  IonRow,
} from "@ionic/angular/standalone";
import { IonicModule, IonLabel, IonList } from "@ionic/angular";
import { EditReservationComponent } from "../edit-reservation/edit-reservation.component";

@Component({
  selector: "app-reservations-table",
  standalone: true,
  imports: [IonicModule, CommonModule, EditReservationComponent],
  templateUrl: "./reservations-table.component.html",
  styleUrl: "./reservations-table.component.css",
})
export class ReservationsTableComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = false;

  // Per gestione modal
  editOpen = false;
  selectedReservation: Reservation | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;
    this.reservationService.getAll().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  deleteReservation(id: number) {
    this.reservationService.delete(id).subscribe({
      next: () => {
        console.log(`🗑️ Prenotazione ${id} eliminata`);
        this.loadReservations();
      },
      error: (err) => console.error("❌ Errore eliminazione prenotazione", err),
    });
  }

  openEdit(reservation: Reservation) {
    this.selectedReservation = { ...reservation }; // clone
    this.editOpen = true;
  }

  onUpdated(updated: Reservation) {
    console.log("✏️ Prenotazione aggiornata:", updated);
    this.editOpen = false;
    this.loadReservations();
  }
}
