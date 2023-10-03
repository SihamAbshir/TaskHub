import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Get,
    Param,
    ParseIntPipe,
    UseGuards,
 } from '@nestjs/common';
import { Role } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization/authorization.guard';
import { createTeamMemberDTO } from 'src/team-member/dtos/CreateTeamMember.dtro';
import { TeamMemberService } from 'src/team-member/services/team-member/team-member.service';

@Role(['PM','TL'])
@UseGuards(AuthenticationGuard,AuthorizationGuard)
@Controller('teamMembers')
export class TeamMemberController {
    constructor(private teamMemberService: TeamMemberService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    createTeamMember(@Body() teamMemberBody: createTeamMemberDTO){
        const result = this.teamMemberService.createTeamMember(teamMemberBody);
        return result;
    }

    @Get()
    getTeamMembers(){
        const result = this.teamMemberService.fetchTeamMembers();
        return result;
    }

    @Get(':teamMemberId')
    getTeamMemberById(@Param('teamMemberId',ParseIntPipe) id: number){
        const result = this.teamMemberService.getTeamMemberById(id);
        return result;
    }

    @Get('byTeam/:teamId')
    getTeamMemberByTeamId(@Param('teamId',ParseIntPipe) id: number){
        const result = this.teamMemberService.getTeamMemberByTeamId(id);
        return result;
    }

    @Post('avalaibleDev')
    getAvailableDevelopers(){
        const result = this.teamMemberService.availableDevelopers();
        return result;
    }
}
