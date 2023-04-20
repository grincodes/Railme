import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Booking, BookingDocument } from './schemas/booking.schema';

@Injectable()
export class BookingRepo extends EntityRepository<BookingDocument> {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }
}
