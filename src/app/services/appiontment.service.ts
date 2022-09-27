import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './appiontment';

@Injectable({
  providedIn: 'root'
})
export class AppiontmentService {
  public base_Url = "http://localhost:8080/appiontment";

  constructor(private http$: HttpClient) { }

  getAppointment(): Observable<Appointment[]> {
    return this.http$.get<Appointment[]>(`${this.base_Url}`);
  }

  createAppointment(booking :any): Observable<Appointment[]> {
    return this.http$.post<Appointment[]>(
      `${this.base_Url}`,
      booking
    );
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http$.delete(`${this.base_Url}/${id}`);
  }
}
