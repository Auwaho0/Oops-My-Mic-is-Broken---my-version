const NAV = [
  { label: "[МЕНЮ]", href: "#top" },
  { label: "[О ПРОЕКТЕ]", href: "#about" },
  { label: "[КОНТАКТЫ]", href: "#contacts" },
  { label: "[ЗАПИСИ]", href: "#sounds" },
  { label: "[АЛИБИ]", href: "#excuses" },
];

export function Menu() {
  return (
    <nav className="flex flex-wrap font-mono-code items-center gap-x-5 gap-y-1 py-2.5 mx-auto max-w-7xl px-4 sm:px-6 pb-1">
      {NAV.map((n) => (
        <a
          key={n.label}
          href={n.href}
          className="select-none py-1 px-2 border-b-2 border-transparent transition-all cursor-pointer whitespace-nowrap hover:text-red-600 hover:border-black"
        >
          {n.label}
        </a>
      ))}
      <span className="ml-auto hidden md:inline text-xs text-ink/60">
        * звук включается кнопками ниже. микрофон — по желанию
      </span>
    </nav>
  );
}

export default Menu;
