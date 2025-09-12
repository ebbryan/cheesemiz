import { Request, Response } from "express";
import usersService from "./users.service";

class UsersController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email || email.trim === "") {
        return res.status(400).json({ message: "Email is required" });
      }
      await usersService.registerUser(email);
      return res
        .status(201)
        .json({ message: "User registered, OTP sent", success: true });
    } catch (error: unknown) {
      const errorMessage = error as Error;
      return res
        .status(400)
        .json({ message: errorMessage.message, success: false });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await usersService.loginUser(email);
      return res
        .status(200)
        .json({ message: "OTP sent for login", success: true });
    } catch (error: any) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      console.log(email, otp);
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }
      const user = await usersService.verifyOTP(email, otp);
      if (user) {
        user.otp = "";
        await user.save();
        return res
          .status(200)
          .json({ message: "OTP verified successfully", userId: user.id });
      } else {
        return res.status(401).json({ message: "Invalid OTP" });
      }
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new UsersController();
