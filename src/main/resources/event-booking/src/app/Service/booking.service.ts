import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../Model/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = "http://localhost:8080/api/books";
 
  
  constructor(private http: HttpClient) {}

  bookEvent(eventId: number, selectedSeats: string[]): Observable<Booking[]>{
   return this.http.post<Booking[]>(this.apiUrl, {eventId,
    selectedSeats});
    
  }

  getBook():Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl);
  }
}
