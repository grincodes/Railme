import { Injectable } from '@nestjs/common';
import { TICKET_CLASS_REF } from 'src/core/constants/values';
import { TicketClassDto, TicketDto } from './dto/ticket.dto';
import { TicketRepo } from './ticket.repo';
import { TICKET_CLASS } from 'src/core/constants/values';
import { generateCode } from 'src/core/utils/generator';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepo: TicketRepo) {}

  async createTicket(ticketDto: TicketDto) {
    ticketDto.ticketReference = this.generateTicketReference(
      ticketDto.ticketClass,
    );
    return await this.ticketRepo.create(ticketDto);
  }

  async findByReference(ticketReference: string) {
    return await this.ticketRepo.findByReference(ticketReference);
  }
  async findByReferenceAndUpdate(
    ticketReference: string,
    ticketQuantity: number,
  ) {
    return await this.ticketRepo.findByReferenceAndUpdate(
      ticketReference,
      ticketQuantity,
    );
  }

  async findAllTicketsByClass(ticketClassDto: TicketClassDto) {
    return await this.ticketRepo.find({
      ticketClass: ticketClassDto.ticketClass,
    });
  }

  async findAllTickets() {
    return await this.ticketRepo.find({});
  }

  async findTicketsBasedOnDate() {
    // implement should take a dto with date
  }

  generateTicketReference(ticketClass: string) {
    return TICKET_CLASS_REF[ticketClass] + '-' + Date.now();
  }
}
