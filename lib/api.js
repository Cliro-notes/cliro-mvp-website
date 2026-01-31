/**
 * Submits waitlist signup. Payload is sent to the DB via POST /api/waitlist.
 * @param {{ email: string, name: string, whyCliro: string[], mainLanguages: string[] }} data
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function submitWaitlist(data) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: body.error || body.message || "Something went wrong" };
  }
  return { ok: true };
}
