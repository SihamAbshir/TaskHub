import { IsEnum, IsNotEmpty  } from "class-validator";
import { UserRole } from "src/typeorm/entities/User";

export class getUsersByRoleDTO {
    @IsEnum(UserRole)
    @IsNotEmpty()
    role: UserRole;
}

