import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.join(process.cwd(), "public", "audio", "cache");

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "ru" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const hash = crypto.createHash("md5").update(`${text}_${lang}`).digest("hex");
    const filename = `${hash}.mp3`;
    const filePath = path.join(CACHE_DIR, filename);
    const publicUrl = `/audio/cache/${filename}`;

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      return NextResponse.json({ url: publicUrl });
    }

    // High quality reliable TTS stream
    const encoded = encodeURIComponent(text.slice(0, 300));
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encoded}`;

    const resp = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!resp.ok) {
      return NextResponse.json({ error: "TTS upstream failed" }, { status: 502 });
    }

    const buffer = Buffer.from(await resp.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({ url: publicUrl });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
