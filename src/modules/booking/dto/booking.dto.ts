import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class BookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ticketReference: string;

  @IsOptional()
  bookingReference: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  ticketQuantity: number;
}
