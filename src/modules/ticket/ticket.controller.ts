import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/ticket.request.dto';
import { Roles } from '../authorization/roles.decorator';
import { USER_TYPE } from 'src/core/constants/values';
import { RoleGuard } from '../authorization/roles.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('book')
  @UseGuards(RoleGuard)
  @Roles(USER_TYPE.USER)
  async create(@Body() body: CreateTicketDto) {
    try {
      const data = await this.ticketService.create(body);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Roles(USER_TYPE.ADMIN)
  @UseGuards(RoleGuard)
  @Get('/')
  async getAll() {
    return await this.ticketService.getAll();
  }

  @Roles(USER_TYPE.USER)
  @Roles(USER_TYPE.ADMIN)
  @UseGuards(RoleGuard)
  @Get(`:id`)
  async getById(@Param('id') id: string) {
    try {
      const data = await this.ticketService.getById(id);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Roles(USER_TYPE.USER)
  @Roles(USER_TYPE.ADMIN)
  @UseGuards(RoleGuard)
  @Put(':id')
  async edit(@Param('id') id: string, @Body() body: CreateTicketDto) {
    try {
      const data = await this.ticketService.edit(id, body);
      return data;
    } catch (error) {
      return error;
    }
  }

  @Roles(USER_TYPE.USER)
  @Roles(USER_TYPE.ADMIN)
  @UseGuards(RoleGuard)
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
