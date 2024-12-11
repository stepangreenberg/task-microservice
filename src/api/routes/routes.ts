import { RequestHandler } from 'express';
import { healthController, TaskController } from '../controllers';

export type Route = {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: RequestHandler | RequestHandler[];
    type?: 'public' | 'private';
    action?: 'C' | 'R' | 'U' | 'D' | 'V';
    label?: string;
};

export const routes: Route[] = [
    {
        method: 'get',
        path: '/healthController',
        handler: healthController,
        type: 'public',
        action: 'V',
    },
    {
        method: 'post',
        path: '/tasks',
        handler: TaskController.createTask,
        type: 'public',
        action: 'C',
    },
    {
        method: 'get',
        path: '/tasks',
        handler: TaskController.getTasks,
        type: 'public',
        action: 'R',
    },
    {
        method: 'put',
        path: '/tasks/:id',
        handler: TaskController.updateTaskStatus,
        type: 'public',
        action: 'U',
    },
    {
        method: 'delete',
        path: '/tasks',
        handler: TaskController.deleteTasks,
        type: 'public',
        action: 'D',
    },
    {
        method: 'get',
        path: '/routes',
        handler: [],  // This is handled in index.ts
        type: 'public',
        action: 'R',
    }
];