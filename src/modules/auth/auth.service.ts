import User from "../user/user.model"; // Adjust path and IUser interface if necessary
import { IUser } from "../user/user.interface";
import NotAuhorizedError from "../../errors/notAuthorized.error";
import NotFoundError from "../../errors/notFound.error";

class AuthService {
  /**
   * Signs up a new user.
   * @param user - The user object to create.
   * @returns The created user document.
   */
  async signUp(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }

  /**
   * Signs in an existing user by validating email and password.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns The user document if authenticated, otherwise null.
   */
  async signIn(email: string, password: string): Promise<IUser | null> {
    // Find user by email and include the password field for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Validate the provided password with the stored hash
    const isPasswordValid = await user.correctPassword(password, user.password);
    if (!isPasswordValid) {
      throw new NotAuhorizedError("Invalid email or password");
    }

    user.password = undefined as any;
    return user;
  }

  /**
   * Updates the password of a user.
   * @param userId - The user's ID.
   * @param password - The new password.
   */
  updatePassword = async (userId: string, password: string) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found')
    }

    const isPasswordValid = await user.correctPassword(password, user.password);

    if (!isPasswordValid) {
      throw new NotAuhorizedError("Invalid password");
    }

    user.password = password;
    await user.save();
  }
}

export default AuthService;
