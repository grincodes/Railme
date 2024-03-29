import { Document } from 'mongoose';
import { TrainServiceEnum } from '../dto/ticket.request.dto';

export interface Ticket extends Document {
  readonly trainName: string;
  readonly trainNumber: number;
  readonly depatureStation: string;
  readonly arrivalStation: string;
  readonly ticketReferenceNumber: string;
  readonly date: string;
  readonly seatNumber: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly price: string;
  readonly bookingStatus: string;
  readonly trainServiceType: TrainServiceEnum;
}
