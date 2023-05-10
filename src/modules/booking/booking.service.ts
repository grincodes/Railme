import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { BookingRepo } from './booking.repo';
import { BookingDto, BookingReferenceDto } from './dto/booking.dto';
import { TicketService } from '../ticket/ticket.service';
import { TicketReferenceDto } from '../ticket/dto/ticket.dto';
import JwtRefreshGuard from '../auth/jwt/jwt-refresh.guard';
import { RoleGuard } from '../authorization/roles.guard';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepo: BookingRepo,
    private ticketService: TicketService,
  ) {}

  async createBooking(bookingDto: BookingDto) {
    const ticket = await this.ticketService.findByReference(bookingDto);

    if (!ticket) {
      throw new HttpException('Ticket does not exist', HttpStatus.NOT_FOUND);
    }

    // check if ticket has expired
    const dateOnTicket: Date = new Date(ticket.departureTime);
    const dateInputed: Date = new Date(bookingDto.departureTime);

    if (
      dateOnTicket.getTime() < dateInputed.getTime() ||
      dateOnTicket.getTime() > dateInputed.getTime()
    ) {
      throw new HttpException(
        'No ticket is avaialble for this date',
        HttpStatus.FORBIDDEN,
      );
    }

    // check if ticket is totally booked
    if (ticket.numOfAvailableTickets < bookingDto.ticketQuantity) {
      throw new BadRequestException(
        'Tickets available does not match your request',
      );
    }

    if (ticket.numOfAvailableTickets === 0) {
      throw new BadRequestException('Tickets fully booked');
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

    const result = await this.bookingRepo.create(bookingDto);
    console.log(result, 'result');
    console.log(bookingDto, 'dto');
    return result;
  }

  async findAllBookings() {
    return this.bookingRepo.findAll();
  }

  async findBookingByReference(bookingReferenceDto: BookingReferenceDto) {
    return await this.bookingRepo.findBookingByReference(
      bookingReferenceDto.bookingReference,
    );
  }

  async deleteBookingByReference(bookingReferenceDto: BookingReferenceDto) {
    return await this.bookingRepo.deleteMany(bookingReferenceDto);
  }

  generateBookingReference(ticketQuantity: number, ticketReference: string) {
    return ticketReference + '-' + 'Q' + '-' + ticketQuantity;
  }
}
