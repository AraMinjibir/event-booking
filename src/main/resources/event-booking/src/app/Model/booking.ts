import { Event } from "./event";
import { User } from "./user";

export class Booking {
    id?: number;
  bookedAt: string; 
  seatNumber: number;
  qrCode: string;
  users: User;
  events: Event;
}
