import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User){
    return user
  }

  // @Get('/whoami')
  // whoAmI(@Session() session: any){
  //   return this.usersService.findOne(session.userId)
  // }

  @Post('/signout')
  signOut(@Session() session: any){
    session.userId = null
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any){
    const user = await this.authService.signin(body.email, body.password)
    session.userId = user.id
    return user
  }

  @Get('/:id')
  async findUser(@Param('id') id: string){
    console.log('handler is running')
    const user = await this.usersService.findOne(parseInt(id))
    if (!user) throw new NotFoundException("no user found")
    return user
  }

  @Get()
  findAllUsers(@Query('email') email: string){
    return this.usersService.find(email)
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number){
    return this.usersService.remove(id)
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    const user = this.usersService.update(parseInt(id), body)
    if (!user) throw new NotFoundException('use not found') // ONLY works with HTTP protocols
    return user

  }
}