import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from './hash.service';
import { UserValidationMessage } from 'src/utils/validation/messages/user-validation-messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto.email)

    const hashPassword = await this.hashService.encrypt(createUserDto.password);

    const user = await this.userEntity.save({
      ...createUserDto,
      password: hashPassword
    });

    delete user.password
    return user
  }

  findAll() {
    return this.userEntity.find();
  }

  findOne(id: number) {
    return this.userEntity.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.validateUserExists(id);

    if (updateUserDto.email) {
      await this.validateEmail(updateUserDto.email, id)
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.encrypt(updateUserDto.password);
    }

    await this.userEntity.save({ ...user, ...updateUserDto });

    delete user.password;

    return user;
  }

  async remove(id: number) {
    await this.validateUserExists(id);
    return this.userEntity.delete({ id });
  }

  private async validateEmail(email: string, ignoreId: number = 0) {
    const existingEmail = await this.userEntity.exists({ where: { email, id: Not(ignoreId) } });

    if (existingEmail) {
      throw new HttpException(UserValidationMessage.EMAIL_ALREADY_EXISTS, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  private async validateUserExists(id: number) {
    const user = await this.userEntity.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(UserValidationMessage.USER_NOT_FOUND);
    }
    return user;
  }
}
