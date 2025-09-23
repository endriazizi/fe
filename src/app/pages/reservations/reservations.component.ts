import { Component } from "@angular/core";
import { AddReservationComponent } from "./add-reservation/add-reservation.component";
import { ReservationsTableComponent } from "./reservations-table/reservations-table.component";
import { Router } from "@angular/router";
import { AfterViewInit, inject } from "@angular/core";

@Component({
  selector: "app-reservations",
  templateUrl: "./reservations.component.html",
  // styleUrl: "./reservations.component.css",
  imports: [AddReservationComponent, ReservationsTableComponent],
  template: `
    <ion-header
      ><ion-toolbar
        ><ion-title>Prenotazioni</ion-title></ion-toolbar
      ></ion-header
    >
    <ion-content>
      <add-reservation (added)="table.onNew($event)"></add-reservation>
      <reservations-table #table></reservations-table>
    </ion-content>
  `,
})
export class ReservationsPageComponent {
  private router = inject(Router);
}
