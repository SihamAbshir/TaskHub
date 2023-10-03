import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength,  } from "class-validator";
import { UserRole } from "src/typeorm/entities/User";

export class createUserDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @IsEmail()
    // @EmailNotRegistered({ message: 'email already registered' })
    @IsNotEmpty()
    email: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}

