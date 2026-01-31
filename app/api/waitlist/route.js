import { NextResponse } from "next/server";

/**
 * POST /api/waitlist
 * Body: { email, name, whyCliro: string[], mainLanguages: string[] }
 * Replace the placeholder below with your DB client (e.g. Prisma, Supabase, Drizzle).
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, whyCliro, mainLanguages } = body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const payload = {
      email: email.trim().toLowerCase(),
      name: name.trim(),
      whyCliro: Array.isArray(whyCliro) ? whyCliro : [],
      mainLanguages: Array.isArray(mainLanguages) ? mainLanguages.slice(0, 3) : [],
    };

    // TODO: persist to your DB, e.g.:
    // await db.waitlist.create({ data: payload });
    // or: await supabase.from('waitlist').insert(payload);
    console.log("[waitlist] signup:", payload);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[waitlist] error:", e);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
