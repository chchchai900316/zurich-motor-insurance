import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ForbiddenException } from '../common/exception/ForbbiddenException';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const role = req.headers['role'];
        const method = req.method;
        const path = req.path;

        if (path === '/') {
            if (role === 'admin') return next();
            if (method === 'GET') return next();
        }

        throw new ForbiddenException();
    }
}