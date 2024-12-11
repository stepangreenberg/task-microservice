import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('tasks')
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({
        type: 'enum',
        enum: ['pending', 'in-progress', 'done'],
        default: 'pending'
    })
    status: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    // Active Record Methods
    static async findTasks(page: number, limit: number): Promise<Task[]> {
        return await this.createQueryBuilder('task')
            .leftJoinAndSelect('task.user', 'user')
            .select([
                'task.id',
                'task.title',
                'task.description',
                'task.status',
                'task.userId',
                'user.name'
            ])
            .orderBy('task.id', 'ASC')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    }

    static async updateStatus(id: number, status: string): Promise<Task | null> {
        await this.update(id, { status });
        return this.findOne({ where: { id } });
    }

    static async deleteTasks(ids: number[]): Promise<void> {
        await this.delete(ids);
    }
}