import { NextFunction, Request, Response } from 'express'
import { IUserDetails } from '../interfaces/user';
import { userLoginValidator, userRegisterValidator } from '../utils/validator/validate';
import { v4 as uuidv4 } from 'uuid'
import { AuthService } from '../services/authService';
import sendEmail from '../utils/common/sendEmail';
import logger from '../utils/common/logger';

export class AuthController {
    static async register_user(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, password, phone, address, role } = req.body

            const validationResult = userRegisterValidator.validate(req.body);

            if (validationResult.error) {
                const validationErrors = validationResult.error.details.map((error) => error.message);
                res.status(400).json({ errors: validationErrors });
                return;
            }

            const user_details: IUserDetails = {
                _id: uuidv4(),
                name,
                email,
                password,
                phone,
                address,
                role
            }

            try {
                const newUser = await AuthService.registerUser(user_details);

                res.status(201).json({
                    success: true,
                    data: newUser,
                });
            } catch (error: any) {
                logger.error(`Error in register_user controller: ${error.message}`);
                res.status(400).json({ error: error.message });
            }

        } catch (error) {
            logger.error(`Error in Registering User`);
            res.status(500).json({
                success: false,
                msg: error
            })
        }
    }

    static async login_user(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            const validationResult = userLoginValidator.validate(req.body);

            if (validationResult.error) {
                const validationErrors = validationResult.error.details.map((error) => error.message);
                res.status(400).json({ errors: validationErrors });
                return;
            }

            try {
                const result = await AuthService.loginUser(email, password);
                res.status(200).json({
                    success: true,
                    data: result,
                });
            } catch (error: any) {
                logger.error(`Error in User Login: ${error.message}`);
                res.status(401).json({
                    success: false,
                    msg: error.message,
                });
            }
        } catch (error: any) {
            logger.error(`Error in login_user controller: ${error.message}`);
            res.status(401).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user?._id
            if (!user) {
                res.status(401).json({
                    success: false,
                    msg: 'Unauthorized: User ID not found',
                });
                return
            }

            const user_details = await AuthService.getMe(user);
            if (!user_details) {
                res.status(404).json({
                    success: false,
                    msg: 'User not found',
                });
                return
            }

            res.status(200).json({
                success: true,
                data: user_details,
            });

        } catch (error: any) {
            logger.error(`Error in getMe controller: ${error.message}`);
            res.status(401).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users: Array<IUserDetails> = await AuthService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            })
        } catch (error: any) {
            logger.error(`Error in getAllUsers controller: ${error.message}`);
            res.status(401).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body
            const resetToken = await AuthService.forgotPassword(email)

            const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`;

            const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to:\n\n${resetUrl}`;

            try {
                await sendEmail({
                    email,
                    subject: 'Password Reset Token',
                    message,
                });
                res.status(200).json({ success: true, data: 'Email sent' });
            } catch (error: any) {
                logger.error(`Error in forgotPassword controller: ${error.message}`);
                res.status(401).json({
                    success: false,
                    msg: error.message,
                });
            }
        } catch (error: any) {
            logger.error(`Error in forgotPassword controller: ${error.message}`);
            res.status(401).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { resettoken } = req.params;
            const { password } = req.body;

            const user = await AuthService.resetPassword(resettoken, password);

            res.status(200).json({
                status: true,
                data: user
            })

        } catch (error: any) {
            logger.error(`Error in resetPassword: ${error.message}`);
            res.status(400).json({
                success: false,
                msg: error.message
            });
        }
    } 
}