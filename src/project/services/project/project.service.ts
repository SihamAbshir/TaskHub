import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProjectDTO } from 'src/project/dtos/CreateProject.dto';
import { updateProjectDTO } from 'src/project/dtos/UpdateProject.dto';
import { updateProjectStatusDTO } from 'src/project/dtos/UpdateProjectStatus.dto';
import { Project } from 'src/typeorm/entities/Project';
import { UpdateProjectType } from 'src/utilities/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private projectRepository : Repository<Project>
    ){}

    async createProject(projectRequest:createProjectDTO){
        try{
            const {assigned_PM,assigned_team} = projectRequest;
        const newProject = this.projectRepository.create({
            assigned_team : {
                id: assigned_team
            }, 
            assigned_PM : {
                id : assigned_PM
            },
            project_name: projectRequest.project_name,
            description: projectRequest.description,
            status: projectRequest.status
        })
        await this.projectRepository.save(newProject);
        console.log("From createProject Services",newProject);
        return newProject
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchProjects(){
        try{
            const projects = await this.projectRepository.find();
            if(projects.length === 0){
                throw new HttpException("No Projects found..", HttpStatus.NOT_FOUND);
            }
            return projects;
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getProjectById(id: number){
        try{
            const project = await this.projectRepository.findOne({
                where: { id }
            })
            if(!project){
                throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
            }
            return project;
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateProject(id:number, projectBody: UpdateProjectType){
        try{
            const project = await this.projectRepository.findOne({
                where: { id }
            })
        if(!project){
            throw new HttpException("Project to be updated is not found", HttpStatus.NOT_FOUND)
        }

        const updateProject = projectBody;
        await this.projectRepository.update({ id }, updateProject);
  
        return {
            message: 'Project Updated Sucessfully',
        }
        } catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async deleteProject(id : number){
        try{
            const Project = await this.projectRepository.findOne({
                where: { id }
            })
            console.log(Project);
            if(!Project){
                throw new HttpException('Project not found at that Id', HttpStatus.NOT_FOUND);
            }
            await this.projectRepository.delete({id})
            return {
                message: `Project having id: ${id} is deleted successfully...`
            }
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getProjectsByPM(PM_Id: number){
        try{
            const projectByPM = await this.projectRepository.find({
                where: { assigned_PM: {
                    id: PM_Id
                } }
            });
            if(projectByPM.length === 0){
                throw new HttpException("No Projects found..", HttpStatus.NOT_FOUND);
            }
            console.log(projectByPM);
            return projectByPM
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getProjectsByTL(TL_Id: number){
        try{
            const ProjectsByTL = await this.projectRepository.find({
                where: { 
                    assigned_team : {
                        team_lead: {
                            id: TL_Id
                        }
                    }
                }
            });
            if(ProjectsByTL.length === 0){
                throw new HttpException("No Projects found..", HttpStatus.NOT_FOUND);
            }
            console.log(ProjectsByTL);
            return ProjectsByTL
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateProjectStatus(projectStatus:updateProjectStatusDTO){
        try{
            const { id, status } = projectStatus;
            const project = await this.projectRepository.findOne({
                where: { id }
            })
            if(!project){
                throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
            }
            if(project.status === status){
                console.log("Status",project.status,status);
                return {
                    message: `Project status is already ${status}`,
                }
            }
            await this.projectRepository.update({ id }, projectStatus);
            return {
                message: 'Project Status Updated Sucessfully',
            }
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }

    }
}
