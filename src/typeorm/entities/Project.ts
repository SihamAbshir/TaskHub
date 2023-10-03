import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Task } from "./Task";
import { Team } from "./Team";

export enum ProjectStatus {
    NotStarted = 'NotStarted',
    InProgress = 'InProgress',
    Completed = 'Completed',
  }

@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_name:string;

    @Column('text')
    description:string;

    @Column({
        type: 'enum',
        enum: ProjectStatus, // Specify the enum values here
        default: ProjectStatus.NotStarted, // Optional: Set a default value if needed
      })
    status: ProjectStatus;

    @CreateDateColumn()
    created_at:Date; 

    @UpdateDateColumn()
    updated_at:Date;

    // Foriegn Keys 
    @ManyToOne(() => User, {
        eager: true,
    })
    @JoinColumn({ name: 'assigned_PM' })
    assigned_PM: User;

    @ManyToOne(() => Team, {
        eager: true,
    })
    @JoinColumn({ name: 'assigned_team' })
    assigned_team: Team;

    //Relations
    @OneToMany(() => Task, (task) => task.project_id,{
      onDelete: 'CASCADE',
    })
    tasks: Task[];

}