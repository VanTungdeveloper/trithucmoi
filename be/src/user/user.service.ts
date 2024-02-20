import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/userDto.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: UserDto) {
    try {
      //insert data to database
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: dto.password,
          role: 'USER',
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      const token = await this.signJwtToken(user.id, user.email);

      return {
        ...user,
        ...token,
      };
    } catch (error) {
      if (error.code == 'P2002') {
        //throw new ForbiddenException(error.message)
        //for simple
        throw new ForbiddenException('User with this email already exists');
      }
    }
  }

  async login(dto: UserDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const passwordMatched = user.password === dto.password;
    if (!passwordMatched) {
      throw new ForbiddenException('Incorrect password');
    }

    delete user.password;
    const token = await this.signJwtToken(user.id, user.email);

    return {
      ...user,
      ...token,
    };
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: jwtString,
    };
  }
}
