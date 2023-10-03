import { IsNotEmpty, IsNumber, IsString  } from "class-validator";

export class createTeamDTO {
    @IsString()
    @IsNotEmpty()
    team_name: string;

    @IsNumber()
    @IsNotEmpty()
    team_lead: number;
}

