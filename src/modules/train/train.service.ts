import { Injectable } from '@nestjs/common';
import { TrainDto } from './dto/train.dto';
import { TrainRepo } from './train.repo';
@Injectable()
export class TrainService {
  constructor(private readonly trainRepo: TrainRepo) {}

  async createTrain(trainDto: TrainDto) {
    await this.trainRepo.create(trainDto);
  }
}
