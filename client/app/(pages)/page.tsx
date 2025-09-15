"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useModalActions from "@/hooks/useModalActions";
import { authSchema, AuthType } from "@/zod-types/auth.zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/spinner";
import { otpVerification, userRegistration } from "./actions";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const emailModal = useModalActions();
  const otpModal = useModalActions();

  const emailForm = useForm<
    Omit<AuthType, "id" | "otp" | "createdAt" | "updatedAt">
  >({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const onEmailSubmit = async (
    payload: Omit<AuthType, "id" | "otp" | "createdAt" | "updatedAt">
  ) => {
    const response = await userRegistration(payload);
    if (!response.success) {
      return alert(response.message);
    }
    emailForm.reset();
    emailModal.onCloseModal();
    setEmail(payload && payload?.email ? payload?.email : undefined);
    otpModal.onOpenModal();
  };

  const otpForm = useForm<
    Omit<AuthType, "id" | "email" | "createdAt" | "updatedAt">
  >({
    resolver: zodResolver(authSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onOTPSubmit = async (
    payload: Omit<AuthType, "id" | "email" | "createdAt" | "updatedAt">
  ) => {
    console.log("Submitted OTP:", payload.otp);
    // Call your verify OTP API here
    const finalPayload = {
      email: email,
      otp: payload.otp,
    };
    const response = await otpVerification(finalPayload);
    console.log(`response from client side`, response);
    otpForm.reset();
    otpModal.onCloseModal();
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-7xl font-bold mb-8">CheeseMiz</h1>
      <Dialog open={emailModal.isOpen} onOpenChange={emailModal.onToggleModal}>
        <DialogTrigger asChild>
          <Button variant="default">Get Started</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...emailForm}>
            <form
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            >
              <DialogHeader>
                <DialogTitle>Ready to begin?</DialogTitle>
                <DialogDescription>
                  Enter your email to receive your instant OTP.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex items-end justify-end w-full">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="w-full sm:w-auto">
                  {emailForm.formState.isSubmitting ? (
                    <>
                      <Spinner /> <span className="sr-only">Loading...</span>
                      Loading
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Dialog open={otpModal.isOpen} onOpenChange={otpModal.onToggleModal}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOTPSubmit)}
              className="space-y-6"
            >
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
                <DialogDescription>
                  We sent an OTP code to <strong>{email}</strong>, please check
                  your email.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-center">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex flex-col-reverse items-center justify-center w-full gap-3">
                <DialogClose asChild>
                  <Button variant="link" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="w-full sm:w-auto">
                  {otpForm.formState.isSubmitting ? (
                    <>
                      <Spinner /> <span className="sr-only">Loading...</span>
                      Verifying
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
