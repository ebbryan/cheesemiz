"use server";

import { endpoint } from "@/utils/axios";
import {
  TAuth,
  TAuthRegistrationResponse,
  TVerifyOTPResponse,
} from "@/zod-types/auth.zod";
import { AxiosError } from "axios";

export const userRegistration = async (
  payload: Omit<TAuth, "id" | "otp" | "createdAt" | "updatedAt">
) => {
  try {
    const response = (await endpoint.post("/user-auth/register", payload))
      .data as TAuthRegistrationResponse;

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
  payload: Omit<TAuth, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const response = (await endpoint.post("/user-auth/verify-otp", payload))
      .data as TVerifyOTPResponse;

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
