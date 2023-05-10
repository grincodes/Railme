import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USER_TYPE } from 'src/core/constants/values';
import JwtRefreshGuard from '../auth/jwt/jwt-refresh.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Roles } from '../authorization/roles.decorator';
import { RoleGuard } from '../authorization/roles.guard';
import {
  TicketClassDto,
  TicketDateDto,
  TicketDto,
  TicketReferenceDto,
  TrainNameDto,
} from './dto/ticket.dto';
import { TicketService } from './ticket.service';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(USER_TYPE.ADMIN)
  @UseGuards(JwtRefreshGuard, RoleGuard)
  @Post()
  createTicket(@Req() req, @Body() ticketDto: TicketDto) {
    return this.ticketService.createTicket(ticketDto);
  }

  @Roles(USER_TYPE.ADMIN)
  @UseGuards(JwtRefreshGuard, RoleGuard)
  @Get()
  findAllTickets() {
    return this.ticketService.findAllTickets();
  }

  @Roles(USER_TYPE.ADMIN)
  @UseGuards(JwtRefreshGuard, RoleGuard)
  @Get('by-class')
  findAllTicketsByClass(@Body() ticketClassDto: TicketClassDto) {
    return this.ticketService.findAllTicketsByClass(ticketClassDto);
  }

  @Get('by-reference')
  findByReference(@Body() ticketReferenceDto: TicketReferenceDto) {
    return this.ticketService.findByReference(ticketReferenceDto);
  }

  @Get('by-date')
  findByDate(@Body() ticketDateDto: TicketDateDto) {
    return this.ticketService.findTicketsBasedOnDate(ticketDateDto);
  }

  // @Get('available-tickets')
  // findAvailableTickets(
  //   @Body() ticketReference: string,
  //   ticketQuantity: number,
  // ) {
  //   return this.ticketService.findByReferenceAndUpdate(
  //     ticketReference,
  //     ticketQuantity,
  //   );
  // }
}
