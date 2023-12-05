import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUserDetails } from '../interfaces/user';
import User from '../model/User';
import logger from '../utils/common/logger';

declare global {
    namespace Express {
        interface Request {
            user?: IUserDetails;
        }
    }
}

export async function protectRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.token as string;

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "Token not found"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
            _id: string;
            email: string;
            role: string;
        };

        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Token"
            });
        }

        const user: IUserDetails | null = await User.findById(decodedToken._id).exec();

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "Invalid Token"
            });
        }

        req.user = user;

        next();
    } catch (error: any) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

export function roleCheck(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user || req.user.role !== role) {
                return res.status(401).json({
                    success: false,
                    msg: `User: ${req.user?.role} is not authorize to access this role`
                });
            }
            next();
        } catch (error: any) {
            logger.error(error)
            return res.status(500).json({
                success: false,
                msg: error.message
            })
        }
    };
}