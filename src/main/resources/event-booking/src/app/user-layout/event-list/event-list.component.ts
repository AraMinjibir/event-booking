import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Event } from '../../Model/event';
import { EventService } from '../../Service/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'event-list',
  imports: [NgFor, DatePipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  events:Event[] = [];
  constructor(private eventService: EventService, private router: Router){}

  ngOnInit(){
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error("Not found", err)
      }
    })
  }

  viewDetails(id: number) {
    this.router.navigate(['user', 'event-details', id]);
  }

}
