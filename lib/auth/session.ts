import { getServerSession } from "next-auth";
import { cookies, headers } from "next/headers";

export async function getSession() {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  };
  
  return await getServerSession(req);
}