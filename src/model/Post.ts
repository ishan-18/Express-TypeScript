import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'
import { IPostDetails } from '../interfaces/post';

const postSchema = new Schema<IPostDetails>({
    _id: {
        type: String,
        default: uuidv4()
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    is_offensive: {
        type: Boolean,
        default: false
    },
    report: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        ref: "User"
    }
}, {
    timestamps: true
})

export default model<IPostDetails>('Post', postSchema);