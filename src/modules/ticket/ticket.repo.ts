import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Ticket } from './interface/ticket.interface';

@Injectable()
export class TicketRepo extends EntityRepository<Ticket> {
  constructor(
    @Inject('TICKET_MODEL')
    private readonly ticketModel: Model<Ticket>,
  ) {
    super(ticketModel);
  }
}
