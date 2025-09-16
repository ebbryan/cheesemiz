"use client";

import { TAuth } from "@/zod-types/auth.zod";
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  user: TAuth | null;
  setUser: (user: TAuth) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TAuth | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
