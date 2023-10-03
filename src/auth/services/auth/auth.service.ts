import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { comparePassword, encodePassword } from 'src/utilities/bcrypt';
import { CreateUserType, ValidateUserType } from 'src/utilities/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async validateUser(userDetails: ValidateUserType){
        try{
            const { email } = userDetails;
            console.log("email",email);
            const user = await this.userRepository.findOne({where: {email}});
            if(user === null){
                throw new HttpException('User not found',HttpStatus.NOT_FOUND);
            }
            console.log("user",user);   

            const pass = user.password;
            console.log("password",pass);
            const status = comparePassword(userDetails.password,pass);
            console.log("status",status);
            if(!status){
                throw new UnauthorizedException();
            }
            const { password, ...result } = user;
            const payload = { sub: user.id, username: user.username, role: user.role };
            const token = await this.jwtService.signAsync(payload);
            const Result = {...result, access_token: token};
            return Result;
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

}
