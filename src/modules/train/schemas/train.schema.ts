import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrainDocument = Train & Document;

@Schema()
export class Train {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  capacity: number;
}

export const TrainSchema = SchemaFactory.createForClass(Train);
