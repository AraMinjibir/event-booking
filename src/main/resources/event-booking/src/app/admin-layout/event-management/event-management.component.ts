import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../Service/event.service';
import { Event } from '../../Model/event';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIf } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';


@Component({
  selector: 'event-management',
  imports: [ReactiveFormsModule,CommonModule,
    TableModule,
    InputTextModule,
    ButtonModule, NgIf, TextareaModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.scss'
})
export class EventManagementComponent {
  events: Event[] = [];
  eventForm!: FormGroup;
  editingEventId: number | null = null;

  constructor(private eventService: EventService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEvents();
  }

  initForm() {
    this.eventForm = this.fb.group({
      location: ['',Validators.required],
      dateTime: ['',Validators.required],
      halls: ['',Validators.required],
      totalSeat: [0,Validators.required],
      availableSeat: [0,Validators.required],
      description: ['',Validators.required],
      imageUrl: ['',Validators.required]
    });
  }

  loadEvents() {
      this.eventService.getAllEvents().subscribe(data => this.events = data);
  }

  saveEvent() {
    const event: Event = this.eventForm.value;
    if (this.editingEventId) {
      this.eventService.updateEvent(this.editingEventId, event).subscribe(() => {
        this.loadEvents();
        this.cancelEdit();
      });
    } else {
      this.eventService.createEvent(event).subscribe(() => {
        this.loadEvents();
        this.eventForm.reset();
      });
    }
  }

  editEvent(event: Event) {
    this.eventForm.patchValue(event);
    this.editingEventId = event.id!;
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe(() => this.loadEvents());
    }
  }

  cancelEdit() {
    this.editingEventId = null;
    this.eventForm.reset();
  }

}
