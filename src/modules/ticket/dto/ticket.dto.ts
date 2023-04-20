import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsDateString,
  IsOptional,
  IsInt,
  Min,
  IsDecimal,
} from 'class-validator';
import { TICKET_CLASS } from 'src/core/constants/values';

export class TicketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trainName: string;

  @ApiProperty({
    enum: TICKET_CLASS,
  })
  @IsEnum(TICKET_CLASS, {
    message: 'specified ticket class does not exist',
  })
  ticketClass: string;

  @IsOptional()
  ticketReference: string;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' })
  price: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  numOfAvailableTickets: number;

  @ApiProperty()
  @IsDateString()
  departureTime: Date;

  @ApiProperty()
  @IsDateString()
  arrivalTime: Date;
}

export class TicketClassDto {
  @IsEnum(TICKET_CLASS, {
    message: 'specified ticket class does not exist',
  })
  ticketClass: string;
}
function IsDecimalOptions(arg0: { decimal_digits: number }) {
  throw new Error('Function not implemented.');
}