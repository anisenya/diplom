import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './common/config/config';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      useClass: ConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
