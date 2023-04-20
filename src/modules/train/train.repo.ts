import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Train, TrainDocument } from './schemas/train.schema';

@Injectable()
export class TrainRepo extends EntityRepository<TrainDocument> {
  constructor(
    @InjectModel(Train.name)
    private readonly trainModel: Model<TrainDocument>,
  ) {
    super(trainModel);
  }
}
