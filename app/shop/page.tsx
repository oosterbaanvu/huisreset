"use client";

import { useMemo, useState } from "react";
import {
  Bed,
  Check,
  Droplets,
  Microscope,
  Package2,
  Plus,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

type Category = "Detectie" | "Bescherming" | "Verzorging";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: Category;
  icon: LucideIcon;
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "dermatoscoop",
    name: "Digitale Dermatoscoop",
    subtitle: "Premium diagnose-tool voor maximale zekerheid thuis.",
    price: 49.0,
    category: "Detectie",
    icon: Microscope,
    badge: "Premium",
  },
  {
    id: "matraszak-single",
    name: "De Reset Matraszak (Single 90×200)",
    subtitle: "Speciaal dikte-plastic voor standaard studentenmatrassen.",
    price: 9.95,
    category: "Bescherming",
    icon: Bed,
  },
  {
    id: "matraszak-double",
    name: "De Reset Matraszak (Double 140×200)",
    subtitle: "Voor twee- en queen-size matrassen, lucht- en stofdicht.",
    price: 14.95,
    category: "Bescherming",
    icon: Bed,
  },
  {
    id: "sealing-tape",
    name: "Industriële Sealing Tape",
    subtitle: "Industriële sterkte. Sluit matraszakken volledig luchtdicht af.",
    price: 6.5,
    category: "Bescherming",
    icon: Package2,
  },
  {
    id: "herstel-zalf",
    name: "Herstel-Zalf (Zwavel basis)",
    subtitle: "Onze eigen formule voor huidkalmering na de behandeling.",
    price: 18.5,
    category: "Verzorging",
    icon: Droplets,
  },
];

const FILTERS: Array<"Alle" | Category> = [
  "Alle",
  "Detectie",
  "Bescherming",
  "Verzorging",
];

const formatEUR = (n: number) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(n);

export default function ShopPage() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("Alle");
  const [cart, setCart] = useState<Record<string, number>>({});

  const visible = useMemo(
    () =>
      active === "Alle"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active]
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));

  return (
    <main className="min-h-screen bg-soft pb-20">
      {/* Header */}
      <section className="border-b border-navy/10 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-wider text-trust">
            De Reset Shop
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Professionele hulpmiddelen voor thuis.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Onze eigen apothecary-line. Discreet verpakt, snel bezorgd in
            Groningen, en geselecteerd door onze partner-arts.
          </p>
        </div>
      </section>

      {/* Filters + cart */}
      <section className="sticky top-14 z-30 border-b border-navy/10 bg-soft/85 backdrop-blur sm:top-16">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-navy text-white"
                      : "border border-navy/15 bg-white text-navy hover:border-navy/30"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-sm text-navy">
            <ShoppingBag className="h-4 w-4 text-trust" aria-hidden />
            <span className="tabular-nums">{cartCount}</span>
            <span className="hidden text-slate-500 sm:inline">in winkelwagen</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] ?? 0}
              onAdd={() => addToCart(product.id)}
            />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-slate-500">
            Geen producten in deze categorie.
          </p>
        )}
      </section>
    </main>
  );
}

function ProductCard({
  product,
  quantity,
  onAdd,
}: {
  product: Product;
  quantity: number;
  onAdd: () => void;
}) {
  const Icon = product.icon;
  const inCart = quantity > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white transition hover:border-navy/20 hover:shadow-sm">
      {/* Image placeholder */}
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
        <Icon
          className="h-14 w-14 text-slate-400 transition group-hover:text-trust"
          aria-hidden
          strokeWidth={1.25}
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-trust px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
            {product.badge}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full border border-navy/10 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold leading-snug text-navy">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-slate-600">{product.subtitle}</p>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div className="text-xl font-semibold tabular-nums text-navy">
            {formatEUR(product.price)}
          </div>
          <button
            type="button"
            onClick={onAdd}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition active:scale-[0.98] ${
              inCart
                ? "bg-trust/10 text-trust hover:bg-trust/15"
                : "bg-navy text-white hover:bg-navy/90"
            }`}
            aria-label={`Voeg ${product.name} toe aan winkelwagen`}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4" />
                In winkelwagen ({quantity})
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Toevoegen
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
