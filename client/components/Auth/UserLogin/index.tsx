"use client";

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
import { userLogin } from "@/app/(pages)/actions";
import useModalActions, { IUseModalActions } from "@/hooks/useModalActions";
import { authSchema, TAuth } from "@/zod-types/auth.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ComponentProps = {
  otpModalAction: IUseModalActions;
  onSetEmail: Dispatch<SetStateAction<string | undefined>>;
};

type OmittedAuthType = Omit<TAuth, "id" | "otp" | "createdAt" | "updatedAt">;

const UserLogin = (props: ComponentProps) => {
  const loginModal = useModalActions();

  const loginForm = useForm<OmittedAuthType>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = async (payload: OmittedAuthType) => {
    const response = await userLogin(payload);

    if (response && !response.success) {
      return toast(response.message);
    }

    loginForm.reset();
    loginModal.onCloseModal();
    props.onSetEmail(payload && payload?.email ? payload?.email : "");
    props.otpModalAction.onOpenModal();
  };
  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onToggleModal}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome back!</DialogTitle>
          <DialogDescription>
            Enter your email to receive your instant OTP.
          </DialogDescription>
        </DialogHeader>
        <Form {...loginForm}>
          <form
            className="flex flex-col items-start justify-start gap-5"
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          >
            <FormField
              control={loginForm.control}
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
                {loginForm.formState.isSubmitting ? (
                  <>
                    <Spinner />
                    <span className="sr-only">Loading...</span>
                    Loading
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserLogin;
