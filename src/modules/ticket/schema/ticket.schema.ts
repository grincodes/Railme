import * as mongoose from 'mongoose';
import { TrainServiceEnum } from '../dto/ticket.request.dto';

export const TicketSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  trainName: String,
  trainNumber: String,
  depatureStation: String,
  arrivalStation: String,
  ticketReferenceNumber: String,
  date: Date,
  seatNumber: String,
  price: String,
  bookingStatus: String,
  trainServiceType: {
    type: String,
    enum: Object.values(TrainServiceEnum),
    default: TrainServiceEnum.Reservation,
  },
});
