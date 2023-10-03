import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Get,
    Patch,
    Delete,
    Param,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { Role } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { createTeamDTO } from 'src/team/dtos/CreateTeam.dto';
import { updateTeamDTO } from 'src/team/dtos/UpdateTeam.dto';
import { TeamService } from 'src/team/services/team/team.service';

@Role(['PM'])
@UseGuards(AuthenticationGuard,AuthorizationGuard)
@Controller('team')
export class TeamController {
    constructor(private teamServices: TeamService){}

    
    @Post('create')
    @UsePipes(new ValidationPipe())
    createTeam(@Body() teamBody: createTeamDTO){
        console.log("Create Team Body", teamBody);
        let result = this.teamServices.createTeam(teamBody);
        return result;
    }

    
    @Get()
    getTeams(){
        const result = this.teamServices.fetchTeams();
        return result;
    }

    
    @Get(':teamId')
    getTeamById(@Param('teamId',ParseIntPipe) id : number){
        const result = this.teamServices.getTeamById(id);
        return result;
    }
    
    
    @Patch('update/:teamId')
    @UsePipes(new ValidationPipe())
    updateTeam(@Param('teamId',ParseIntPipe) teamId: number, @Body() teamBody: updateTeamDTO){
        const result = this.teamServices.updateTeam(teamId, teamBody);
        return result;
    }

    
    @Delete('delete/:teamId')
    deleteTeam(@Param('teamId',ParseIntPipe) teamId: number){
        const result = this.teamServices.deleteTeam(teamId);
        return result;
    }

    
    @Post('teamLeads')
    getTeamLeads(){
        console.log("In the function...");
        const result = this.teamServices.getTeamLeads();
        return result;
    }
}
