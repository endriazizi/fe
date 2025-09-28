import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ReservationService } from "../../../services/reservation.service";
import { Reservation } from "../../../models/reservation.model";
import { IonicModule, ToastController } from "@ionic/angular";
import { CommonModule, JsonPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-edit-reservation",
  standalone: true,
  templateUrl: "./edit-reservation.component.html",
  styleUrls: ["./edit-reservation.component.css"],

  imports: [CommonModule, ReactiveFormsModule, IonicModule, FormsModule],
})
export class EditReservationComponent {
  @Input() reservation!: Reservation;
  @Output() updated = new EventEmitter<Reservation>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private reservationsService: ReservationService) {}

  save() {
    if (!this.reservation.id) return;

    this.reservationsService
      .update(this.reservation.id, this.reservation)
      .subscribe({
        next: (res) => {
          console.log("✅ Prenotazione aggiornata:", res);
          this.updated.emit(res);
        },
        error: (err) =>
          console.error("❌ Errore aggiornamento prenotazione", err),
      });
  }

  close() {
    this.cancel.emit();
  }
}
