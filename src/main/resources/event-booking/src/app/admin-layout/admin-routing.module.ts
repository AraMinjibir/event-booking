import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [
 
  {
    path: "admin-layout",
    component: AdminLayoutComponent,
    children:[
      {
        path: "all-bookings",
        component: AllBookingsComponent
      },
      {
        path: "event-management",
        component: EventManagementComponent
      },
      {
        path: "seat-layout",
        component: SeatLayoutComponent
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
