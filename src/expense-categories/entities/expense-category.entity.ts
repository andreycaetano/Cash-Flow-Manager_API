import { User } from "src/user/entities/user.entity";
import { Expense } from "src/expenses/entities/expense.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Budget } from "src/budgets/entities/budget.entity";
import { RecurringTransaction } from "src/recurring-transactions/entities/recurring-transaction.entity";

@Entity()
@Unique(['name', 'user'])
export class ExpenseCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.expenseCategories)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Expense, (expense) => expense.category, { cascade: true})
    expense: Expense[];

    @OneToMany(() => Budget, (budget) => budget.category, { cascade: true, nullable: true})
    budget: Budget[];

    @OneToMany(() => RecurringTransaction, (recurringTransaction) => recurringTransaction.category, { cascade: true, nullable: true})
    recurringTransaction: RecurringTransaction[];
    
    @Column({ type: 'char' })
    name: string;

    @Column({ type: 'char' })
    description: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
};
