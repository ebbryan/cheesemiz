import { Request, Response } from "express";
import userAuthService from "./user-auth.service";

class UserAuthController {
  async registerUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email || email.trim === "") {
        return res.status(400).json({ message: "Email is required" });
      }
      await userAuthService.registerUser(email);
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
      const user = await userAuthService.loginUser(email);
      return res
        .status(200)
        .json({ message: "OTP sent for login", data: user, success: true });
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
      const response = await userAuthService.verifyOTP(email, otp);

      if (response && response.user) {
        // Remove optional chaining since we've already checked response.user exists
        response.user.otp = `${response.user.otp}-used`;
        await response.user.save();
        return res.status(200).json({
          message: "OTP verified successfully",
          data: response,
          success: true,
        });
      } else {
        return res.status(401).json({ message: "Invalid OTP", success: false });
      }
    } catch (error: any) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}

export default new UserAuthController();
