import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop()
  id: string;

  @Prop()
  userId: string;

  @Prop()
  bookingReference: string;

  @Prop()
  ticketReference: string;

  @Prop()
  ticketQuantity: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
