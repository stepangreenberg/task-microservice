import { Request, Response } from 'express';
import { UserService } from '../../services/user.service';
import { createUserSchema } from '../validations';

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const { error, value } = createUserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const user = await UserService.createUser(value);
            return res.status(201).json({ id: user.id });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }

    static async getUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const users = await UserService.getUsers(page, limit);
            return res.json(users);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }

    static async deleteUsers(req: Request, res: Response) {
        try {
            const { ids } = req.body;
            await UserService.deleteUsers(ids);
            return res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }
}