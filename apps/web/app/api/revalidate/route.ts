import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Revalidate all pages (layout scope covers the whole tree)
  revalidatePath("/", "layout");
  // Explicitly revalidate product pages so new gold prices reflect immediately
  revalidatePath("/products", "page");
  revalidatePath("/products/[id]", "page");

  return NextResponse.json({ revalidated: true });
}
