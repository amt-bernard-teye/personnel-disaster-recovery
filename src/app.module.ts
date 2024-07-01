import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({ 
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({global: true})
  ]
})
export class AppModule {}
