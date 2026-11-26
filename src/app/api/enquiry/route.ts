import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const FIELDS = ["name", "email", "phone", "destination", "visa", "date", "timetocall", "message", "type"] as const;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // honeypot: bots fill the hidden "website" field
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true });

  const data: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = body[f];
    if (typeof v === "string") data[f] = v.trim().slice(0, 2000);
  }

  if (!data.name || data.name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });

  const subject = `${data.type === "consultation" ? "Consultation request" : "New enquiry"} from ${data.name}${
    data.destination ? ` – ${data.destination}` : ""
  }`;
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#5b6785;text-transform:capitalize">${esc(k)}</td><td style="padding:6px 12px">${esc(v)}</td></tr>`)
    .join("");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[enquiry] RESEND_API_KEY not set, enquiry logged only:", data);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM || "Orvanzia Visa Website <onboarding@resend.dev>",
      to: [process.env.ENQUIRY_TO || site.email],
      replyTo: data.email,
      subject,
      html: `<h2 style="font-family:sans-serif;color:#0c1f5c">${esc(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[enquiry] send failed", e);
    return NextResponse.json({ ok: false, error: `Could not send right now. Please email us at ${site.email}.` }, { status: 500 });
  }
}
