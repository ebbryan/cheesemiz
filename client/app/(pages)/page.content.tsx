"use client";
import EmailRegistration from "@/components/Auth/EmailRegistration";
import OTPVerification from "@/components/Auth/OTPVerification";
import useModalActions from "@/hooks/useModalActions";
import { useState } from "react";

const PageContent = () => {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const otpModal = useModalActions();
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-7xl font-bold mb-8">CheeseMiz</h1>
      <EmailRegistration onSetEmail={setEmail} otpModalAction={otpModal} />
      <OTPVerification emailState={email} modalAction={otpModal} />
    </section>
  );
};

export default PageContent;
