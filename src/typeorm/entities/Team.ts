import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { TeamMembers } from "./TeamMembers";
import { Project } from "./Project";

@Entity({ name: 'teams' })
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team_name: string;

    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date;

    // Foreign Keys
    @OneToOne(() => User, {
        eager: true,
    })
    @JoinColumn({ name: 'team_lead' })
    team_lead: User;

    // Relations
    @OneToMany(() => TeamMembers, (team_member) => team_member.team_id,{
        onDelete: 'CASCADE',
      })
    team_members: TeamMembers[];

    @OneToMany(() => Project, (project) => project.assigned_team,{
        onDelete: 'CASCADE',
      })
    projects: Project[];
}
