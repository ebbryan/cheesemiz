"use client";

import { ReactNode, useState } from "react";

import useModalActions from "@/hooks/useModalActions";
import OTPVerification from "@/components/Auth/OTPVerification";
import UserLogin from "@/components/Auth/UserLogin";
import { TAuth } from "@/zod-types/auth.zod";
import { Button } from "@/components/ui/button";
import { userLogout } from "@/app/(pages)/actions";
import { useRouter } from "@bprogress/next/app";

const Navigation = ({ children, me }: { children: ReactNode; me?: TAuth }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const otpModal = useModalActions();
  const router = useRouter();

  const onLogout = async () => {
    await userLogout();
    router.refresh();
  };

  return (
    <>
      <nav className="flex items-center justify-between fixed w-full p-3 px-6">
        <div>
          <h3>{me ? me?.email : "Welcome!"}</h3>
        </div>
        <div>
          {me ? (
            <Button onClick={onLogout}>Logout</Button>
          ) : (
            <>
              <UserLogin otpModalAction={otpModal} onSetEmail={setEmail} />
              <OTPVerification modalAction={otpModal} emailState={email} />
            </>
          )}
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navigation;
