"use client";

import { ProgressProvider } from "@bprogress/next/app";

const ProgressBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#ff6600"
      options={{ showSpinner: false }}
      shallowRouting
      disableSameURL
    >
      {children}
    </ProgressProvider>
  );
};

export default ProgressBar;
