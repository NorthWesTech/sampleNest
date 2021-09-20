import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}

    @Post()
    createUser(@Body() body: UserCreateDto) {
        return this.userService.createUser(body);
    }

    @Get()
    getAllUser(): UserModel[] {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param() params):UserModel{
            return this.userService.getUserById(params.id);
    }
}
