import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ResourceEntity } from './resource.entity';

@Entity("allocations")
export class AllocationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    returnDate: Date;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @ManyToOne(() => ResourceEntity)
    resource: ResourceEntity;

}