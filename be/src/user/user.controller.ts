import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: UserDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  login(@Body() dto: UserDto) {
    return this.userService.login(dto);
  }
}
