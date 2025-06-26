import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GoogleSheetsService } from './utils/google-sheets.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local', // Load environment variables from this file
    }),
  ],
  controllers: [AppController],
  providers: [GoogleSheetsService],
})
export class AppModule {}

