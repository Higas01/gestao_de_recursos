import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceEntity } from 'src/entities/resource.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateAllocationDto } from 'src/dto/create-allocation.dto';
import { AllocationEntity } from 'src/entities/allocation.entity';
import { AllocationValidationMessages } from 'src/utils/validation/messages/allocation-validation-messages';

@Injectable()
export class AllocationService {
    constructor(
        @InjectRepository(ResourceEntity) private resourceEntity: Repository<ResourceEntity>,
        @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
        @InjectRepository(AllocationEntity) private allocationEntity: Repository<AllocationEntity>,
    ) { }

    findAll(userId: number) {
        return this.allocationEntity.find({ where: { user: { id: userId } } });
    }

    async allocate(resourceId: number, userId: number, createAllocationDto: CreateAllocationDto) {
        const [user, resource] = await Promise.all([
            this.userEntity.findOne({ where: { id: userId } }),
            this.resourceEntity.findOne({ where: { id: resourceId } })
        ])

        if (!user) {
            throw new NotFoundException(AllocationValidationMessages.USER_NOT_FOUND)
        }

        if (!resource) {
            throw new NotFoundException(AllocationValidationMessages.ALLOCATION_NOT_FOUND);
        }

        if (resource.allocated) {
            throw new ForbiddenException(AllocationValidationMessages.RESOURCE_ALLOCATED);
        }

        resource.allocated = true;

        await this.resourceEntity.save(resource);

        return this.allocationEntity.save({ ...createAllocationDto, user, resource });
    }

    async deallocate(resourceId: number, userId: number) {
        const allocation = await this.allocationEntity.findOne({
            relations: ["user", "resource"],
            where: {
                user: { id: userId },
                resource: { id: resourceId }
            },
            order: {
                id: "DESC"
            }
        })

        if (!allocation) {
            throw new NotFoundException(AllocationValidationMessages.ALLOCATION_NOT_FOUND);
        }

        if (allocation.user.id !== userId) {
            throw new ForbiddenException(AllocationValidationMessages.USER_NOT_ALLOCATED);
        }

        if (!allocation.resource.allocated) {
            throw new ForbiddenException(AllocationValidationMessages.RESOURCE_NOT_ALLOCATED);
        }

        allocation.resource.allocated = false;

        await this.resourceEntity.save(allocation.resource);

        return allocation;
    }
}
