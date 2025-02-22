import { AdminContext } from "@/providers/auth-provider";
import { useContext } from "react";

export function useAdmin() {
  return useContext(AdminContext);
}
