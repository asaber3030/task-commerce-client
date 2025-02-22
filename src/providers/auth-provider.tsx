"use client";

import { Admin } from "@prisma/client";
import React, { createContext } from "react";

export const AdminContext = createContext<Admin | null>(null);

type AuthProviderProps = {
  admin: Admin | null;
  children: React.ReactNode;
};

export const AuthProvider = ({ admin, children }: AuthProviderProps) => {
  return <AdminContext.Provider value={admin}>{children}</AdminContext.Provider>;
};
