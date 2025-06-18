import { Component } from '@angular/core';
import { Booking } from '../../Model/booking';
import { BookingService } from '../../Service/booking.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'book-history',
  imports: [DatePipe, NgFor, FormsModule,DialogModule,
    ButtonModule,
    InputNumberModule, NgIf],
  templateUrl: './book-history.component.html',
  styleUrl: './book-history.component.scss'
})
export class BookHistoryComponent {

  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  displayEditDialog = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (data) => (this.bookings = data),
      error: (err) => console.error('Failed to load booking history', err),
    });
  }
  

  deleteBooking(id: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(id).subscribe({
        next: () => this.bookings = this.bookings.filter(b => b.id !== id),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  openEditDialog(booking: Booking) {
    this.selectedBooking = { ...booking }; 
    this.displayEditDialog = true;
  }
  
  closeDialog() {
    this.displayEditDialog = false;
    this.selectedBooking = null;
  }
  
  saveBookingUpdate() {
    if (!this.selectedBooking) return;
  
    this.bookingService.updateBooking(this.selectedBooking.id, this.selectedBooking).subscribe({
      next: (updatedBooking) => {
        const index = this.bookings.findIndex(b => b.id === updatedBooking.id);
        if (index !== -1) this.bookings[index] = updatedBooking;
        this.closeDialog();
      },
      error: (err) => console.error("Update failed", err)
    });
  }
}
