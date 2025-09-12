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

  // static async login(req: Request, res: Response) {
  //   try {
  //     const { email } = req.body;
  //     if (!email) {
  //       return res.status(400).json({ message: "Email is required" });
  //     }
  //     const user = await UsersService.loginUser(email);
  //     return res
  //       .status(200)
  //       .json({ message: "OTP sent for login", userId: user.id });
  //   } catch (error: any) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  // static async verifyOTP(req: Request, res: Response) {
  //   try {
  //     const { email, otp } = req.body;
  //     console.log(email, otp);
  //     if (!email || !otp) {
  //       return res.status(400).json({ message: "Email and OTP are required" });
  //     }
  //     const user = await UsersService.verifyOTP(email, otp);
  //     if (user) {
  //       user.otp = "";
  //       await user.save();
  //       return res
  //         .status(200)
  //         .json({ message: "OTP verified successfully", userId: user.id });
  //     } else {
  //       return res.status(401).json({ message: "Invalid OTP" });
  //     }
  //   } catch (error: any) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }
}

export default new UsersController();
