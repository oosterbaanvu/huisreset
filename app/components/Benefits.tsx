import { ClipboardCheck, Package, Timer } from "lucide-react";

const benefits = [
  {
    icon: ClipboardCheck,
    title: "Gecentraliseerde Intake",
    body: "Geen 10 losse afspraken bij de huisarts. Wij regelen één batch-recept voor het hele huis via onze partner-arts.",
  },
  {
    icon: Package,
    title: "De Reset Box",
    body: "Ontvang alle materialen — XL matraszakken, industriële tape, specialistische zeep — plus het stap-voor-stap draaiboek.",
  },
  {
    icon: Timer,
    title: "24-Uurs Synchronisatie",
    body: "Wij zorgen dat iedereen op exact hetzelfde moment behandelt, zodat herbesmetting onmogelijk is.",
  },
];

export default function Benefits() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-trust">
            Waarom De Reset
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Eén systeem. Eén keer. Klaar.
          </h2>
          <p className="mt-3 text-navy/70">
            Schurft is hardnekkig omdat huisgenoten asynchroon behandelen. Wij
            lossen precies dat probleem op.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }, idx) => (
            <article
              key={title}
              className="relative flex flex-col rounded-3xl border border-navy/10 bg-white p-7"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-trust/10 text-trust">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-navy/40">
                Stap {idx + 1}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/70">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
