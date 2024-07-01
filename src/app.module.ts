import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SeedersModule } from './seeders/seeders.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({global: true}),
    DatabaseModule,
    AuthModule,
    SeedersModule
  ]
})
export class AppModule {}
