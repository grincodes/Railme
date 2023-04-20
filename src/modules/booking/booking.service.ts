import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { BookingRepo } from './booking.repo';
import { BookingDto } from './dto/booking.dto';
import { TicketService } from '../ticket/ticket.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepo: BookingRepo,
    private ticketService: TicketService,
  ) {}

  async createBooking(bookingDto: BookingDto) {
    const ticket = await this.ticketService.findByReference(
      bookingDto.ticketReference,
    );

    if (!ticket) {
      throw new HttpException('Ticket does not exist ', HttpStatus.NOT_FOUND);
    }

    // check if ticket has expired

    // check if ticket is totall booked

    if (ticket.numOfAvailableTickets < bookingDto.ticketQuantity) {
      throw new BadRequestException(
        'Tickets fully booked or ticket available does not match your request',
      );
    }

    //implement a transaction here

    await this.ticketService.findByReferenceAndUpdate(
      bookingDto.ticketReference,
      +bookingDto.ticketQuantity,
    );

    bookingDto.bookingReference = this.generateBookingReference(
      bookingDto.ticketQuantity,
      bookingDto.ticketReference,
    );
    return await this.bookingRepo.create(bookingDto);
  }

  generateBookingReference(ticketQuantity: number, ticketReference: string) {
    return ticketReference + '-' + 'Q' + '-' + ticketQuantity;
  }
}
