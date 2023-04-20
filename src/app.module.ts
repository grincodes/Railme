import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TrainModule } from './modules/train/train.module';
import { UsersModule } from './modules/users/users.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { BookingModule } from './modules/booking/booking.module';
import { JwtRefreshTokenStrategy } from './modules/auth/jwt/jwt-refresh-token.strategy';
import { JwtStrategy } from './modules/auth/jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),

      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TrainModule,
    TicketModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
