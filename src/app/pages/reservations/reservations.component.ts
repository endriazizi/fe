import { Component, ViewChild } from "@angular/core";
import { AddReservationComponent } from "./add-reservation/add-reservation.component";
import { ReservationsTableComponent } from "./reservations-table/reservations-table.component";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RouterLink } from "@angular/router";
import { environment } from "../../../environments/environment";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  PopoverController,
  IonTitle,
  IonFab,
  IonFabButton,
  ToastController,
} from "@ionic/angular/standalone";

import { Reservation } from "../../models/reservation.model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.component.html",
  // styleUrl: "./reservations.component.css",

  imports: [
    AddReservationComponent,
    AddReservationComponent,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonMenuButton,
    IonTitle,
    IonIcon,
    IonButton,
    IonFab,
    IonFabButton,

    ReservationsTableComponent,
  ],
})
export class ReservationsPageComponent {
  @ViewChild("table") table!: ReservationsTableComponent;

  // --- Inject HttpClient ---
  constructor(private http: HttpClient, private toastCtrl: ToastController) {} // <--- aggiungi questo

  // // Questo metodo viene chiamato quando AddReservation emette `added`
  // onNewReservation(reservation: Reservation) {
  //   console.log("📌 Nuova prenotazione ricevuta dal form:", reservation);

  //   // due opzioni:
  //   // 1. Aggiorni direttamente la tabella aggiungendo alla lista
  //   // this.table.reservations.push(reservation);

  //   // 2. Più pulito: ricarichi dal backend
  //   this.table.loadReservations();
  // }

  onNewReservation(reservation: Reservation) {
    console.log("📌 Nuova prenotazione:", reservation);
    this.table.loadReservations();
  }

  async printReservations() {
    if (!this.table || !this.table.reservations?.length) {
      this.showToast("⚠️ Nessuna prenotazione da stampare", "warning");
      return;
    }

    const reservations: Reservation[] = this.table.reservations;

    try {
      const res = await this.http
        .post(`${environment.apiUrl}/api/v1/print-reservations`, reservations, {
          responseType: "json",
        })
        .toPromise();

      console.log("✅ Stampa inviata con successo", res);
      this.showToast("📄 Stampa inviata con successo!", "success");
    } catch (error: any) {
      console.error("❌ Errore HTTP durante la stampa:", error);
      this.showToast(
        "❌ Errore durante la stampa: " + (error.message || "Unknown error"),
        "danger"
      );
    }
  }

  private async showToast(
    message: string,
    color: "success" | "danger" | "warning" = "success"
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color,
      position: "top",
    });
    toast.present();
  }
}
