import { Connection } from 'mongoose';
import { TicketSchema } from './schema/ticket.schema';

export const ticketProviders = [
  {
    provide: 'TICKET_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Ticket', TicketSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
