"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  Stethoscope,
  Upload,
  Users,
} from "lucide-react";

type PathChoice = "A" | "B" | null;

const PRICE_PER_PERSON = 79;
const TOTAL_STEPS = 4;

export default function ResetCheckForm() {
  const [step, setStep] = useState(1);
  const [housemates, setHousemates] = useState(5);
  const [path, setPath] = useState<PathChoice>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(
    () => housemates * PRICE_PER_PERSON,
    [housemates]
  );

  const canContinue = useMemo(() => {
    if (step === 1) return housemates >= 2 && housemates <= 20;
    if (step === 2) return path !== null;
    if (step === 3)
      return name.trim().length > 1 && phone.trim().length >= 8 && address.trim().length > 4;
    return true;
  }, [step, housemates, path, name, phone, address]);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          housemates,
          path,
          pricePerPerson: PRICE_PER_PERSON,
          totalPrice: total,
          name,
          phone,
          address,
          hasPhoto: Boolean(photoName),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || "Onbekende fout");
      setSubmitted(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Er ging iets mis");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reset-check" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <div className="mb-8 max-w-xl">
          <p className="text-sm font-medium uppercase tracking-wider text-trust">
            Reset-Check
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Check beschikbaarheid &amp; prijs
          </h2>
          <p className="mt-3 text-navy/70">
            Vier korte stappen. Geen verplichtingen. We bellen jullie terug
            binnen 2 uur.
          </p>
        </div>

        <div className="rounded-3xl border border-navy/10 bg-soft p-5 sm:p-8">
          {/* progress */}
          <div className="mb-6 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition ${
                  i < step ? "bg-trust" : "bg-navy/10"
                }`}
              />
            ))}
          </div>

          {submitted ? (
            <SuccessState />
          ) : (
            <>
              {step === 1 && (
                <StepHouseSize
                  housemates={housemates}
                  setHousemates={setHousemates}
                  total={total}
                />
              )}
              {step === 2 && <StepPath path={path} setPath={setPath} />}
              {step === 3 && (
                <StepEssentials
                  name={name}
                  setName={setName}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                />
              )}
              {step === 4 && (
                <StepPhoto
                  path={path}
                  photoName={photoName}
                  setPhotoName={setPhotoName}
                />
              )}

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1 || submitting}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-navy/60 transition hover:text-navy disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" /> Terug
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                    disabled={!canContinue}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Volgende
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 rounded-full bg-trust px-5 py-3 text-sm font-semibold text-white transition hover:bg-trust/90 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Versturen…
                      </>
                    ) : (
                      <>
                        Vraag Reset Aan
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-navy/50">
          100% discreet · Geen factuur op huisadres tenzij gewenst
        </p>
      </div>
    </section>
  );
}

/* -------------------------- step components -------------------------- */

function StepHouseSize({
  housemates,
  setHousemates,
  total,
}: {
  housemates: number;
  setHousemates: (n: number) => void;
  total: number;
}) {
  return (
    <div>
      <StepHeader
        icon={<Users className="h-4 w-4" />}
        eyebrow="Stap 1 van 4"
        title="Met hoeveel zijn jullie?"
        subtitle="Gebruik de schuif of typ het aantal huisgenoten in."
      />

      <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-navy/10">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-navy/60">Aantal huisgenoten</span>
          <span className="text-3xl font-semibold tabular-nums text-navy">
            {housemates}
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={20}
          value={housemates}
          onChange={(e) => setHousemates(Number(e.target.value))}
          className="mt-4 w-full accent-trust"
          aria-label="Aantal huisgenoten"
        />
        <div className="mt-1 flex justify-between text-[11px] text-navy/40">
          <span>2</span>
          <span>20</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-trust/5 px-5 py-4 ring-1 ring-trust/15">
        <div>
          <div className="text-xs uppercase tracking-wider text-trust">
            Live prijs
          </div>
          <div className="text-sm text-navy/70">
            €{PRICE_PER_PERSON},- p.p. · alles inbegrepen
          </div>
        </div>
        <div className="text-2xl font-semibold tabular-nums text-navy">
          €{total},-
        </div>
      </div>
    </div>
  );
}

function StepPath({
  path,
  setPath,
}: {
  path: PathChoice;
  setPath: (p: PathChoice) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="Stap 2 van 4"
        title="Welk pad past bij jullie?"
        subtitle="Kies wat van toepassing is. Je kunt later nog wisselen."
      />

      <div className="mt-5 grid gap-3">
        <PathOption
          selected={path === "A"}
          onClick={() => setPath("A")}
          icon={<Stethoscope className="h-5 w-5" />}
          title="Pad A · Wij hebben al een diagnose"
          subtitle="Minstens één huisgenoot heeft een recept of is bij de arts geweest."
        />
        <PathOption
          selected={path === "B"}
          onClick={() => setPath("B")}
          icon={<Camera className="h-5 w-5" />}
          title="Pad B · Ik denk dat we schurft hebben"
          subtitle="Geen diagnose? Wij regelen een e-consult via foto-intake."
          recommended
        />
      </div>
    </div>
  );
}

function StepEssentials({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
}: {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
}) {
  return (
    <div>
      <StepHeader
        eyebrow="Stap 3 van 4"
        title="Medische essentials"
        subtitle="We bellen één contactpersoon van het huis. Je gegevens blijven discreet."
      />

      <div className="mt-5 space-y-3">
        <Field
          label="Voor- en achternaam"
          value={name}
          onChange={setName}
          placeholder="bv. Sanne de Vries"
          autoComplete="name"
        />
        <Field
          label="Telefoonnummer"
          value={phone}
          onChange={setPhone}
          placeholder="06 12 34 56 78"
          type="tel"
          autoComplete="tel"
        />
        <Field
          label="Straat + huisnummer (Groningen)"
          value={address}
          onChange={setAddress}
          placeholder="bv. Oosterstraat 12"
          autoComplete="street-address"
        />
      </div>
    </div>
  );
}

function StepPhoto({
  path,
  photoName,
  setPhotoName,
}: {
  path: PathChoice;
  photoName: string | null;
  setPhotoName: (v: string | null) => void;
}) {
  const isPathB = path === "B";
  return (
    <div>
      <StepHeader
        eyebrow="Stap 4 van 4"
        title={isPathB ? "Foto-intake voor de arts" : "Bestaand recept uploaden"}
        subtitle={
          isPathB
            ? "Upload een foto van je klachten. Onze partner-arts beoordeelt deze binnen enkele uren."
            : "Upload een foto van het bestaande recept of de doktersverklaring."
        }
      />

      <label
        htmlFor="photo"
        className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy/15 bg-white px-5 py-10 text-center transition hover:border-trust/40 hover:bg-trust/5"
      >
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-trust/10 text-trust">
          <Upload className="h-5 w-5" aria-hidden />
        </div>
        <div className="text-sm font-medium text-navy">
          {photoName ?? "Tik om een foto te kiezen"}
        </div>
        <div className="mt-1 text-xs text-navy/50">
          JPG of PNG · max 10MB · optioneel
        </div>
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPhotoName(file ? file.name : null);
          }}
        />
      </label>

      <p className="mt-4 text-xs text-navy/50">
        Geen foto bij de hand? Geen probleem — je kunt deze stap overslaan en
        de foto later sturen via WhatsApp.
      </p>
    </div>
  );
}

/* -------------------------- helpers -------------------------- */

function StepHeader({
  eyebrow,
  title,
  subtitle,
  icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-trust">
        {icon}
        {eyebrow}
      </div>
      <h3 className="mt-1 text-xl font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-navy/60">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-navy/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-base text-navy outline-none ring-trust/30 transition focus:border-trust focus:ring-2"
      />
    </label>
  );
}

function PathOption({
  selected,
  onClick,
  icon,
  title,
  subtitle,
  recommended,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  recommended?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-trust bg-trust/5 ring-2 ring-trust/30"
          : "border-navy/10 bg-white hover:border-navy/20"
      }`}
    >
      <div
        className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          selected ? "bg-trust text-white" : "bg-navy/5 text-navy"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-navy">{title}</span>
          {recommended && (
            <span className="rounded-full bg-trust px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              Aanbevolen
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-navy/60">{subtitle}</p>
      </div>
      {selected && (
        <Check className="absolute right-4 top-4 h-4 w-4 text-trust" aria-hidden />
      )}
    </button>
  );
}

function SuccessState() {
  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-trust/10 text-trust">
        <Check className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-navy">Aanvraag ontvangen</h3>
      <p className="mt-2 text-sm text-navy/70">
        We bellen jullie binnen 2 uur terug om de Reset in te plannen. Houd je
        telefoon bij de hand.
      </p>
    </div>
  );
}
