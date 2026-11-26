import { site } from "@/lib/site";

export function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M13.5 21.95V13.9h2.7l.4-3.14h-3.1V8.75c0-.9.25-1.52 1.55-1.52h1.66V4.42a22 22 0 0 0-2.42-.12c-2.4 0-4.04 1.46-4.04 4.15v2.31H7.53v3.14h2.72v8.05h3.25z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const items = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
] as const;

export default function SocialIcons({ size = 18, className = "", itemClassName = "" }: { size?: number; className?: string; itemClassName?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map(({ key, label, Icon }) => {
        const url = site.social[key];
        return (
          <a
            key={key}
            href={url || "#"}
            aria-label={`Orvanzia Visa on ${label}`}
            {...(url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={itemClassName}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
