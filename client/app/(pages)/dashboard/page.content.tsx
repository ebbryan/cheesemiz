"use client";

import { TAuth } from "@/zod-types/auth.zod";

const DashboardPageContent = ({ me }: { me: TAuth }) => {
  return <h1>Welcome ! {me?.email}</h1>;
};

export default DashboardPageContent;
