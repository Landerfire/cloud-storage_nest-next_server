import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user) {
        const isPasswordValid = await compare(password, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
      return null;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(dto: CreateUserDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);

      if (user) {
        throw new HttpException(
          'Пользователь с тиким "E-Mail" уже зарегестрирован.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await hash(dto.password, 10);
      const userData = await this.usersService.create({
        ...dto,
        password: hashedPassword,
      });

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
