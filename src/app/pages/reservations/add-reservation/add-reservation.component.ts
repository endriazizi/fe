import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-reservation",
  imports: [],
  templateUrl: "./add-reservation.component.html",
  styleUrl: "./add-reservation.component.css",
})
export class AddReservationComponent {
  @Output() added = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      room_id: ["", Validators.required],
      user_name: ["", Validators.required],
      phone: ["", Validators.required],
      date_reservation: ["", Validators.required],
      time_reservation: ["", Validators.required],
      occasion: ["Altro"],
      intolerances: [""],
    });
  }

  submit() {
    if (this.form.valid) {
      this.http
        .post("/api/v1/reservations", this.form.value)
        .subscribe((res) => {
          this.added.emit(res);
          this.form.reset({ occasion: "Altro" });
        });
    }
  }
}
