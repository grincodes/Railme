import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtRefreshGuard from '../auth/jwt/jwt-refresh.guard';
import { BookingDto, BookingReferenceDto } from './dto/booking.dto';
import { BookingService } from './booking.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../authorization/roles.guard';
import { ROLE_KEY } from '../authorization/roles.decorator';
import { RouterModule } from '@nestjs/core';
import { USER_TYPE } from 'src/core/constants/values';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtRefreshGuard)
  @Post()
  createBooking(@Body() bookingDto: BookingDto) {
    return this.bookingService.createBooking(bookingDto);
  }

  @Get()
  findAlBookings() {
    return this.bookingService.findAllBookings();
  }

  @Get('by-reference')
  findBookingByReference(bookingReferenceDto: BookingReferenceDto) {
    return this.bookingService.findBookingByReference(bookingReferenceDto);
  }

  //update
}
