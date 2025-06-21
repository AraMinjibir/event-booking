import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../Model/booking';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/books`;
 
  
  constructor(private http: HttpClient) {}

  bookEvent(eventId: number, selectedSeats: string[]): Observable<Booking[]>{
   return this.http.post<Booking[]>(this.apiUrl, {eventId,
    selectedSeats});
    
  }

  getBook():Observable<Booking[]>{
    return this.http.get<Booking[]>(this.apiUrl);
  }

  getUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/history`);
  }
  deleteBooking(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  updateBooking(id: number, booking: Partial<Booking>): Observable<Booking> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking);
  }
  getBookedSeats(eventId: number): Observable<string[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<string[]>(`${this.apiUrl}/booked-seats/${eventId}`, { headers });
  }
    
  updateBookingAsAdmin(id: number, booking: Booking) {
    return this.http.put<Booking>(`${this.apiUrl}/admin/update/${id}`, booking);
  }
  
  deleteBookingAsAdmin(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/delete/${id}`);
  }
  
}
