import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExpenseCategory } from "../../expense-categories/entities/expense-category.entity";
import { UserPreference } from "../../user-preferences/entities/user-preference.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name', type: 'varchar', length: 50 })
    fName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 50 })
    lName: string;

    @Column({ type: 'varchar', length: 254, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255})
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
