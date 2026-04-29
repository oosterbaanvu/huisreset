import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const lead = {
      receivedAt: new Date().toISOString(),
      housemates: data.housemates,
      path: data.path,
      pricePerPerson: data.pricePerPerson,
      totalPrice: data.totalPrice,
      name: data.name,
      phone: data.phone,
      address: data.address,
      hasPhoto: Boolean(data.hasPhoto),
      notes: data.notes ?? null,
    };

    console.log("[lead] new submission:", lead);

    return NextResponse.json({ ok: true, message: "Lead ontvangen" });
  } catch (error) {
    console.error("[lead] error:", error);
    return NextResponse.json(
      { ok: false, message: "Er ging iets mis. Probeer opnieuw." },
      { status: 400 }
    );
  }
}
