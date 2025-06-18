import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListComponent } from './event-list/event-list.component';
import { SeatPickerComponent } from './seat-picker/seat-picker.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { UserLayoutComponent } from './user-layout.component';
import { BookHistoryComponent } from './book-history/book-history.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    EventDetailsComponent,
    EventListComponent,SeatPickerComponent,
    BookingConfirmationComponent,
    UserLayoutComponent,
    BookHistoryComponent
  ]
})
export class UserModule { }
