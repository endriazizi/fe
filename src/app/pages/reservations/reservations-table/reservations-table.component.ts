import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_BASE_URL } from "../../../config";
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

@Component({
  selector: "app-reservations-table",
  imports: [IonicModule, CommonModule],
  templateUrl: "./reservations-table.component.html",
  styleUrl: "./reservations-table.component.css",
})
export class ReservationsTableComponent implements OnInit {
  reservations: Reservation[] = [];
  loading = false;

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
}
