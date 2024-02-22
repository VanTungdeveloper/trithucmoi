import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  get() {
    return this.userService.get();
  }
}
