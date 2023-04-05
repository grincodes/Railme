import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb+srv://dotex245:eUPVqkHVtYk4iw00@paird-mongodb.tai7axa.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
