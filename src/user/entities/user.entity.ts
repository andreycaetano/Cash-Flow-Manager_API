import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExpenseCategory } from "../../expense-categories/entities/expense-category.entity";
import { UserPreference } from "../../user-preferences/entities/user-preference.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'char', length: 50 })
    fName: string;

    @Column({ name: 'last_name', type: 'char', length: 50 })
    lName: string;

    @Column({ type: 'char', unique: true })
    email: string;

    @Column({ type: 'char'})
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
    role: 'user' | 'admin';

    @OneToOne(() => UserPreference, { cascade: true, nullable: true })
    @JoinColumn({ name: 'preference_id'})
    preferences: UserPreference;

    @OneToMany(() => ExpenseCategory, (category) => category.user, { cascade: true, nullable: true })
    expenseCategories: ExpenseCategory[];
}
