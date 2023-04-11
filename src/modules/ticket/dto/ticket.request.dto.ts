import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  trainName: string;

  @IsString()
  @IsNotEmpty()
  trainNumber: string;

  @IsString()
  @IsNotEmpty()
  depatureStation: string;

  @IsString()
  @IsNotEmpty()
  arrivalStation: string;

  @IsString()
  @IsNotEmpty()
  ticketReferenceNumber: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @IsDate()
  //   date: Date;

  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsString()
  @IsNotEmpty()
  bookingStatus: string;
}
