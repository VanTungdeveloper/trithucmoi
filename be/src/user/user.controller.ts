import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
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
  // @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  get(@Param('id') id: string) {
    return this.userService.get(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() dto: UserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
