import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { IsAdmin } from 'src/decorators/is-admin.decorator';
import { CreateResourceDto } from 'src/dto/create-resource.dto';
import { ResourceService } from 'src/services/resource.service';
import { UpdateResourceDto } from 'src/dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
    constructor(private readonly resourceService: ResourceService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    @IsAdmin()
    @UseGuards(AuthGuard)
    create(@Body() CreateResourceDto: CreateResourceDto) {
        return this.resourceService.create(CreateResourceDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.resourceService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    findOne(@Param('id') id: string) {
        return this.resourceService.findOne(+id);
    }

    @Patch(':id')
    @IsAdmin()
    @UseGuards(AuthGuard)
    update(@Param('id') id: string, @Body() UpdateResourceDto: UpdateResourceDto) {
        return this.resourceService.update(+id, UpdateResourceDto);
    }

    @Delete(':id')
    @IsAdmin()
    @UseGuards(AuthGuard)
    remove(@Param('id') id: string) {
        return this.resourceService.remove(+id);
    }
}
