import { Task } from '../db/models/task.entity';
import { Redis } from 'ioredis';
import { config } from '../config';
import { DeepPartial } from 'typeorm';


const redis = new Redis(config.redis_url);

export class TaskService {
    static async createTask(data: Partial<Task>): Promise<Task> {
        const task = Task.create(data as DeepPartial<Task>);
        return await task.save();
    }


    static async getTasks(page: number, limit: number): Promise<Task[]> {
        const cacheKey = `tasks:${page}:${limit}`;
        const cachedTasks = await redis.get(cacheKey);

        if (cachedTasks) {
            return JSON.parse(cachedTasks);
        }

        const tasks = await Task.findTasks(page, limit);
        await redis.setex(cacheKey, 60, JSON.stringify(tasks));
        return tasks;
    }

    static async updateStatus(id: number, status: string): Promise<Task | null> {
        const task = await Task.updateStatus(id, status);
        await this.clearCache();
        return task;
    }

    static async deleteTasks(ids: number[]): Promise<void> {
        await Task.deleteTasks(ids);
        await this.clearCache();
    }

    private static async clearCache(): Promise<void> {
        const keys = await redis.keys('tasks:*');
        if (keys.length) {
            await redis.del(...keys);
        }
    }
}