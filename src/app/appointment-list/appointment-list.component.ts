import { AppiontmentService } from './../services/appiontment.service';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../services/appiontment';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  public appointments: Appointment[];
  public loading = true;
  message: any;
  messageClass: any;

  constructor(public appointService: AppiontmentService) { }

  ngOnInit(): void {
    this.appointService.getAppointment().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error) => {
        this.messageClass = 'alert alert-warning';
          this.message = error.error.message;
        this.loading = false;
      }
    );
  }

  cancelAppointment(id: string) {
    this.appointService
      .cancelAppointment(id)
      .pipe(mergeMap(() => this.appointService.getAppointment()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
            this.messageClass = 'alert alert-warning';
            this.message = 'Successfully cancelled appointment'

        },
        (error) => {
          this.messageClass = 'alert alert-warning';
          this.message = error.error.message;
        }
      );
  }

}
