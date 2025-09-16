"use client";

import { ReactNode, useState } from "react";

import useModalActions from "@/hooks/useModalActions";
import OTPVerification from "@/components/Auth/OTPVerification";
import UserLogin from "@/components/Auth/UserLogin";

const Navigation = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const otpModal = useModalActions();

  return (
    <>
      <nav className="flex items-center justify-between fixed w-full p-3 px-6">
        <div>`HIDDEN`</div>
        <div>
          <UserLogin otpModalAction={otpModal} onSetEmail={setEmail} />
          <OTPVerification modalAction={otpModal} emailState={email} />
        </div>
      </nav>
      {children}
    </>
  );
};

export default Navigation;
