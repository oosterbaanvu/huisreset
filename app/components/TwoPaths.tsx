import { Stethoscope, Camera, Sparkles, ArrowRight } from "lucide-react";

export default function TwoPaths() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-trust">
            Hoe werkt het
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Twee paden. Eén reset.
          </h2>
          <p className="mt-3 text-navy/70">
            Kies wat past bij jullie situatie. Geen gedoe, geen oordeel.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Path A */}
          <a
            href="#reset-check"
            className="group relative flex flex-col rounded-3xl border border-navy/10 bg-soft p-7 transition hover:border-navy/20 hover:shadow-sm"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/5 text-navy">
              <Stethoscope className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-navy">
              Pad A · Wij hebben al een diagnose
            </h3>
            <p className="mt-2 text-sm text-navy/70">
              Minimaal één huisgenoot is bij de huisarts geweest. Wij regelen
              het batch-recept voor de rest van het huis en sturen direct de
              Reset Box.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-navy/70">
              <li>• Bestaand recept als bewijs</li>
              <li>• Snelste route — start vandaag</li>
              <li>• Geen extra e-consult nodig</li>
            </ul>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
              Kies pad A
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          {/* Path B — highlighted */}
          <a
            href="#reset-check"
            className="group relative flex flex-col rounded-3xl border border-trust/30 bg-trust/5 p-7 ring-1 ring-trust/20 transition hover:border-trust/50 hover:shadow-md"
          >
            <div className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-trust px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
              <Sparkles className="h-3 w-3" aria-hidden />
              Meest gekozen
            </div>
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-trust/10 text-trust">
              <Camera className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-navy">
              Pad B · Ik denk dat we schurft hebben
            </h3>
            <p className="mt-2 text-sm text-navy/70">
              Nog geen diagnose? Geen probleem. Upload een foto van je klachten
              en onze partner-arts doet binnen enkele uren een e-consult voor
              het hele huis.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-navy/70">
              <li>• Geen huisarts-bezoek nodig</li>
              <li>• Foto-intake vanaf de bank</li>
              <li>• Eén e-consult voor het hele huis</li>
            </ul>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-trust">
              Kies pad B — makkelijkste route
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
