import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Train, TrainSchema } from './schemas/train.schema';
import { TrainService } from './train.service';
import { TrainRepo } from './train.repo';
import { TrainController } from './train.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Train.name,
        schema: TrainSchema,
      },
    ]),
  ],
  controllers: [TrainController],
  providers: [TrainService, TrainRepo],
  exports: [TrainService],
})
export class TrainModule {}
