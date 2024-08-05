import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from './hash.service';
import { AuthValidationMessage } from 'src/utils/validation/messages/auth-validation-messages';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userModel: Repository<UserEntity>,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto
        const user = await this.userModel.findOne({ select: ["id", "password"], where: { email } });

        if (!user) {
            throw new HttpException(AuthValidationMessage.USER_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isValidPassword = await this.hashService.compare(password, user.password);

        if (!isValidPassword) {
            throw new HttpException(AuthValidationMessage.INVALID_PASSWORD, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const payload = { sub: user.id };

        return {
            token: await this.jwtService.signAsync(payload)
        }
    }
}
