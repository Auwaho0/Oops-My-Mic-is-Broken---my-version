import Reveal from "../../shared/ui/reveal/Reveal";


// будем барать с json server 
const STATS = [
  { n: "4 217", t: "отговорок сгенерировано за бета-тест" },
  { n: "9", t: "фоновых шумов, синтезированных в браузере" },
  { n: "0", t: "микрофонов пострадало при проверке" },
  { n: "4 мин", t: "среднее время до дедлайна при сборке" },
];

export default function About() {
  return (
    <section id="about" className="border-t-4 bg-paper">
      <div className="mx-auto max-w-7xl  px-4 sm:px-6 py-4 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm text-blood font-medium tracking-widest">// О ПРОЕКТЕ</p>
            <h2 className="mt-3 font-display font-bold uppercase leading-[0.9] text-[clamp(2.6rem,7vw,6rem)]">
              Это не баг.
              <br />
              Это <span className="relative inline-block">стратегия<span className="absolute left-0 right-0 bottom-[0.08em] h-[0.0em] bg-blood" /></span>
            </h2>
            <p className="mt-6 max-w-md font-serif italic text-xl leading-relaxed text-ink/70">
              «Каждый имеет право на тишину. Особенно на стендапе в 9:00 в понедельник.»
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4 text-sm leading-relaxed text-ink/85">
              <p>
                <strong className="font-bold">Oops, My Mic is Broken</strong> — инструмент тактического
                отступления с онлайн-созвона. Когда камера видит тебя в пижаме, а голос — нет, на
                помощь приходит дека фоновых шумов и генератор текстовых алиби.
              </p>
              <p>
                Все звуки синтезируются Web Audio API прямо в твоём браузере: осцилляторы, фильтры и
                белый шум складываются в перфоратор, плач ребёнка и робота с обрывающейся связью. Ни
                одного mp3, ни одного пострадавшего сервера.
              </p>
              <p>
                Слайдер «Уровень неловкости» регулирует громкость алиби. Кнопка «×» в шапке сворачивает
                всё это в отчёт_Q3_финал_v2.xlsx — на случай, если начальник пройдёт мимо монитора.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px border-2 border-ink bg-ink">
              {STATS.map((s) => (
                <div key={s.t} className="bg-paper p-4 transition-colors hover:bg-ink hover:text-paper group">
                  <p className="font-display text-3xl sm:text-4xl font-bold text-blood group-hover:text-blood">{s.n}</p>
                  <p className="mt-1 text-[11px] leading-snug text-ink/70 group-hover:text-paper/70">{s.t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
