import exp from "constants";
import { type } from "os";
import { ProjectStatus } from "src/typeorm/entities/Project";
import { TaskStatus } from "src/typeorm/entities/Task";
import { UserRole } from "src/typeorm/entities/User";

export type CreateUserType = {
    username: string;
    email: string; 
    password: string;
    role: UserRole
}

export type ValidateUserType = {
    email: string; 
    password: string;
    role: UserRole
}

export type UpdateUserType = {
    username?: string,
    email?: string,
    role?: UserRole
}

export type UpdateProjectType = {
    project_name?: string;
    description?: string;
    status?: ProjectStatus;
    assigned_PM?: {
        id : number
    };
    assigned_team?: {
        id : number
    };
}

export type UpdateTaskType = {
    task_name?: string;
    description?: string;
    status?: TaskStatus;
    project_id?:  {
        id : number
    };
    user_id?:  {
        id : number
    };
}

export type UpdateTeamType = {
    team_name?: string;
    team_lead?:  {
        id : number
    };
}






