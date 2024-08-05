import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, select: false, })
  password: string;

  @Column()
  isAdmin: boolean;
}