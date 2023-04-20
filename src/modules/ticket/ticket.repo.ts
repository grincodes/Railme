import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketRepo extends EntityRepository<TicketDocument> {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {
    super(ticketModel);
  }

  async findByReference(ticketReference: string) {
    return await this.ticketModel.findOne({ ticketReference });
  }

  async findByReferenceAndUpdate(
    ticketReference: string,
    ticketQuantity: number,
  ) {
    return await this.ticketModel.findOneAndUpdate(
      { ticketReference },
      { $inc: { numOfAvailableTickets: -ticketQuantity } },
    );
  }
}
