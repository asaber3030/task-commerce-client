import { LoginSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

import { findAdmin } from "@/server/admins";
import { response, responseCodes } from "@/lib/api";
import { extractErrors } from "@/lib/utils";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const revalidate = 0;

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const parsedData = LoginSchema.safeParse(body);

  if (!parsedData.success)
    return response(responseCodes.serverError, "Validation errors", {
      errors: extractErrors(parsedData.error)
    });

  const admin = await findAdmin({
    email: parsedData.data.email
  });
  if (!admin) return response(responseCodes.notFound, "Admin doesn't exist.");

  const comparePassword = await bcrypt.compare(parsedData.data.password, admin.password);
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.");

  const { password, ...rest } = admin;

  const token = jwt.sign(rest, process.env.AUTH_ADMIN_SECRET!, {
    expiresIn: "30d"
  });

  return response(responseCodes.ok, "Loggedin Successfully", { token });
}
