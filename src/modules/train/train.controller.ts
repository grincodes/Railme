import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainDto } from './dto/train.dto';
import { USER_TYPE } from 'src/core/constants/values';
import JwtRefreshGuard from '../auth/jwt/jwt-refresh.guard';
import { Roles } from '../authorization/roles.decorator';
import { RoleGuard } from '../authorization/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Train')
@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Roles(USER_TYPE.ADMIN)
  @UseGuards(JwtRefreshGuard, RoleGuard)
  @Post()
  createTrain(@Body() trainDto: TrainDto) {
    return this.trainService.createTrain(trainDto);
  }

  //update
}
