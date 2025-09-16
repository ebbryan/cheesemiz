import z from "zod";

export const authSchema = z.object({
  id: z.string().optional(),
  // Better email validation
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .optional(),
  // OTP is a string, likely 4-6 digits
  otp: z.string().min(6, "OTP must be at least 6 characters").optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TAuth = z.infer<typeof authSchema>;
export type TAuthRegistrationResponse = {
  message: string;
  success: boolean;
};

export type TVerifyOTPResponse = {
  message: string;
  success: boolean;
  data: {
    user: TAuth;
    token: string;
  };
};

export type TLoginResponse = {
  message: string;
  data: {
    id: string;
    email: string;
    otp: string;
    createdAt: string;
    updatedAt: string;
  };
  success: boolean;
};
