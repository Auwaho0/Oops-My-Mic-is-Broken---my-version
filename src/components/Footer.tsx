import { Globe, Send, Mail } from "lucide-react";

const LINKS = [
  { Icon: Send, label: "t.me/oops_mic_broken", href: "#" },
  { Icon: Mail, label: "mic@broken.dev", href: "#" },
  { Icon: Globe, label: "github.com/callsaver", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contacts" className=" bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-10">
        <div className="border-t-2 border-ink pt-8">
          <p className="text-sm font-medium tracking-widest text-blood">// КОНТАКТЫ</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {LINKS.map(({ Icon, label }) => (
              <a
                key={label}
                href={label === "#" ? "#top" : label}
                onClick={(e) => {
                  if (label === "#") e.preventDefault();
                }}
                className="inline-flex items-center gap-2 border-2 border-ink px-4 py-2 text-xs sm:text-sm transition-all hover:bg-ink hover:text-paper hover:-translate-y-0.5"
              >
                <Icon className="size-4" /> {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-ink/30 pt-4 text-xs text-paper/70">
          <p>© 2026 — ЛОКАЛЬНАЯ ВЕРСИЯ — CTRL+Z НЕ РАБОТАЕТ</p>
          <p>[×] в шапке закрывает окно. или нет?</p>
        </div>
      </div>
    </footer>
  );
}
