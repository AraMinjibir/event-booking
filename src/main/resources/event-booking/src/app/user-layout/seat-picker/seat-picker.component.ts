import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../Service/booking.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'seat-picker',
  imports: [NgFor],
  templateUrl: './seat-picker.component.html',
  styleUrl: './seat-picker.component.scss'
})
export class SeatPickerComponent {

  eventId!: number;
  seats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);
  selectedSeats: string[] = [];

  constructor(private route: ActivatedRoute, private bookService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
  }

  toggleSeat(seat: string) {
    const index = this.selectedSeats.indexOf(seat);
    index >= 0 ? this.selectedSeats.splice(index, 1) : this.selectedSeats.push(seat);
  }

  book() {
    this.bookService.bookEvent(this.eventId, this.selectedSeats).subscribe((res) => {
      console.log('Booking successful', res);
      this.router.navigate(['user/booking/confirmation']);
    });
    
  }

}
