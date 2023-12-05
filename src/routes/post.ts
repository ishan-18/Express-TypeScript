import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { protectRoute, roleCheck } from '../middleware/auth';
import { UserRole } from '../utils/enums';

const router: Router = Router();
const API_VERSION: string = "/v1"

router.get(`${API_VERSION}/posts/all`, protectRoute, PostController.getAllPosts)
router.put(`${API_VERSION}/post/:postId/report`, protectRoute, PostController.updateReport)
router.post(`${API_VERSION}/post/`, protectRoute, PostController.createPost)
router.delete(`${API_VERSION}/post/:postId`, protectRoute, roleCheck(UserRole.ADMIN), PostController.deletePost)

export default router