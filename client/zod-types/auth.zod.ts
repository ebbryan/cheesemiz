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

export type AuthType = z.infer<typeof authSchema>;
export type AuthRegistrationResponse = {
  message: string;
  success: boolean;
};
