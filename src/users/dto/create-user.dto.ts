import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@test.ru',
    description: 'User email',
    nullable: false,
  })
  readonly email: string;

  @ApiProperty({
    default: 'Тест Тестович',
    description: 'User full name',
    nullable: false,
  })
  readonly fullName: string;

  @ApiProperty({
    default: '123',
    description: 'User password',
    nullable: false,
  })
  readonly password: string;
}
