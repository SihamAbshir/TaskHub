import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength,  } from "class-validator";
import { UserRole } from "src/typeorm/entities/User";

export class updateUserDTO {
    // @IsString()
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}

