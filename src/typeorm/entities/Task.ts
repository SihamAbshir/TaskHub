import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

export enum TaskStatus {
    NotStarted = 'NotStarted',
    InProgress = 'InProgress',
    Completed = 'Completed',
  }

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task_name:string;

    @Column('text')
    description:string;

    @Column({
        type: 'enum',
        enum: TaskStatus, // Specify the enum values here
        default: TaskStatus.NotStarted, // Optional: Set a default value if needed
      })
    status: TaskStatus;

    @CreateDateColumn()
    created_at:Date; 

    @UpdateDateColumn()
    updated_at:Date;

    // Foriegn Keys
    @ManyToOne(() => Project, {
        eager: true,
    })
    @JoinColumn({ name: 'project_id' })
    project_id: Project;

    @ManyToOne(() => User, {
      eager: true,
      nullable: true, // Allow NULL values for user_id
    })
    @JoinColumn({ name: 'user_id' })
    user_id: User | null; // Make sure to handle it as nullable in the type


    //Relations
    
}