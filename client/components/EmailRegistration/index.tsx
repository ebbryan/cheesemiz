"use client";

import { userRegistration } from "@/app/(pages)/actions";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useModalActions, { IUseModalActions } from "@/hooks/useModalActions";
import { authSchema, TAuth } from "@/zod-types/auth.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import Spinner from "../spinner";

type ComponentProps = {
  otpModalAction: IUseModalActions;
  onSetEmail: Dispatch<SetStateAction<string | undefined>>;
};

const EmailRegistration = (props: ComponentProps) => {
  const emailModal = useModalActions();
  const emailForm = useForm<
    Omit<TAuth, "id" | "otp" | "createdAt" | "updatedAt">
  >({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const onEmailSubmit = async (
    payload: Omit<TAuth, "id" | "otp" | "createdAt" | "updatedAt">
  ) => {
    const response = await userRegistration(payload);
    if (!response.success) {
      return toast(response.message);
    }
    emailForm.reset();
    emailModal.onCloseModal();
    props.onSetEmail(payload && payload?.email ? payload?.email : undefined);
    props.otpModalAction.onOpenModal();
  };
  return (
    <Dialog open={emailModal.isOpen} onOpenChange={emailModal.onToggleModal}>
      <DialogTrigger asChild>
        <Button variant="default">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ready to begin?</DialogTitle>
          <DialogDescription>
            Enter your email to receive your instant OTP.
          </DialogDescription>
        </DialogHeader>
        <Form {...emailForm}>
          <form
            className="flex flex-col items-start justify-start gap-5"
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          >
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
                <Button variant="secondary" className="w-full sm:w-auto">
                  Cancel
                </Button>
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
  );
};

export default EmailRegistration;
