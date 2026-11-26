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

  // Destination inbox is configured only via the ENQUIRY_TO env var (never shipped to the browser or the repo).
  const to = process.env.ENQUIRY_TO;
  const labels: Record<string, string> = {
    type: "Form",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    destination: "Destination",
    visa: "Visa type",
    date: "Travel date",
    timetocall: "Best time to call",
    message: "Message",
  };

  try {
    // Option A: Resend (if an API key + verified sending domain are configured)
    if (process.env.RESEND_API_KEY && to) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.ENQUIRY_FROM || "Orvanzia Visa Website <onboarding@resend.dev>",
        to: [to],
        replyTo: data.email,
        subject,
        html: `<h2 style="font-family:sans-serif;color:#0c1f5c">${esc(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      });
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true });
    }

    // Option B (default): FormSubmit relay, called server-side
    if (to) {
      const payload: Record<string, string> = {
        _subject: subject,
        _template: "table",
        _captcha: "false",
        _replyto: data.email,
      };
      for (const [k, v] of Object.entries(data)) payload[labels[k] || k] = k === "type" ? (v === "consultation" ? "Book a consultation" : "Enquiry") : v;
      payload["Submitted from"] = site.url;

      const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Origin: site.url, Referer: `${site.url}/` },
        body: JSON.stringify(payload),
      });
      const j = (await r.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (!r.ok || String(j.success) !== "true") throw new Error(j.message || `relay status ${r.status}`);
      return NextResponse.json({ ok: true });
    }

    console.warn("[enquiry] ENQUIRY_TO not set; enquiry logged only:", data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[enquiry] send failed", e);
    return NextResponse.json(
      { ok: false, error: `Sorry, we couldn't send that right now. Please WhatsApp us on ${site.phone} instead.` },
      { status: 502 },
    );
  }
}
