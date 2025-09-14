require("dotenv").config({ path: [".env.local", ".env"] });
import { UserAuth } from "@modules/user-auth/user-auth.model";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

export const GenerateOTP = (email: string) => {
  const getExpirationTime = (
    amount: number,
    unit: dayjs.ManipulateType | undefined
  ) => dayjs().add(amount, unit).unix();

  //   if (response) {
  //     const otp = response.slice(6, 6);
  //     return otp;
  //   }

  //   throw new Error("Something error in generating OTP!");
};
