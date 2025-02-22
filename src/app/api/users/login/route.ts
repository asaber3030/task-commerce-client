import { LoginSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

import { response, responseCodes } from "@/lib/api";
import { extractErrors } from "@/lib/utils";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "@/lib/prisma";

export const revalidate = 0;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const parsedData = LoginSchema.safeParse(body);

  if (!parsedData.success)
    return response(responseCodes.serverError, "Validation errors", {
      errors: extractErrors(parsedData.error)
    });

  const user = await db.user.findUnique({
    where: { email: parsedData.data.email }
  });
  if (!user) return response(responseCodes.notFound, "User doesn't exist.");

  const comparePassword = await bcrypt.compare(parsedData.data.password, user.password);
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.");

  const { password, ...rest } = user;

  const newLoginHistory = await db.loginHistory.create({
    data: {
      userId: user.id,
      device: req.headers.get("user-agent") ?? "N/A",
      ip: req.headers.get("x-real-ip") ?? "N/A"
    }
  });

  const token = jwt.sign(rest, process.env.AUTH_USER_SECRET!, {
    expiresIn: "30d"
  });

  return response(responseCodes.ok, "Loggedin Successfully", { token });
}
