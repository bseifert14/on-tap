import { supabaseServer } from "./_supabaseServer.js";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Reads the Bearer token from the request, validates it against Supabase,
 * and confirms the user's email is in the ADMIN_EMAILS allowlist.
 * Returns { email, userId } on success, or throws with a status hint.
 */
export async function verifyAdmin(req) {
  const authHeader = req.headers?.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    const err = new Error("Missing bearer token");
    err.status = 401;
    throw err;
  }

  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user?.email) {
    const err = new Error("Invalid token");
    err.status = 401;
    throw err;
  }

  const email = data.user.email.toLowerCase();
  if (!ADMIN_EMAILS.includes(email)) {
    const err = new Error("Not authorized");
    err.status = 403;
    throw err;
  }

  return { email, userId: data.user.id };
}
