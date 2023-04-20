import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { TicketRepo } from './ticket.repo';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
  ],
  providers: [TicketService, TicketRepo],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule {}
