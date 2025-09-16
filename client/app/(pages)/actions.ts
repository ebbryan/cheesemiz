"use server";

import { endpoint } from "@/utils/axios";
import {
  TAuth,
  TAuthRegistrationResponse,
  TLoginResponse,
  TVerifyOTPResponse,
} from "@/zod-types/auth.zod";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

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

export const userLogin = async (
  payload: Omit<TAuth, "id" | "otp" | "createdAt" | "updatedAt">
) => {
  try {
    const response = (await endpoint.post("/user-auth/login", payload))
      .data as TLoginResponse;
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

export const userLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
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
    const cookieStore = await cookies();
    const response = (await endpoint
      .post("/user-auth/verify-otp", payload)
      .then((res) => {
        cookieStore.set("token", res.data.data.token);
      })) as TVerifyOTPResponse;

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
