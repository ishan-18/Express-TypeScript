import { IPostDetails } from "../interfaces/post";
import Post from "../model/Post";

export class PostDao {
    static async getAllPosts(): Promise<Array<IPostDetails>> {
        return Post.find().populate('user', '_id name email').exec();
    }

    static async updateReport(postId: string, status: boolean): Promise<IPostDetails | null> {
        return Post.findByIdAndUpdate(postId, {
            report: status,
            is_offensive: true
        }, {
            new: true
        }).populate('user', '_id name email').exec();
    }

    static async createPost(postDetails: IPostDetails): Promise<IPostDetails> {
        const newPost = new Post(postDetails);
        return newPost.save();
    }

    static async getPostById(postId: string): Promise<IPostDetails | null> {
        return Post.findById(postId).exec();
    }


    static async deletePostById(postId: string): Promise<void> {
        Post.findByIdAndDelete(postId).exec();
        return
    }
}