"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { countries } from "@/lib/countries";
import { services } from "@/lib/services";

type Status = { state: "idle" | "sending" | "done" | "error"; msg?: string };

async function submit(form: HTMLFormElement, type: string): Promise<Status> {
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const r = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type }),
    });
    const j = await r.json();
    return j.ok ? { state: "done" } : { state: "error", msg: j.error };
  } catch {
    return { state: "error", msg: "Network error. Please try again." };
  }
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-50 text-green-600"
      >
        <CheckCircle2 size={34} />
      </motion.div>
      <h3 className="mt-5 text-2xl font-bold text-ink">Thank you!</h3>
      <p className="mx-auto mt-2 max-w-sm text-muted">We&apos;ve received your details. A member of our team will be in touch shortly.</p>
      <button onClick={onReset} className="mt-6 text-sm font-semibold text-navy-700 underline underline-offset-4">
        Send another enquiry
      </button>
    </motion.div>
  );
}

const Honeypot = () => (
  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
);

function DestinationSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <select name="destination" className="field" defaultValue={defaultValue || ""}>
      <option value="">Select destination</option>
      {countries.map((c) => (
        <option key={c.code} value={c.name}>
          {c.name}
        </option>
      ))}
      <option value="Other">Other / not sure</option>
    </select>
  );
}

export function EnquiryForm({ destination }: { destination?: string }) {
  const [s, setS] = useState<Status>({ state: "idle" });
  return (
    <AnimatePresence mode="wait">
      {s.state === "done" ? (
        <Success key="ok" onReset={() => setS({ state: "idle" })} />
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setS({ state: "sending" });
            const f = e.currentTarget;
            const r = await submit(f, "enquiry");
            setS(r);
            if (r.state === "done") f.reset();
          }}
          className="relative grid gap-4 sm:grid-cols-2"
        >
          <Honeypot />
          <div>
            <label className="label">Full Name</label>
            <input name="name" required minLength={2} className="field" placeholder="Your full name" autoComplete="name" />
          </div>
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" required className="field" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input name="phone" type="tel" className="field" placeholder="+44 …" autoComplete="tel" />
          </div>
          <div>
            <label className="label">Travelling To</label>
            <DestinationSelect defaultValue={destination} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">How can we help?</label>
            <textarea name="message" rows={4} className="field resize-none" placeholder="Tell us a little about your trip…" />
          </div>
          {s.state === "error" && <p className="text-sm text-red-600 sm:col-span-2">{s.msg}</p>}
          <button disabled={s.state === "sending"} className="btn-primary sm:col-span-2 disabled:opacity-70">
            {s.state === "sending" ? <Loader2 className="animate-spin" size={18} /> : null}
            Send Enquiry <ArrowRight size={17} />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function ConsultationForm({ destination, visa }: { destination?: string; visa?: string }) {
  const [s, setS] = useState<Status>({ state: "idle" });
  return (
    <AnimatePresence mode="wait">
      {s.state === "done" ? (
        <Success key="ok" onReset={() => setS({ state: "idle" })} />
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setS({ state: "sending" });
            const f = e.currentTarget;
            const r = await submit(f, "consultation");
            setS(r);
            if (r.state === "done") f.reset();
          }}
          className="relative grid gap-4 sm:grid-cols-2"
        >
          <Honeypot />
          <div>
            <label className="label">Full Name</label>
            <input name="name" required minLength={2} className="field" placeholder="Your full name" autoComplete="name" />
          </div>
          <div>
            <label className="label">Email</label>
            <input name="email" type="email" required className="field" placeholder="you@example.com" autoComplete="email" />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input name="phone" type="tel" className="field" placeholder="+44 …" autoComplete="tel" />
          </div>
          <div>
            <label className="label">Destination</label>
            <DestinationSelect defaultValue={destination} />
          </div>
          <div>
            <label className="label">Visa Type</label>
            <select name="visa" className="field" defaultValue={visa || ""}>
              <option value="">Select visa type</option>
              {services.map((x) => (
                <option key={x.slug}>{x.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Travelling Date</label>
            <input name="date" type="date" className="field" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Best Time to Call You</label>
            <select name="timetocall" className="field" defaultValue="">
              <option value="">Select preferred time</option>
              <option>Morning (9 AM – 12 PM)</option>
              <option>Afternoon (12 PM – 3 PM)</option>
              <option>Evening (3 PM – 6 PM)</option>
              <option>Anytime</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Additional Details</label>
            <textarea name="message" rows={4} className="field resize-none" placeholder="Nationality, UK status, travel purpose…" />
          </div>
          {s.state === "error" && <p className="text-sm text-red-600 sm:col-span-2">{s.msg}</p>}
          <button disabled={s.state === "sending"} className="btn-gold sm:col-span-2 disabled:opacity-70">
            {s.state === "sending" ? <Loader2 className="animate-spin" size={18} /> : null}
            Book Consultation <ArrowRight size={17} />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
