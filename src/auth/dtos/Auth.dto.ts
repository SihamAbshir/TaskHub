import { IsEmail, IsNotEmpty, IsString, MinLength,  } from "class-validator";
import { UserRole } from "src/typeorm/entities/User";

export class authDTO {

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    role: UserRole;
}

