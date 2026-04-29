import { ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-trust/10 via-soft to-soft"
      />
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-3 py-1 text-xs font-medium text-navy/70 backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-trust" aria-hidden />
          Discreet · Medisch begeleid · Groningen
        </div>

        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
          Een schone lei. Een frisse start.
          <br className="hidden sm:block" />
          <span className="text-trust">
            {" "}Wij resetten jullie studentenhuis in 24 uur.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy/70 sm:text-xl">
          De enige complete oplossing voor hardnekkige schurft. Wij regelen de
          medische intake, waslogistiek en het draaiboek, zodat jullie er in één
          keer vanaf zijn.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#reset-check"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-navy/90 active:scale-[0.99]"
          >
            Check Beschikbaarheid &amp; Prijs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="inline-flex items-center gap-2 text-sm text-navy/60">
            <Clock className="h-4 w-4 text-trust" aria-hidden />
            Gemiddelde reactietijd: &lt; 2 uur
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-3 sm:max-w-xl">
          {[
            { k: "24u", v: "Volledige reset" },
            { k: "1x", v: "Batch-recept" },
            { k: "100%", v: "Discreet" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-2xl border border-navy/10 bg-white px-4 py-3"
            >
              <dt className="text-2xl font-semibold text-navy">{item.k}</dt>
              <dd className="text-xs text-navy/60">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
