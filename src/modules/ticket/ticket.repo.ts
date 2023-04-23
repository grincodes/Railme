import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Ticket, TicketDocument } from './schemas/ticket.schema';
import { TicketDateDto } from './dto/ticket.dto';

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

  async findTicketsBasedOnDate(departureTime: string) {
    return await this.ticketModel.findOne({ departureTime });
  }

  async findByReferenceAndUpdate(
    ticketReference: string,
    ticketQuantity: number,
  ) {
    try {
      return await this.ticketModel.findOneAndUpdate(
        { ticketReference },
        { $inc: { numOfAvailableTickets: -ticketQuantity } },
      );
    } catch (error) {
      return 'Error here';
    }
  }
}
