import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("resources")
export class ResourceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column()
    allocated: boolean = false;
}