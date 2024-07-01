import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({global: true}),
    DatabaseModule
  ]
})
export class AppModule {}
