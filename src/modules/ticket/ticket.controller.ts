import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USER_TYPE } from 'src/core/constants/values';
import JwtRefreshGuard from '../auth/jwt/jwt-refresh.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Roles } from '../authorization/roles.decorator';
import { RoleGuard } from '../authorization/roles.guard';
import { TicketClassDto, TicketDto } from './dto/ticket.dto';
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

  @Get()
  findAllTickets() {
    return this.ticketService.findAllTickets();
  }

  @Get('by-class')
  findAllTicketsByClass(@Body() ticketClassDto: TicketClassDto) {
    return this.ticketService.findAllTicketsByClass(ticketClassDto);
  }
}
