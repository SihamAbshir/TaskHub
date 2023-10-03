import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTeamMemberDTO } from 'src/team-member/dtos/CreateTeamMember.dtro';
import { Team } from 'src/typeorm/entities/Team';
import { TeamMembers } from 'src/typeorm/entities/TeamMembers';
import { User, UserRole } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class TeamMemberService {
    constructor(
        @InjectRepository(TeamMembers) private teamMemberRepository: Repository<TeamMembers>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Team) private teamRepository: Repository<Team>
    ){}

    async createTeamMember(teamMemberBody: createTeamMemberDTO){
        try{
            const { user_id, team_id } = teamMemberBody
            const team = await this.teamRepository.findOne({
                where: { id: team_id }
            });
            if(!team){
                throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
            }
            const user = await this.userRepository.findOne({
                where: { id: user_id }
            });
            if(!user){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            console.log(user);
            if(user.role !== 'D'){
                throw new HttpException("Only user having role: 'D' can be pick in the team" ,HttpStatus.NOT_ACCEPTABLE)
            }
            const teamMember = await this.teamMemberRepository.findOne({
                where: { 
                    user_id: {
                        id: user_id
                    } 
                }
            });
            if(teamMember){
                throw new HttpException("The user is already in the team" ,HttpStatus.NOT_ACCEPTABLE)
            }
            
            const newTeamMember = this.teamMemberRepository.create({
                user_id: {
                    id: user_id
                },
                team_id: {
                    id: team_id
                }
            });
            const createdTeamMember = await this.teamMemberRepository.save(newTeamMember);
            return createdTeamMember;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchTeamMembers(){
        try{
            const teamMembers = await this.teamMemberRepository.find();
            if(teamMembers.length === 0){
                throw new HttpException('Team Members not found', HttpStatus.NOT_FOUND);
            }
            return teamMembers;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getTeamMemberById(id: number){
        try{
            const teamMember = await this.teamMemberRepository.findOne({
                where: { id }
            });
            if(!teamMember){
                throw new HttpException('Team Member at that id not found', HttpStatus.NOT_FOUND);
            }
            return teamMember;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
    
    async getTeamMemberByTeamId(teamId: number){
        try{
            const team = await this.teamRepository.findOne({
                where: { id: teamId }
            });
            if(!team){
                throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
            }
            const teamMemberByTeam = await this.teamMemberRepository.find({
                where: { 
                    team_id:{
                        id: teamId
                    } 
                }
            });
            if(teamMemberByTeam.length === 0){
                throw new HttpException('Team Member in that team not found', HttpStatus.NOT_FOUND);
            }
            return teamMemberByTeam;
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async availableDevelopers(){
        try{
            console.log("UserRole.D",UserRole.D)
            const dev = await this.userRepository.find({
                where: { role: UserRole.D }
            });
            if(dev.length === 0){
                throw new HttpException('Developers not found',HttpStatus.NOT_FOUND);
            }

            const teamMembers = await this.teamMemberRepository.find();
            if(teamMembers.length === 0){
                throw new HttpException('Developers not found',HttpStatus.NOT_FOUND);
            }
            
            // Find developers who are not in teamMembers
        const availableDevelopers = dev.filter((developer) => {
            return !teamMembers.some(
                (teamMember) => teamMember.user_id.id === developer.id
            );
        });

        console.log("availableDevelopers",availableDevelopers);
        return availableDevelopers;

        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }


}
