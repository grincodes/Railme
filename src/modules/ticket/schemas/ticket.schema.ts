import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TICKET_CLASS } from 'src/core/constants/values';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop()
  id: string;

  @Prop()
  trainName: string;

  @Prop()
  ticketReference: string;

  @Prop({ required: true, enum: TICKET_CLASS })
  ticketClass: TICKET_CLASS;

  @Prop()
  price: string;

  @Prop()
  numOfAvailableTickets: number;

  @Prop({ required: true, type: Date })
  departureTime: Date;

  @Prop({ required: true, type: Date })
  arrivalTime: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
