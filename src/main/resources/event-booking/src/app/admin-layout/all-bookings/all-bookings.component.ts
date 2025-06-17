import { Component, inject } from '@angular/core';
import { Booking } from '../../Model/booking';
import { TableModule } from 'primeng/table';
import { BookingService } from '../../Service/booking.service';


@Component({
  selector: 'all-bookings',
  imports: [TableModule],
  templateUrl: './all-bookings.component.html',
  styleUrl: './all-bookings.component.scss'
})
export class AllBookingsComponent {
  bookService:BookingService = inject(BookingService);
  bookings: Booking[] =[];

  ngOnInit(){
    this.bookService.getBook().subscribe({
      next: (data) => {
        console.log('Bookings:', data);
        this.bookings = data;
      },
      error: (err) => {
        console.error('Error fetching bookings', err)
      }
    })
  }

}
