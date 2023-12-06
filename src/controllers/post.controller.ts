import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid'
import { AuthService } from "../services/authService";
import { PostService } from "../services/postService";
import logger from "../utils/common/logger";
import { UserRole } from "../utils/enums";
import { postValidator } from "../utils/validator/validate";

export class PostController {
    static async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const posts = await PostService.getAllPosts();
            res.status(200).json({
                success: true,
                data: posts,
            });
        } catch (error: any) {
            logger.error(`Error fetching posts: ${error.message}`);
            res.status(500).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async updateReport(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.postId;
            const reportStatus = req.body.report;

            const userId = req.user?._id as string
            if (!userId) {
                res.status(400).json({
                    success: false,
                    msg: `You should sign in your account`
                })
            }

            const user = await AuthService.getMe(userId)
            if (user) {
                const post = await PostService.updateReport(postId, reportStatus);

                if (!post) {
                    res.status(404).json({
                        success: false,
                        msg: `Post with ID ${postId} not found.`,
                    });
                    return;
                }

                res.status(200).json({
                    success: true,
                    data: post,
                });
            } else {
                res.status(400).json({
                    success: false,
                    msg: `You should sign in your account`
                })
            }
        } catch (error: any) {
            logger.error(`Error updating post report: ${error.message}`);
            res.status(500).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id, title, desc } = req.body;

            const validationResult = postValidator.validate(req.body);

            if (validationResult.error) {
                const validationErrors = validationResult.error.details.map((error) => error.message);
                res.status(400).json({ errors: validationErrors });
                return;
            }

            const userId = req.user?._id as string
            if (!userId) {
                res.status(400).json({
                    success: false,
                    msg: `You should sign in your account`
                })
            }

            const user = await AuthService.getMe(userId)
            if (user) {
                const newPost = await PostService.createPost({
                    _id: uuidv4(),
                    title,
                    desc,
                    user: userId
                });

                res.status(201).json({
                    success: true,
                    data: newPost,
                });
            } else {
                res.status(400).json({
                    success: false,
                    msg: `You should sign in your account`
                })
            }
        } catch (error: any) {
            logger.error(`Error creating post: ${error.message}`);
            res.status(500).json({
                success: false,
                msg: error.message,
            });
        }
    }

    static async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.postId;
            const isAdmin = req.user?.role === UserRole.ADMIN; 

            await PostService.deletePost(postId, isAdmin);

            res.status(200).json({
                success: true,
                msg: 'Post deleted successfully',
            });
        } catch (error: any) {
            logger.error(`Error deleting post: ${error.message}`);
            res.status(500).json({
                success: false,
                msg: 'Internal Server Error',
            });
        }
    }
}