import { Component, Input, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-reservations-table",
  imports: [],
  templateUrl: "./reservations-table.component.html",
  styleUrl: "./reservations-table.component.css",
})
export class ReservationsTableComponent implements OnInit {
  reservations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.http
      .get<any[]>("/api/v1/reservations")
      .subscribe((data) => (this.reservations = data));
  }

  onNew(res: any) {
    this.load(); // ricarica lista
  }
}
