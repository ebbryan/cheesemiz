require("dotenv").config({ path: [".env.local", ".env"] });
import crypto from "crypto";
import { sendEmail } from "@services/send-email-service";
import { UserAuth } from "./user-auth.model";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

class AuthService {
  async registerUser(email: string) {
    // Check if user already exists
    const existingUser = await UserAuth.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    } else {
      // Generate OTP and Initialize Token
      const otp = crypto.randomInt(100000, 999999).toString();

      // Create user
      const user = await UserAuth.create({
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

        return user;
      }
      return;
    }
  }

  async loginUser(email: string) {
    // Find user
    const user = await UserAuth.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Update user with new OTP
    user.otp = otp;
    const updatedOTP = await user.save();
    if (updatedOTP) {
      // Send OTP email
      await sendEmail(
        email,
        "Your Login OTP for Cheesemiz",
        `Your login OTP is: ${otp}`,
        `<p>Your login OTP is: <strong>${otp}</strong></p>`
      );
    }

    return user;
  }

  async verifyOTP(email: string, otp: string) {
    let token: string = "";
    const user = await UserAuth.findOne({ where: { email: email, otp: otp } });
    const getExpirationTime = (
      amount: number,
      unit: dayjs.ManipulateType | undefined
    ) => dayjs().add(amount, unit).unix();
    if (user) {
      token = jwt.sign(
        {
          exp: getExpirationTime(1, "day"),
          data: user,
        },
        (process.env.JWT_SECRET_KEY as string) || ""
      );
    }

    return { user, token };
  }
}

export default new AuthService();
