import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class RecurringTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ExpenseCategory, (category) => category.recurringTransaction)
    category: ExpenseCategory;

    @Column({ name: 'transaction_name' ,type: 'char' })
    transactionName:string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    amount: number;

    @Column({ type: 'enum', enum: ['daily', 'weekly', 'monthly', 'yearly']})
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'

    @Column({ name: 'start_date' ,type: 'date' })
    startDate: Date;

    @Column({ name: 'end_date' ,type: 'date' })
    endDate: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
