import { saveLead, type LeadType } from "@/lib/leads";

// Needs process.env + outbound fetch at request time; never cache it.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_TYPES: LeadType[] = ["subscribe", "waitlist", "provider", "investor"];
const MAX_FIELD_LEN = 2000;
const MAX_FIELDS = 25;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_FIELD_LEN) : "";
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown> | null = null;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: a hidden field real users never see. If a bot fills it, pretend
  // success and send nothing.
  if (clean(body?.company_website)) return json({ ok: true });

  const type = body?.type as LeadType;
  if (!VALID_TYPES.includes(type)) {
    return json({ ok: false, error: "Unknown form type." }, 400);
  }

  const email = clean(body?.email);
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  const name = clean(body?.name) || undefined;
  const source = clean(body?.source) || undefined;

  const rawData =
    body?.data && typeof body.data === "object" ? (body.data as Record<string, unknown>) : {};
  const data: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawData).slice(0, MAX_FIELDS)) {
    const val = clean(v);
    if (val) data[clean(k).slice(0, 80) || "field"] = val;
  }

  try {
    await saveLead({
      type,
      email,
      name,
      data,
      source,
      receivedAt: new Date().toISOString(),
    });
    return json({ ok: true });
  } catch (err) {
    console.error("[api/lead] save failed:", err);
    return json(
      {
        ok: false,
        error:
          "Something went wrong sending your details. Please email Info@technotonin.com and we'll follow up.",
      },
      502
    );
  }
}
