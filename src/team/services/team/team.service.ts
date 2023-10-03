import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTeamDTO } from 'src/team/dtos/CreateTeam.dto';
import { Team } from 'src/typeorm/entities/Team';
import { UpdateTeamType } from 'src/utilities/types';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team) private teamRepository: Repository<Team>
    ){}

    async createTeam(teamDetails: createTeamDTO){
        try
        {
            const { team_name } = teamDetails;
            const newTeam = this.teamRepository.create({
                team_lead : {
                    id : teamDetails.team_lead
                },
                team_name: team_name
            })
            console.log("newTeam",newTeam)
            let res = await this.teamRepository.save(newTeam);
            return res;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchTeams(){
        try{
            const teams = await this.teamRepository.find();
            if(teams.length === 0){
                throw new HttpException('Teams not found', HttpStatus.NOT_FOUND);
            }
            return teams;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getTeamById(id : number){
        try{
            const team = await this.teamRepository.findOne({
                where: { id }
            });
            if(!team){
                throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
            }
            return team;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateTeam(id: number, teamBody: UpdateTeamType){
        try{
            const team = await this.teamRepository.findOne({
                where: { id }
            });
            if(!team){
                throw new HttpException('Team to be updated not found', HttpStatus.NOT_FOUND);
            }
            const updateTeam = teamBody;
            await this.teamRepository.update({ id }, updateTeam);
            return {
                message: 'The Team is updated successfully...'
            }
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async deleteTeam(id: number){
        try{
            const team = await this.teamRepository.findOne({
                where: { id }
            });
            if(!team){
                throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
            }
            await this.teamRepository.delete({ id });
            return {
                message: "The team is deleted sucessfully..."
            }
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getTeamLeads(){
        try{
            const teams = await this.teamRepository.find();
            if(teams.length === 0){
                throw new HttpException('Teams not found...',HttpStatus.NOT_FOUND);
            }

            const teamLeads = teams.map(team => team.team_lead);
            console.log(teamLeads);
            return teamLeads;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
}

