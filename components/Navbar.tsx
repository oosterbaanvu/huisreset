"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Stethoscope } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const onShop = pathname?.startsWith("/shop");

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-navy"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-[11px] font-bold text-white">
            DR
          </span>
          De Reset
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/#reset-check"
            className={`hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition sm:inline-flex ${
              !onShop
                ? "text-navy hover:bg-navy/5"
                : "text-navy/60 hover:text-navy hover:bg-navy/5"
            }`}
          >
            <Stethoscope className="h-4 w-4" aria-hidden />
            Start de Intake
          </Link>

          <Link
            href="/shop"
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
              onShop
                ? "bg-navy text-white"
                : "text-navy hover:bg-navy/5"
            }`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Losse Producten</span>
            <span className="sm:hidden">Shop</span>
          </Link>

          <Link
            href="/#reset-check"
            className="inline-flex items-center gap-1.5 rounded-full bg-trust px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-trust/90 sm:hidden"
          >
            Intake
          </Link>
        </div>
      </nav>
    </header>
  );
}
