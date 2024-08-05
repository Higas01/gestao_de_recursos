import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateAllocationDto } from 'src/dto/create-allocation.dto';
import { AllocationService } from 'src/services/allocation.service';

@Controller('allocations')
export class AllocationController {
    constructor(private readonly allocationService: AllocationService) { }

    @Get()
    @UseGuards(AuthGuard)
    findAll(@Req() req) {
        return this.allocationService.findAll(req.user.id);
    }

    @Post("resources/:resourceId/allocate")
    @UseGuards(AuthGuard)
    allocate(@Param("resourceId") resourceId: string, @Body() CreateAllocationDto: CreateAllocationDto, @Req() req) {
        return this.allocationService.allocate(+resourceId, req.user.id, CreateAllocationDto);
    }

    @Post('resources/:resourceId/deallocate')
    @UseGuards(AuthGuard)
    deallocate(@Param('resourceId') resourceId: string, @Req() req) {
        return this.allocationService.deallocate(+resourceId, req.user.id);
    }
}
