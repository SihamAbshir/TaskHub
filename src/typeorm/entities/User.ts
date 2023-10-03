import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { Task } from "./Task";
import { Team } from "./Team";
import { TeamMembers } from "./TeamMembers";

export enum UserRole {
    PM = 'PM',
    TL = 'TL',
    D = 'D',
  }

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({
        type: 'enum',
        enum: UserRole, // Specify the enum values here
        default: UserRole.D, // Optional: Set a default value if needed
      })
    role: UserRole;

    @CreateDateColumn()
    created_at:Date; 

    @UpdateDateColumn()
    updated_at:Date;

    //Foriegn Keys
   

    //Relations
    @OneToMany(() => Project, (project) => project.assigned_PM,{
      onDelete: 'CASCADE',
    })
    projects: Project[];

    @OneToOne(() => Team, (team) => team.team_lead,{
      onDelete: 'CASCADE',
    })
    teams: Team[];

    @OneToOne(() => TeamMembers, (team_member) => team_member.user_id,{
      onDelete: 'CASCADE',
    })
    team_members: TeamMembers[];

    @OneToMany(() => Task, (task) => task.user_id,{
      onDelete: 'CASCADE',
    })
    tasks: Task[];
}