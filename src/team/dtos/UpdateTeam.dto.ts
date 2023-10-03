import { IsNotEmpty, IsNumber, IsOptional, IsString  } from "class-validator";

export class updateTeamDTO {

    @IsOptional()
    @IsString()
    team_name?: string;

    @IsOptional()
    @IsNumber()
    team_lead?: {
        id: number
    };
}

