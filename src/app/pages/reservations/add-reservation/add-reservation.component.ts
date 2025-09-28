import { environment } from "./../../../../environments/environment";
import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonModule, JsonPipe } from "@angular/common";
import { IonicModule, ToastController } from "@ionic/angular";
// import { API_BASE_URL } from "../../../config";

@Component({
  selector: "app-add-reservation",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, JsonPipe],
  templateUrl: "./add-reservation.component.html",
  styleUrls: ["./add-reservation.component.css"],
})
export class AddReservationComponent implements OnInit {
  @Output() added = new EventEmitter();

  form: FormGroup;
  rooms: any[] = [];
  loadingRooms = true;
  submitting = false;
  availableTimes: string[] = [];

  today: string = new Date().toISOString();
  selectedTime: string = "19:00"; // default
  combinedDateTime: string = "";

  readonly timeSlots: string[] = Array.from(
    { length: 8 }, // Cambiato a 13 per coprire da 19:00 a 22:00
    (_, i) => {
      const hour = 19 + Math.floor(i / 4); // Inizia da 19 e incrementa per ora
      const min = (i % 4) * 15; // 0, 15, 30, 45 minuti

      // Genera la stringa dell'ora
      return `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
    }
  );

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {
    console.log(
      "⏰ Orarithis.today, this.selectedTime);",
      this.today,
      "-",
      this.selectedTime
    );

    this.updateDateTime(this.today, this.selectedTime);

    console.log(
      "⏰ Orari disponibili this.updateDateTime(this.today, this.selectedTime);:",
      this.updateDateTime(this.today, this.selectedTime)
    );
    // inizializza il form
    this.form = this.fb.group({
      user_nome: ["", Validators.required],
      user_cognome: ["", Validators.required],
      numero_persone: [1, Validators.required], // 👈 default = 1
      date_reservation: [this.today, Validators.required], // 👈 default = oggi
      time_reservation: [this.selectedTime, Validators.required], // 👈 default = 19:00
      phone: ["", Validators.nullValidator],
      occasion: ["Cena tra Amici", Validators.nullValidator],
      intolerances: ["--", Validators.nullValidator],
      room_id: [3, Validators.required],
    });
  }

  ngOnInit() {
    console.log("🟢 AddReservationComponent inizializzato");
    this.generateTimes();
    this.loadRooms();

    console.log("Initial Form Value:", this.form.value);
  }

  personeOptions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  formattedTime: string = "";

  formattedDate: string = "";
  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    //   // Il valore di event.detail.value è l'ISO string selezionata (es. "2024-06-25T...")
    const selectedDateValue = event.detail.value;
    this.form.get("date_reservation").setValue(selectedDateValue);
    this.formattedDate = date.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      //timeZone: "Europe/Rome",
    });
    console.log(`✅ Stanze caricate: `, this.formattedDate);
  }

  onTimeChange(event: any) {
    const date = new Date(event.detail.value);
    this.formattedTime = date.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Rome",
    });
  }

  updateDateTime(dateIso?: string, time?: string) {
    const date = dateIso ? new Date(dateIso) : new Date();
    const formattedDate = date.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Rome",
    });
    this.combinedDateTime = `${formattedDate} - ${time || this.selectedTime}`;
  }

  selectTime(slot: string) {
    this.selectedTime = slot; // Aggiorna la variabile per l'highlighting della card

    // 1. Aggiorna il Form Control
    this.form.get("time_reservation").setValue(slot);

    // 2. Aggiorna la visualizzazione combinata
    if (this.formattedDate) {
      this.combinedDateTime = `${this.formattedDate} - ${this.selectedTime}`;
    }
  }

  generateTimes() {
    const times: string[] = [];
    let start = 7 * 60; // 07:00 in minuti
    const end = 20 * 60; // 22:00 in minuti
    while (start <= end) {
      const h = Math.floor(start / 60);
      const m = start % 60;
      times.push(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      );
      start += 30;
    }
    this.availableTimes = times;
    console.log("⏰ Orari disponibili:", this.availableTimes);
  }

  loadRooms() {
    console.log("📡 Caricamento stanze...");
    this.loadingRooms = true;
    // this.http.get(`${environment.apiUrl}/reservations`);
    this.http.get<any[]>(`${environment.apiUrl}/api/v1/rooms`).subscribe({
      next: (r) => {
        this.rooms = r;
        this.loadingRooms = false;
        console.log(`✅ Stanze caricate: ${r.length}`, r);
      },
      error: async (err) => {
        this.loadingRooms = false;
        console.error("❌ Errore caricamento stanze:", err);
        const toast = await this.toastCtrl.create({
          message: "❌ Errore caricamento stanze",
          duration: 2000,
          color: "danger",
        });
        toast.present();
      },
    });
  }

  async submit() {
    console.log("📝 Invio form prenotazione", this.form.value);
    console.log("⏰ this.form.invalid:", this.form.invalid);

    console.log("⏰ form", this.form);
    if (this.form.invalid) {
      console.warn("⚠️ Form non valido!");
      const toast = await this.toastCtrl.create({
        message: "⚠️ Compila tutti i campi richiesti",
        duration: 2000,
        color: "warning",
      });
      toast.present();
      return;
    }

    this.submitting = true;

    this.http
      .post(`${environment.apiUrl}/api/v1/reservations`, this.form.value)
      .subscribe({
        next: async (res) => {
          console.log("✅ Prenotazione inviata con successo", res);
          this.submitting = false;

          const toast = await this.toastCtrl.create({
            message: "✅ Prenotazione creata con successo!",
            duration: 2000,
            color: "success",
          });
          toast.present();

          this.added.emit(res);
          this.form.reset();
        },
        error: async (err) => {
          console.error("❌ Errore invio prenotazione", err);
          this.submitting = false;

          const toast = await this.toastCtrl.create({
            message: "❌ Errore invio prenotazione",
            duration: 2000,
            color: "danger",
          });
          toast.present();
        },
      });
  }
}
