import { Component, inject } from '@angular/core';
import { Booking } from '../../Model/booking';
import { BookingService } from '../../Service/booking.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'all-bookings',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {
  bookService = inject(BookingService);
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  displayEditDialog = false;

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookService.getBook().subscribe({
      next: (data) => this.bookings = data,
      error: (err) => console.error('Error fetching bookings', err),
    });
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

    this.bookService.updateBookingAsAdmin(this.selectedBooking.id, this.selectedBooking).subscribe({
      next: (updated) => {
        const index = this.bookings.findIndex(b => b.id === updated.id);
        if (index !== -1) this.bookings[index] = updated;
        this.closeDialog();
      },
      error: (err) => console.error('Update failed', err)
    });
  }

  deleteBooking(id: number) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookService.deleteBookingAsAdmin(id).subscribe({
        next: () => this.bookings = this.bookings.filter(b => b.id !== id),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}
