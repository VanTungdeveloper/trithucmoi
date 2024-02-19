import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/userDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(dto: UserDto): Promise<UserDto> {
    const user = await this.userRepo.save(dto);
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userRepo.find();

    return plainToInstance(UserDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: number, updateDto: UserDto): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepo.update(id, updateDto);
    return {
      message: 'update success!',
    };
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepo.remove(user);
    return {
      message: 'Delete success!',
    };
  }
}
