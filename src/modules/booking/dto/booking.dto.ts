import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

export class BookingDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  bookingReference: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ticketReference: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  ticketQuantity: number;

  @ApiProperty()
  @IsDateString()
  departureTime: Date;
}

export class BookingReferenceDto {
  @IsString()
  bookingReference: string;
}
