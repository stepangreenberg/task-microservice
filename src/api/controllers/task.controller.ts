import { Request, Response } from 'express';
import { Task } from '../../db/models/task.entity';
import { TaskService } from '../../services/task.service';
import { createTaskSchema, updateTaskStatusSchema } from '../validations';

export class TaskController {
    static async createTask(req: Request, res: Response) {
        try {
            const { error, value } = createTaskSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const task = await TaskService.createTask(value);
            return res.status(201).json({ id: task.id });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }

    static async getTasks(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const tasks = await TaskService.getTasks(page, limit);
            return res.json(tasks);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }

    static async updateTaskStatus(req: Request, res: Response) {
        try {
            const { error, value } = updateTaskStatusSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const task = await TaskService.updateStatus(parseInt(req.params.id), value.status);
            return res.json(task);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }

    static async deleteTasks(req: Request, res: Response) {
        try {
            const { ids } = req.body;
            await TaskService.deleteTasks(ids);
            return res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            return res.status(500).json({ error: errorMessage });
        }
    }
}