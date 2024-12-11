import { DeepPartial } from 'typeorm';
import { Redis } from 'ioredis';
import { config } from '../config';
import {User} from "../db/models";

const redis = new Redis(config.redis_url);

export class UserService {
    static async createUser(data: Partial<User>): Promise<User> {
        const user = User.create(data as DeepPartial<User>);
        return await user.save();
    }

    static async getUsers(page: number, limit: number): Promise<User[]> {
        const cacheKey = `users:${page}:${limit}`;
        const cachedUsers = await redis.get(cacheKey);

        if (cachedUsers) {
            return JSON.parse(cachedUsers);
        }

        const users = await User.find({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: 'ASC' }
        });

        await redis.setex(cacheKey, 60, JSON.stringify(users));
        return users;
    }

    static async deleteUsers(ids: number[]): Promise<void> {
        await User.delete(ids);
        await this.clearCache();
    }

    private static async clearCache(): Promise<void> {
        const keys = await redis.keys('users:*');
        if (keys.length) {
            await redis.del(...keys);
        }
    }
}