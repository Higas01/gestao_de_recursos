import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
    private readonly salt = 10;

    encrypt(password: string) {
        return bcrypt.hash(password, this.salt);
    }

    compare(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}