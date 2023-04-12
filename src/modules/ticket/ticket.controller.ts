import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/ticket.request.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('book')
  async create(@Body() body: CreateTicketDto) {
    try {
      const data = await this.ticketService.create(body);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Get('/')
  async getAll() {
    return await this.ticketService.getAll();
  }

  @Get(`:id`)
  async getById(@Param('id') id: string) {
    try {
      const data = await this.ticketService.getById(id);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() body: CreateTicketDto) {
    try {
      const data = await this.ticketService.edit(id, body);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.ticketService.delete(id);
    } catch (error) {
      return error;
    }
  }

  //   @Get(`:ticketReferenceNumber`)
  //   async getByTicketReferenceNumber(
  //     @Param('ticketReferenceNumber') ticketReferenceNumber: string,
  //   ) {
  //     try {
  //       const data = await this.ticketService.getById(ticketReferenceNumber);
  //       return data;
  //     } catch (error) {
  //       return error;
  //     }
  //   }
}
