import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getMe(@UserId() id: number) {
    return this.usersService.findById(id);
  }
}
