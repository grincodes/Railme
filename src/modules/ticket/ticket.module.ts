import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketRepo } from './ticket.repo';
import { ticketProviders } from './ticket.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TicketController],
  providers: [TicketService, ...ticketProviders, TicketRepo],
  exports: [TicketService],
})
export class TicketModule {}
