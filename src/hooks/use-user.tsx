"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { currentUser as mockCurrentUser, guestUser } from "@/lib/mock-data";
import type { User } from "@/lib/types";

interface UserContextValue {
  user: User;
  login: () => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockCurrentUser);

  const login = () => setUser(mockCurrentUser);
  const logout = () => setUser(guestUser);

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn: user.isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
