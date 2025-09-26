import { Component } from "@angular/core";
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
  ],
})
export class ReservationsPageComponent {
  private router = inject(Router);
}
