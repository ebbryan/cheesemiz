require("dotenv").config({ path: [".env.local", ".env"] });
import crypto from "crypto";
import { sendEmail } from "@services/send-email-service";
import { UserAuth } from "./user-auth.model";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

class AuthService {
  async registerUser(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await UserAuth.findOne({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Create user
    const user = await UserAuth.create({
      email: normalizedEmail,
      otp,
      createdAt: new Date(),
    });

    // Send OTP email
    await sendEmail(
      normalizedEmail,
      "Your OTP for Cheesemiz",
      `Your OTP is: ${otp}`,
      `<p>Your OTP is: <strong>${otp}</strong></p>`
    );

    return user;
  }

  async loginUser(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await UserAuth.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Update user with new OTP
    user.otp = otp;
    await user.save();

    // Send OTP email
    await sendEmail(
      normalizedEmail,
      "Your Login OTP for Cheesemiz",
      `Your login OTP is: ${otp}`,
      `<p>Your login OTP is: <strong>${otp}</strong></p>`
    );

    return user;
  }

  async verifyOTP(email: string, otp: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserAuth.findOne({
      where: { email: normalizedEmail, otp },
    });
    if (!user) {
      return { user: null, token: "" };
    }

    const getExpirationTime = (
      amount: number,
      unit: dayjs.ManipulateType | undefined
    ) => dayjs().add(amount, unit).unix();

    const token = jwt.sign(
      {
        exp: getExpirationTime(1, "day"),
        data: user,
      },
      process.env.JWT_SECRET_KEY || ""
    );

    return { user, token };
  }
}

export default new AuthService();
