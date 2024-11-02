import { ExpenseCategory } from "../../expense-categories/entities/expense-category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Expense {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ExpenseCategory, (category) => category.expense)
    @JoinColumn({ name: 'expense_category' })
    category: ExpenseCategory;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'char' })
    description: string;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
