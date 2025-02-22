import { NextRequest } from "next/server";
import { User } from "@prisma/client";

import { response } from "@/lib/api";
import { extractToken } from "@/lib/utils";

import jwt from "jsonwebtoken";
import db from "@/lib/prisma";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization");
    if (!authorization) return response(401, "Unauthorized");

    const token = extractToken(authorization) ?? "";
    if (!token) return response(401, "Unauthorized");

    const secret = process.env.AUTH_USER_SECRET!;
    const decodedResult = jwt.verify(token, secret) as User;

    const userWithPassword = await db.user.findUnique({ where: { id: decodedResult.id } });
    if (!userWithPassword) return response(401, "Unauthorized");

    const { password, ...user } = userWithPassword;
    return response(200, "Authorized", { user });
  } catch (error) {
    return response(401, "Unauthorized", { line: 28 });
  }
}
