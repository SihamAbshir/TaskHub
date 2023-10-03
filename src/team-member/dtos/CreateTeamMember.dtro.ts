import { IsNotEmpty, IsNumber, IsString  } from "class-validator";

export class createTeamMemberDTO {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    team_id: number;
}

