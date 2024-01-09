import User from '../model/User'
import { IUserDetails } from '../interfaces/user'
import crypto from 'crypto'

export class AuthDao {
    static async getUserByEmail(email: string): Promise<IUserDetails | null> {
        return User.findOne({ email }).exec()
    }

    static async getUserByPhone(phone: string): Promise<IUserDetails | null> {
        return User.findOne({ 'phone.number': phone }).exec()
    }

    static async createUser(userDetails: IUserDetails): Promise<IUserDetails> {
        const newUser = new User(userDetails);
        return newUser.save();
    }

    static async getMe(userId: string): Promise<IUserDetails | null> {
        return User.findById(userId).exec();
    }

    static async getAllUsers(): Promise<Array<IUserDetails>> {
        return User.find({}).exec();
    }

    static async getResetPasswordToken(email: string): Promise<string> {
        const resetToken = crypto.randomBytes(20).toString('hex');
        const reset_password_token = crypto.createHash('sha256').update(resetToken).digest('hex')

        const reset_password_expire = new Date(Date.now() + 10 * 60 * 1000);
        User.findOneAndUpdate({ email }, {
            reset_password_token,
            reset_password_expire
        }, {
            new: true
        }).exec();

        return resetToken;
    }

    static async getUserByResetToken(resetToken: string): Promise<IUserDetails | null> {
        return User.findOne({
            reset_password_token: resetToken,
            reset_password_expire: { $gt: Date.now() },
        }).exec();
    }

    static async updateUserAfterResetPassword(user: IUserDetails, new_password: string): Promise<IUserDetails | null>  {
        return User.findOneAndUpdate({email: user.email},{
            password: new_password,
            reset_password_token: undefined,
            reset_password_expire: undefined,
        }, {
            new: true
        }).exec();
    }

    static async saveProfileImage(userId: string, filePath: string): Promise<void> {
        try {
          const user = await User.findById(userId);
    
          if (user) {
            user.profile_image = filePath;
            await user.save();
          }
        } catch (error) {
          throw new Error('Error saving profile image path');
        }
    }
}