"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { IUseModalActions } from "@/hooks/useModalActions";
import { authSchema, TAuth } from "@/zod-types/auth.zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/spinner";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { otpVerification } from "@/app/(pages)/actions";

type ComponentProps = {
  modalAction: IUseModalActions;
  emailState?: string;
};

const OTPVerification = (props: ComponentProps) => {
  const otpForm = useForm<
    Omit<TAuth, "id" | "email" | "createdAt" | "updatedAt">
  >({
    resolver: zodResolver(authSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onOTPSubmit = async (
    payload: Omit<TAuth, "id" | "email" | "createdAt" | "updatedAt">
  ) => {
    const finalPayload = {
      email: props.emailState,
      otp: payload.otp,
    };
    const response = await otpVerification(finalPayload);
    if (!response?.success) {
      return toast(response.message);
    }
    otpForm.reset();
    props.modalAction.onCloseModal();
  };

  return (
    <Dialog
      open={props.modalAction.isOpen}
      onOpenChange={props.modalAction.onToggleModal}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onOTPSubmit)}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Enter OTP</DialogTitle>
              <DialogDescription>
                We sent an OTP code to <strong>{props.emailState}</strong>,
                please check your email.
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
                <Button
                  variant="secondary"
                  type="button"
                  className="w-full sm:w-auto"
                >
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
  );
};

export default OTPVerification;
