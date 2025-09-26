import { Component, ViewChild } from "@angular/core";
import { AddReservationComponent } from "./add-reservation/add-reservation.component";
import { ReservationsTableComponent } from "./reservations-table/reservations-table.component";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { IonButton, IonCol, IonRow } from "@ionic/angular/standalone";
import { RouterLink } from "@angular/router";

import {
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
} from "@ionic/angular/standalone";
import {
  AlertController,
  Config,
  IonFab,
  IonFabButton,
  IonFabList,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonListHeader,
  IonRouterOutlet,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  LoadingController,
  ModalController,
  ToastController,
} from "@ionic/angular/standalone";
import { Reservation } from "../../models/reservation.model";

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
    ReservationsTableComponent,
  ],
})
export class ReservationsPageComponent {
  @ViewChild("table") table!: ReservationsTableComponent;

  // Questo metodo viene chiamato quando AddReservation emette `added`
  onNewReservation(reservation: Reservation) {
    console.log("📌 Nuova prenotazione ricevuta dal form:", reservation);

    // due opzioni:
    // 1. Aggiorni direttamente la tabella aggiungendo alla lista
    // this.table.reservations.push(reservation);

    // 2. Più pulito: ricarichi dal backend
    this.table.loadReservations();
  }
}
