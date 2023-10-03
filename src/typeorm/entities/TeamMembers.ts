import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";
import { User } from "./User";
import { Team } from "./Team";

@Entity({ name: 'team_members' })
export class TeamMembers {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at:Date; 

    @UpdateDateColumn()
    updated_at:Date;

    // Foriegn Keys
    @OneToOne(() => User, {
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user_id: User;

    @ManyToOne(() => Team, {
        eager: true,
    })
    @JoinColumn({ name: 'team_id' })
    team_id: Team;

    //Relations
    
}