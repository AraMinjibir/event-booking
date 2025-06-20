import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../Service/booking.service';
import { SeatLayoutComponent } from '../../admin-layout/seat-layout/seat-layout.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'seat-picker',
  imports: [SeatLayoutComponent, ButtonModule],
  templateUrl: './seat-picker.component.html',
  styleUrl: './seat-picker.component.scss'
})
export class SeatPickerComponent {

  eventId!: number;
  selectedSeats: string[] = [];
  bookedSeats: string[] = [];
  isLoading = false;

  constructor(private route: ActivatedRoute, private bookService: BookingService, private router: Router) {}

  ngOnInit() {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
    console.log("Fetching booked seats for eventId:", this.eventId); // Log ID
    
    this.bookService.getBookedSeats(this.eventId).subscribe(
      seats => {
        console.log("Received booked seats:", seats); // Log response
        this.bookedSeats = seats;
      },
      error => console.error("Error fetching booked seats:", error) // Log errors
    );
  }

  onSeatSelection(seats: string[]) {

    console.log('Seats selected:', seats); 
    this.selectedSeats = seats;
  }
  
  

 book() {
  this.isLoading = true;
  this.bookService.bookEvent(this.eventId, this.selectedSeats).subscribe({
    
    next: (res) => {
      console.log('Booking successful', res);
      // Refresh booked seats after successful booking
      this.bookService.getBookedSeats(this.eventId).subscribe(seats => {
        this.bookedSeats = [...seats]; // New array reference
        this.router.navigate(['user/booking/confirmation']);
      });this.isLoading = false;
    },
    error: (err) => console.error('Booking failed', err)
  });
}

}
