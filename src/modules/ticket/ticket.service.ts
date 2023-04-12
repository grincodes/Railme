import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TicketRepo } from './ticket.repo';
import { CreateTicketDto } from './dto/ticket.request.dto';
import { Ticket } from './interface/ticket.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepo: TicketRepo) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketRepo.create({
      id: uuid(),
      date: new Date(),
      ...createTicketDto,
    });
  }

  async getAll() {
    return await this.ticketRepo.find({});
  }

  async getById(id: string) {
    const userTicket = await this.ticketRepo.findOne({ id });
    if (userTicket) {
      return userTicket;
    }
    throw new HttpException(
      'Ticket with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async edit(id: string, editTicketDto: CreateTicketDto): Promise<Ticket> {
    const edit = await this.ticketRepo.findOneAndUpdate(
      { id },
      { ...editTicketDto },
    );
    return edit;
  }

  async delete(id: string): Promise<void> {
    await this.ticketRepo.deleteMany({ id });
  }

  //   async getByTicketReferenceNumber(ticketReferenceNumber: string) {
  //     const userTicket = await this.ticketRepo.findOne({ ticketReferenceNumber });
  //     if (userTicket) {
  //       return userTicket;
  //     }
  //     throw new HttpException(
  //       'Ticket with this id does not exist',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
}
