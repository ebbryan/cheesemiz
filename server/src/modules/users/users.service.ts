import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import { User } from "./users.model";
import { sendEmail } from "@services/send-email-service";

class UsersService {
  async registerUser(email: string) {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Create user
    const user = await User.create({
      id: uuidv4(),
      email,
      otp,
      createdAt: new Date(),
    });

    if (user) {
      // Send OTP email
      await sendEmail(
        email,
        "Your OTP for Cheesemiz",
        `Your OTP is: ${otp}`,
        `<p>Your OTP is: <strong>${otp}</strong></p>`
      );
    } else {
      return;
    }
    return user;
  }

  // static async loginUser(email: string): Promise<User> {
  //   // Find user
  //   const user = await User.findOne({ where: { email } });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   // Generate new OTP
  //   const otp = crypto.randomInt(100000, 999999).toString();

  //   // Update user with new OTP
  //   user.otp = otp;
  //   const updatedOTP = await user.save();
  //   if (updatedOTP) {
  //     // Send OTP email
  //     await sendEmail(
  //       email,
  //       "Your Login OTP for Cheesemiz",
  //       `Your login OTP is: ${otp}`,
  //       `<p>Your login OTP is: <strong>${otp}</strong></p>`
  //     );
  //   }

  //   return user;
  // }

  // static async verifyOTP(email: string, otp: string): Promise<User | null> {
  //   const user = await User.findOne({ where: { email: email, otp: otp } });
  //   console.log("VerifyOTP: user found:", user ? user.id : null);
  //   return user;
  // }
}

export default new UsersService();
