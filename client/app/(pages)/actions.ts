"use server";

import { endpoint } from "@/utils/axios";
import { AuthType } from "@/zod-types/auth.zod";
import { AxiosError } from "axios";

export const register = async (
  payload: Omit<AuthType, "id" | "otp" | "createdAt" | "updatedAt">
) => {
  try {
    const response = await endpoint.post("/user-auth/register", payload);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message,
      };
    }
    throw error;
  }
};
