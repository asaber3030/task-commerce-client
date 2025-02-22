"use server";

import { cookies } from "next/headers";

export const getAuthorizationToken = async () => {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("token")?.value;
  const authorization = token ? token : "";

  return authorization;
};

export const getUserAuthorizationToken = async () => {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("user-token")?.value;
  const authorization = token ? token : "";

  return authorization;
};
