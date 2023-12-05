import { PostDao } from "../dao/postDao";
import { IPostDetails } from "../interfaces/post";

export class PostService {
    static async getAllPosts(): Promise<Array<IPostDetails>> {
        return PostDao.getAllPosts();
    }

    static async updateReport(postId: string, status: boolean): Promise<IPostDetails | null> {
        return PostDao.updateReport(postId, status);
    }

    static async createPost(postDetails: IPostDetails): Promise<IPostDetails> {
        return PostDao.createPost(postDetails);
    }

    static async deletePost(postId: string, isAdmin: boolean): Promise<void> {
        const post = await PostDao.getPostById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        if (post.report && isAdmin) {
            await PostDao.deletePostById(postId);
        } else {
            throw new Error('Unauthorized: Only admins can delete reported posts');
        }
    }
}