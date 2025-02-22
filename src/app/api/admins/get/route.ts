import { NextRequest } from "next/server";
import { Admin } from "@prisma/client";

import { response } from "@/lib/api";
import { extractToken } from "@/lib/utils";

import jwt from "jsonwebtoken";
import { findAdmin } from "@/server/admins";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization) return response(401, "Unauthorized");

    const token = extractToken(authorization) ?? "";
    if (!token) return response(401, "Unauthorized");

    const secret = process.env.AUTH_ADMIN_SECRET!;
    const decodedResult = jwt.verify(token, secret) as Admin;

    const adminWithPassword = await findAdmin({ id: decodedResult.id });
    if (!adminWithPassword) return response(401, "Unauthorized");

    const { password, ...admin } = adminWithPassword;
    return response(200, "Authorized", { admin });
  } catch (error) {
    console.log({ error });
    return response(401, "Unauthorized", { line: 28 });
  }
}
