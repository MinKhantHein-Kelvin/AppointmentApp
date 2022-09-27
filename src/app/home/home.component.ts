import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppiontmentService } from '../services/appiontment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: any;
  messageClass: any;
  appointmentDateSt : any
  today=new Date();
  bookingform = new FormGroup({
    appointmentDate: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get appointDate() {
    return this.bookingform.get('appointDate');
  }

  get Name() {
    return this.bookingform.get('name');
  }

  get Email() {
    return this.bookingform.get('email');
  }

  constructor(public appointService: AppiontmentService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveBooking() {
    if (this.bookingform.valid) {
      this.appointService
        .createAppointment(this.bookingform.value)
        .subscribe((res:any) => {
            console.log(res);
          if (!res.success) {
            this.messageClass = 'alert alert-warning';
            this.message = res.message;
          } else {
            console.log(res);
            this.messageClass = 'alert alert-success';
            this.appointmentDateSt = new Date(res.appointment.appointmentDate).toDateString();
            this.message = `${res.message} on ${this.appointmentDateSt}`
            this.bookingform.reset();
            setTimeout(() => {
              this.router.navigate(['appoint-list']);
            }, 2000);
          }
        });
    }
  }

}
