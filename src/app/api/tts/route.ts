import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const execAsync = promisify(exec);
const CACHE_DIR = path.join(process.cwd(), "public", "audio", "cache");

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

const VOICE_MAP: Record<string, string> = {
  herald: "ru-RU-DmitryNeural",
  general: "ru-RU-DmitryNeural",
  treasurer: "ru-RU-DmitryNeural",
  bishop: "ru-RU-DmitryNeural",
  peasant: "ru-RU-SvetlanaNeural",
  jester: "ru-RU-DmitryNeural",
  merchant: "ru-RU-DmitryNeural",
};

export async function POST(req: NextRequest) {
  try {
    const { text, characterId = "herald", rate = "+4%", pitch = "default" } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const voice = VOICE_MAP[characterId] || "ru-RU-DmitryNeural";
    const hash = crypto.createHash("md5").update(`${text}_${voice}_${pitch}`).digest("hex");
    const filename = `${hash}.mp3`;
    const filePath = path.join(CACHE_DIR, filename);
    const publicUrl = `/audio/cache/${filename}`;

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      return NextResponse.json({ url: publicUrl });
    }

    const cleanText = text.replace(/"/g, '\\"');
    const pitchParam = pitch === "low" ? "--pitch=-5Hz" : pitch === "high" ? "--pitch=+5Hz" : "";
    const cmd = `edge-tts --voice ${voice} --rate="${rate}" ${pitchParam} --text "${cleanText}" --write-media "${filePath}"`;

    await execAsync(cmd);

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 500) {
      return NextResponse.json({ url: publicUrl });
    }

    return NextResponse.json({ error: "TTS generation failed" }, { status: 500 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal error";
    console.error("TTS API error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
