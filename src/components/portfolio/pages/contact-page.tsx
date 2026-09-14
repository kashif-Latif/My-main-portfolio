"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle, Loader2, Phone } from "lucide-react";
import { siteConfig, profile, gmailComposeUrl } from "@/data/profile";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AccentColor } from "@/lib/accents";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactPage() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");

  const validate = (data: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = "Name is required.";
    else if (data.name.trim().length < 2) e.name = "Name is too short.";
    if (!data.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_REGEX.test(data.email)) e.email = "Please enter a valid email address.";
    if (!data.subject.trim()) e.subject = "Subject is required.";
    else if (data.subject.trim().length < 3) e.subject = "Subject is too short.";
    if (!data.message.trim()) e.message = "Message is required.";
    else if (data.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
    return e;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Reset success state if user starts editing again
    if (status === "success") setStatus("idle");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      return;
    }

    // Build compose URLs with subject + body pre-filled.
    const subject = `[Portfolio Contact] ${form.subject}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      siteConfig.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // IMPORTANT: window.open must run synchronously inside the submit
    // handler. The previous version awaited a 600ms delay first, which
    // dropped the user-gesture context — so popup blockers silently
    // killed the tab while the UI still claimed success.
    const win = window.open(gmailUrl, "_blank", "noopener,noreferrer");

    if (!win) {
      // Popup blocked or unavailable: fall back to the visitor's own
      // mail client via mailto:, same tab, message still pre-filled.
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }

    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative">
      {/* ===== HEADER ===== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let's build{" "}
                <span className="text-grad-brand">something intelligent</span>.
              </>
            }
            description="I'm interested in meaningful opportunities, innovative projects, software engineering, AI development, automation, and collaborations that create real-world impact."
          />
        </div>
      </section>

      {/* ===== CONTACT GRID ===== */}
      <section className="relative py-12 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative card-surface rounded-[32px] p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    error={errors.name}
                    autoComplete="name"
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    error={errors.email}
                    autoComplete="email"
                    required
                  />
                </div>
                <Field
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  error={errors.subject}
                  required
                />
                <Field
                  label="Message"
                  name="message"
                  type="textarea"
                  placeholder="Tell me about the project, role, or idea..."
                  value={form.message}
                  onChange={handleChange("message")}
                  error={errors.message}
                  rows={6}
                  required
                />

                {/* Status messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 rounded-xl border border-a3/35 bg-a3/8 p-4"
                  >
                    <CheckCircle2 className="h-4 w-4 text-a3 mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">Your email compose window opened.</p>
                      <p className="text-xs text-muted-foreground">
                        The message is pre-filled — press send there and it comes straight to me. I reply within a couple of days.
                      </p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && Object.keys(errors).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 rounded-xl border border-destructive/35 bg-destructive/8 p-4"
                  >
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">Please fix the highlighted fields.</p>
                      <p className="text-xs text-muted-foreground">
                        A few details need attention before the message can be sent.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={cn(
                    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
                    status === "submitting"
                      ? "bg-surface-2 text-muted-foreground cursor-not-allowed"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      Send message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
                  The form is wired for production use — replace the simulated
                  submission in <code className="rounded bg-surface px-1 py-0.5 font-mono">contact-page.tsx</code> with your
                  real API endpoint or email service (e.g. Resend, SendGrid) when ready.
                </p>
              </form>
            </motion.div>

            {/* Side: contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <ContactCard
                icon={Mail}
                label="Email"
                value={siteConfig.email}
                href={gmailComposeUrl(siteConfig.email, "Portfolio enquiry")}
                accent="amber"
                note="Opens Gmail compose — best for project enquiries"
              />
              <ContactCard
                icon={Github}
                label="GitHub"
                value={`@${siteConfig.social.githubUsername}`}
                href={siteConfig.social.github}
                accent="rust"
                note="Code, experiments & projects"
              />
              <ContactCard
                icon={Linkedin}
                label="LinkedIn"
                value="Connect professionally"
                href={siteConfig.social.linkedin}
                accent="golden"
                note="Recruiters welcome"
              />
              <ContactCard
                icon={Phone}
                label="Phone"
                value={siteConfig.phone}
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                accent="sand"
                note="Available for calls & WhatsApp"
              />

              {/* Location / availability */}
              <div className="card-surface rounded-[22px] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-a3 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-a3" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Currently
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Based in {profile.location}. Studying {profile.degree} at{" "}
                  {profile.university}. Open to internships, freelance projects and
                  international remote collaborations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Field ---------- */
function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  rows,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  autoComplete?: string;
  required?: boolean;
}) {
  const baseClass = cn(
    "w-full rounded-xl border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-colors",
    error
      ? "border-destructive/50 focus:border-destructive"
      : "border-line focus:border-brand"
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows ?? 4}
          className={cn(baseClass, "resize-y min-h-24")}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseClass}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          required={required}
        />
      )}
      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- Contact Card ---------- */
const contactAccentClasses: Record<AccentColor, { border: string; text: string; bg: string }> = {
  amber: { border: "border-a1/30", text: "text-a1", bg: "bg-a1/12" },
  rust: { border: "border-a2/30", text: "text-a2", bg: "bg-a2/12" },
  golden: { border: "border-a3/30", text: "text-a3", bg: "bg-a3/12" },
  sand: { border: "border-a4/30", text: "text-a4", bg: "bg-a4/12" },
};

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  accent: "amber" | "rust" | "golden" | "sand";
  note: string;
}) {
  const a = contactAccentClasses[accent];

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-3 card-surface rounded-[22px] p-4 hover:border-line-strong transition-colors"
    >
      <div className={cn("grid h-10 w-10 place-items-center rounded-xl border", a.border, a.bg)}>
        <Icon className={cn("h-4 w-4", a.text)} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground truncate">{value}</span>
        <span className="text-[11px] text-muted-foreground/80 leading-relaxed">{note}</span>
      </div>
    </a>
  );
}
