import { 
    Controller, 
    Post, 
    Get,
    Patch,
    Body, 
    ValidationPipe,
    HttpStatus,
    HttpException,
    ParseIntPipe,
    Param,
    UsePipes,
    Delete,
    UseGuards
} from '@nestjs/common';
import { request } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { createUserDTO } from 'src/users/dtos/CreateUser.dto';
import { getUsersByRoleDTO } from 'src/users/dtos/GetUsersByRole.dto';
import { updateUserDTO } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}

    @Post('signup')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userDetails: createUserDTO){
        console.log(userDetails)
        let result = this.usersService.createUser(userDetails);
        return result;
    }

    @Get()
    getUsers(){
        const result = this.usersService.fetchUsers();
        return result;
    }

    @Post('byRole')
    @UsePipes(new ValidationPipe())
    getUsersByRole(@Body() roleRequest: getUsersByRoleDTO){
        const result = this.usersService.getUsersByRole(roleRequest);
        return result;
    }

    @Get(':userId')
    getUserById(@Param('userId', ParseIntPipe) id: number){
        const result = this.usersService.getUserById(id);
        return result;
    }

    @Patch('update/:userId')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('userId', ParseIntPipe) id: number, @Body() userRequest: updateUserDTO){
        console.log(userRequest);
        if(Object.keys(userRequest).length === 0){
            throw new HttpException('Empty Body request is not allowed',HttpStatus.BAD_REQUEST);
        }
        const result = this.usersService.updateUser(id,userRequest);
        return result;
    }

    @Delete('delete/:userId')
    deleteUser(@Param('userId', ParseIntPipe) id: number){
        const result = this.usersService.deleteUser(id);
        return result;
    }
}
