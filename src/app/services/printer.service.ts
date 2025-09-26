import { Injectable } from "@angular/core";
// const ThermalPrinter = require("node-thermal-printer").printer;
// const PrinterTypes = require("node-thermal-printer").types;
import { printer as ThermalPrinter, types as PrinterTypes } from "node-thermal-printer";

@Injectable({ providedIn: "root" })
export class PrinterService {
  private printer: any;

  constructor() {
    this.printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: "tcp://192.168.0.100", // cambia con IP stampante
      options: { timeout: 5000 },
    });
  }

  async checkConnection(): Promise<boolean> {
    const isConnected = await this.printer.isPrinterConnected();
    if (!isConnected) console.error("❌ Stampante non connessa!");
    return isConnected;
  }

  async printAllInBlock(reservations: any[]) {
    if (!(await this.checkConnection())) return;

    this.printer.alignCenter();
    this.printer.bold(true);
    this.printer.println("📝 ELENCO PRENOTAZIONI");
    this.printer.bold(false);

    this.printer.println(`📅 ${new Date().toLocaleString()}`);
    this.printer.println("----------------------------------------");

    this.printer.alignLeft();
    reservations.forEach((r) => {
      this.printer.println(`🏠 ${r.room_name} | 👤 ${r.user_name}`);
      this.printer.println(`📅 ${r.date_reservation} ⏰ ${r.time_reservation}`);
      this.printer.println("----------------------------------------");
    });

    this.printer.cut();
    await this.printer.execute();
  }

  async printEachReservation(reservations: any[]) {
    if (!(await this.checkConnection())) return;

    for (const r of reservations) {
      this.printer.alignCenter();
      this.printer.bold(true);
      this.printer.println("📝 PRENOTAZIONE");
      this.printer.bold(false);

      this.printer.alignLeft();
      this.printer.println(`🏠 Stanza: ${r.room_name}`);
      this.printer.println(`👤 Cliente: ${r.user_name}`);
      this.printer.println(`📅 Data: ${r.date_reservation}`);
      this.printer.println(`⏰ Ora: ${r.time_reservation}`);
      if (r.occasion) this.printer.println(`🎉 Occasione: ${r.occasion}`);
      if (r.intolerances)
        this.printer.println(`⚠️ Intolleranze: ${r.intolerances}`);

      this.printer.println("----------------------------------------");
      this.printer.cut();
    }

    await this.printer.execute();
  }
}
