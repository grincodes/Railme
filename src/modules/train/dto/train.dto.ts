import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class TrainDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  capacity: number;
}
