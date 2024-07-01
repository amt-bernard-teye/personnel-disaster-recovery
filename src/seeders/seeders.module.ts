import { Module } from '@nestjs/common';
import { SeedersController } from './seeders.controller';

@Module({
  controllers: [SeedersController]
})
export class SeedersModule {}
