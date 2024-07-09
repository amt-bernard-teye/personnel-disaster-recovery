import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SeedersModule } from './seeders/seeders.module';
import { SharedModule } from './shared/shared.module';
import { MailerModule } from './mailer/mailer.module';
import { UsersModule } from './users/users.module';
import { PersonnelModule } from './personnel/personnel.module';
import { EmergencyTypeModule } from './emergency-type/emergency-type.module';
import { ProfessionsModule } from './professions/professions.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({global: true}),
    DatabaseModule,
    AuthModule,
    SeedersModule,
    SharedModule,
    MailerModule,
    UsersModule,
    PersonnelModule,
    EmergencyTypeModule,
    ProfessionsModule,
  ]
})
export class AppModule {}
