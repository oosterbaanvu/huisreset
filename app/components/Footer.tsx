import { Mail, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-soft py-12">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="text-lg font-semibold text-navy">De Reset</div>
            <p className="mt-2 text-sm text-navy/60">
              Een schone lei voor studentenhuizen in Groningen.
            </p>
          </div>

          <div className="space-y-2 text-sm text-navy/70">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-trust" aria-hidden />
              Groningen &amp; omstreken
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-trust" aria-hidden />
              hallo@dereset.nl
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-trust" aria-hidden />
              Medisch begeleid · Discreet
            </div>
          </div>

          <div className="text-sm text-navy/60">
            <p>
              De Reset werkt samen met een geregistreerde partner-arts voor de
              medische intake. Behandeling vindt plaats onder verantwoording
              van de voorschrijvend arts.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-navy/10 pt-6 text-xs text-navy/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} De Reset</span>
          <span>KvK volgt · BTW volgt</span>
        </div>
      </div>
    </footer>
  );
}
