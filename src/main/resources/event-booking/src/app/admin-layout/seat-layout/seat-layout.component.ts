import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'seat-layout',
  imports: [NgFor,NgClass],
  templateUrl: './seat-layout.component.html',
  styleUrl: './seat-layout.component.scss'
})
export class SeatLayoutComponent {

  @Input() rows: string[] = ['A', 'B', 'C', 'D'];
  @Input() seatsPerRow: number = 10;
  @Input() bookedSeats: string[] = []; 
  
  @Output() selectedSeats = new EventEmitter<string[]>();

  selected: string[] = [];
  

  toggleSeat(seat: string): void {
    if (this.isBooked(seat)) {
      console.warn('Seat already booked:', seat);
      return; 
    }
    if (this.bookedSeats.includes(seat)) return; 

    if (this.selected.includes(seat)) {
      this.selected = this.selected.filter(s => s !== seat);
    } else {
      this.selected.push(seat);
    }

    this.selectedSeats.emit(this.selected);
  }

  isSelected(seat: string): boolean {
    return this.selected.includes(seat);
  }
  isBooked(seat: string): boolean {
    return this.bookedSeats?.includes(seat) || false;
}
 
}
