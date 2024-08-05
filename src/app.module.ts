import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { HashService } from './services/hash.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesController } from './controllers/resource.controller';
import { ResourceService } from './services/resource.service';
import { AllocationController } from './controllers/allocation.controller';
import { AllocationService } from './services/allocation.service';
import { AllocationEntity } from './entities/allocation.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => (
        {
          secret: process.env.SECRET_TOKEN,
          signOptions: {
            expiresIn: '7d'
          }
        }
      )
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      ResourceEntity,
      AllocationEntity
    ]),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          autoLoadEntities: true,
          synchronize: false,
        }
      }
    }),
  ],
  controllers: [UsersController, AuthController, ResourcesController, AllocationController],
  providers: [HashService, UsersService, AuthService, ResourceService, AllocationService],
})
export class AppModule { }


