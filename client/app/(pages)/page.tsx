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
import { userRegistration } from "./actions";

export default function Home() {
  const emailModal = useModalActions();

  const form = useForm<
    Omit<AuthType, "id" | "otp" | "createdAt" | "updatedAt">
  >({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (
    payload: Omit<AuthType, "id" | "otp" | "createdAt" | "updatedAt">
  ) => {
    const response = await userRegistration(payload);
    if (!response.success) {
      return alert(response.message);
    }
    form.reset();
    emailModal.onCloseModal();
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-7xl font-bold mb-8">CheeseMiz</h1>
      <Dialog open={emailModal.isOpen} onOpenChange={emailModal.onToggleModal}>
        <DialogTrigger asChild>
          <Button variant="default">Get Started</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form
              className="flex flex-col items-start justify-start gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <DialogHeader>
                <DialogTitle>Ready to begin?</DialogTitle>
                <DialogDescription>
                  Enter your email to receive your instant OTP.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
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
                  {form.formState.isSubmitting ? (
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
      {/* <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter OTP</DialogTitle>
            <DialogDescription>
              We send an OTP code to `EMAIL`, please check your email.
            </DialogDescription>
          </DialogHeader>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </section>
  );
}
