import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtRefreshGuard from '../auth/jwt/jwt-refresh.guard';
import { BookingDto } from './dto/booking.dto';
import { BookingService } from './booking.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtRefreshGuard)
  @Post()
  createBooking(@Body() bookingDto: BookingDto) {
    return this.bookingService.createBooking(bookingDto);
  }

  //update
}
