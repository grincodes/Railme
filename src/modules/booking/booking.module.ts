import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketModule } from '../ticket/ticket.module';
import { BookingRepo } from './booking.repo';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingController } from './booking.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
    TicketModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, BookingRepo],
  exports: [BookingService],
})
export class BookingModule {}
