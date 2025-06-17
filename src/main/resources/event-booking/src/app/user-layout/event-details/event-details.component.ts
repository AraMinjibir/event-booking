import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../Service/event.service';
import { Event } from '../../Model/event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'event-details',
  imports: [DatePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {

  event!: Event;

  constructor(private route: ActivatedRoute, private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Raw route param:', idParam);
  
    const id = Number(idParam);
    console.log('Parsed ID:', id);
  
    if (!id || isNaN(id)) {
      console.error('Invalid event ID');
      return;
    }
  
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (err) => {
        console.error("Error fetching event:", err);
      }
    });
  }
  
  

  proceedToBooking() {
    this.router.navigate([ '/user/seat-picker', this.event.id]);
   
  }

}
