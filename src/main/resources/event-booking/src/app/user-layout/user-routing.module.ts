import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListComponent } from './event-list/event-list.component';
import { SeatPickerComponent } from './seat-picker/seat-picker.component';
import { UserLayoutComponent } from './user-layout.component';
import { BookHistoryComponent } from './book-history/book-history.component';

const routes: Routes = [
  {
    path: '',
    component:UserLayoutComponent,
    children:[
      {
        path: "booking/confirmation",
        component:BookingConfirmationComponent
      },
      {
        path: "event-details/:id",
        component: EventDetailsComponent
      },
      {
        path: "event/:id",
        component: EventListComponent
      },
      {
        path:"seat-picker/:id",
        component: SeatPickerComponent
      },{
        path: "book-history",
        component: BookHistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
