import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);

    // Log request body for methods that typically have a body
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        console.log('Request Body:', req.body);
    }

    next();
};

export default requestLogger;