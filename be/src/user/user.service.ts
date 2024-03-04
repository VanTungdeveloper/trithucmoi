import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/userDto.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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
      const hash = await bcrypt.hash(dto.password, 10);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: hash,
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

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('username or password incorrect!');
    }

    delete user.password;
    const token = await this.signJwtToken(user.id, user.email);

    return {
      ...token,
    };
  }

  async get() {
    const users = await this.prismaService.user.findMany({
      where: {},
    });

    users.map((user) => {
      delete user.password;
    });

    return users;
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string; refeshToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '30m',
      secret: this.configService.get('JWT_SECRET'),
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1000m',
    });
    return {
      accessToken: jwtString,
      refeshToken: refresh_token,
    };
  }
}
