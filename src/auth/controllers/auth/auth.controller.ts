import { 
    Controller, 
    Post, 
    Body, 
    ValidationPipe,
    UsePipes,
    HttpException, 
    HttpStatus,
    UnauthorizedException,
    HttpCode
} from '@nestjs/common';
import { request } from 'express';
import { authDTO } from 'src/auth/dtos/Auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authsService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UsePipes(new ValidationPipe())
    async userLogin(@Body() loginDetails: authDTO){
        let user = await this.authsService.validateUser(loginDetails);
        return {
                message: "User logged in sucessfully",
                data: user
        }
    }
}



