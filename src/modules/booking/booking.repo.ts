import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { BookingReferenceDto } from './dto/booking.dto';

@Injectable()
export class BookingRepo extends EntityRepository<BookingDocument> {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }

  async findAll() {
    return await this.bookingModel.find();
  }

  async findBookingByReference(bookingReference: string) {
    return await this.bookingModel.findOne({ bookingReference });
  }

  async findByReferenceAndDelete(bookingReference: string) {
    return await this.bookingModel.findOneAndDelete({ bookingReference });
  }
}
