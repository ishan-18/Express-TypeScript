import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthDao } from '../dao/authDao';
import { IUserDetails } from '../interfaces/user'
import { hashPassword } from '../utils/common/hashing';
import crypto from 'crypto'
import User from '../model/User';

export class AuthService {
    static async registerUser(userDetails: IUserDetails): Promise<string> {
        const existing_email = await AuthDao.getUserByEmail(userDetails.email);
        const existing_phone = await AuthDao.getUserByPhone(userDetails.phone.number);

        if (existing_email) {
            throw new Error(`User with the email: ${userDetails.email} already exists`)
        }

        if (existing_phone) {
            throw new Error(`User with the phone number: ${userDetails.phone.number} already exists`)
        }

        userDetails.password = await hashPassword(userDetails.password);

        const newUser = await AuthDao.createUser(userDetails);

        const token = this.generateToken(newUser)

        return token
    }

    static async loginUser(email: string, password: string): Promise<string> {
        const existing_user = await AuthDao.getUserByEmail(email);

        if (!existing_user) {
            throw new Error(`User not found with email: ${email}`);
        }

        const matchPassword = await bcrypt.compare(password, existing_user.password);
        if (!matchPassword) {
            throw new Error('Invalid password');
        }

        const token = this.generateToken(existing_user);

        return token;
    }

    static async getMe(userId: string): Promise<IUserDetails | null> {
        return AuthDao.getMe(userId);
    }

    static async getAllUsers(): Promise<Array<IUserDetails>> {
        return AuthDao.getAllUsers();
    }

    static async forgotPassword(email: string): Promise<string> {
        const user = await AuthDao.getUserByEmail(email)
        if (!user) {
            throw new Error(`User not found with email: ${email}`)
        }

        const resetToken = AuthDao.getResetPasswordToken(user.email)

        return resetToken
    }

    static async saveProfileImage(userId: string, filePath: string): Promise<void> {
        try {
          const user = await User.findById(userId);
    
          if (user) {
            const profile = await AuthDao.saveProfileImage(userId, filePath)
          } else {
            throw new Error('User not found');
          }
        } catch (error) {
          throw new Error(`Error saving profile image path: ${error}`);
        }
    }

    private static generateToken(user: IUserDetails): string {
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '1h',
            }
        );

        return token;
    }

    static async resetPassword(resetToken: string, newPassword: string): Promise<IUserDetails> {
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await AuthDao.getUserByResetToken(hashedToken);

        if (!user) {
            throw new Error('Invalid token');
        }

        const hashedPassword = await hashPassword(newPassword);
        await AuthDao.updateUserAfterResetPassword(user, hashedPassword)

        user.password = hashedPassword

        return user;
    }

}