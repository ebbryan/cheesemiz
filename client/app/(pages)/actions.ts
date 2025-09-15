"use server";

import { endpoint } from "@/utils/axios";
import { AuthRegistrationResponse, AuthType } from "@/zod-types/auth.zod";
import { AxiosError } from "axios";

export const userRegistration = async (
  payload: Omit<AuthType, "id" | "otp" | "createdAt" | "updatedAt">
) => {
  try {
    const response = (await endpoint.post("/user-auth/register", payload))
      .data as AuthRegistrationResponse;

    return response;
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

export const otpVerification = async (
  payload: Omit<AuthType, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const response = (await endpoint.post("/user-auth/verify-otp", payload))
      .data;
    console.log(`Response!`, response);
    return response;
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
