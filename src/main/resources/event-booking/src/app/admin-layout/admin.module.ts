import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-routing.module';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { AdminLayoutComponent } from './admin-layout.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    AllBookingsComponent,
    EventManagementComponent,
    SeatLayoutComponent,
    AdminLayoutComponent
  ]
})
export class AdminModule { }
