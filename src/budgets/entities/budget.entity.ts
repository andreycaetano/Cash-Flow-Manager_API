import { ExpenseCategory } from "src/expense-categories/entities/expense-category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Budget {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ExpenseCategory, (category) => category.budget)
    category: ExpenseCategory;

    @Column({ name: 'amount-limit', type: 'decimal', precision: 12, scale: 2})
    amountLimit: number;

    @Column({ name: 'status', type: 'enum', enum: ['active', 'expired'], default: 'active'})
    status: 'active' | 'expired'

    @Column({ name: 'start_date', type: 'date'})
    startDate: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
