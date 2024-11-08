import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserPreference {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.preferences)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column({ name: 'default_currency', type: 'varchar', length: 5 })
    defaultCurrency: string;

    @Column({ type: 'varchar', length: 5})
    language: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
