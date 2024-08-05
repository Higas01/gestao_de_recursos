import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateResourceDto } from '../dto/update-resource.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResourceDto } from 'src/dto/create-resource.dto';
import { ResourceEntity } from 'src/entities/resource.entity';
import { ResourceValidationMessages } from 'src/utils/validation/messages/resource-validation-messages';

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(ResourceEntity) private resourceEntity: Repository<ResourceEntity>,
    ) { }

    async create(createResourceDto: CreateResourceDto) {
        return this.resourceEntity.save(createResourceDto);
    }

    findAll() {
        return this.resourceEntity.find({ where: { allocated: false } });
    }

    findOne(id: number) {
        return this.resourceEntity.findOne({ where: { id } });
    }

    async update(id: number, updateResourceDto: UpdateResourceDto) {
        const resource = await this.validateResourceExists(id);

        return this.resourceEntity.save({ ...resource, ...updateResourceDto });
    }

    async remove(id: number) {
        const resource = await this.validateResourceExists(id);

        if (resource.allocated) {
            throw new UnauthorizedException(ResourceValidationMessages.RESOURCE_ALLOCATED);
        }

        return this.resourceEntity.delete({ id });
    }

    private async validateResourceExists(id: number) {
        const resource = await this.resourceEntity.findOne({ where: { id } });

        if (!resource) {
            throw new NotFoundException(ResourceValidationMessages.RESOURCE_NOT_FOUND);
        }
        return resource;
    }
}
