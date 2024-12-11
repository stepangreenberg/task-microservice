import {RequestHandler} from 'express';
import {healthController} from '../controllers';

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
];
