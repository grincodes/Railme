import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export enum TrainServiceEnum {
  Econonomy = 'Economy',
  Business = 'Business',
  Reservation = 'Reservation',
}
export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trainName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trainNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  depatureStation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  arrivalStation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ticketReferenceNumber: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDate()
  //   date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bookingStatus: string;

  @ApiProperty()
  trainServiceType: TrainServiceEnum;
}
