import { Controller, Get } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('seeders')
export class SeedersController {
    constructor(private seedersService: SeedersService) { }

    @Get("create-admin")
    @ApiTags("Seeders")
    async createAdmin() {
        return await this.seedersService.createAdmin();
    }
}
