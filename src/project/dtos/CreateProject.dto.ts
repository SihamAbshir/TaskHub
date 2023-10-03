import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength,  } from "class-validator";
import { ProjectStatus } from "src/typeorm/entities/Project";

export class createProjectDTO {
    @IsString()
    @IsNotEmpty()
    project_name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(ProjectStatus)
    @IsNotEmpty()
    status: ProjectStatus;

    @IsNumber()
    @IsNotEmpty()
    assigned_PM: number;

    @IsNumber()
    @IsNotEmpty()
    assigned_team: number;

}

