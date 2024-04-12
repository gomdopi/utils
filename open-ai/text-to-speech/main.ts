import { promises } from "fs"
import { readFileSync } from 'fs'
import { join, resolve } from "path"
import OpenAI from "openai"

const openai = new OpenAI();

const speechFile = resolve("./speech.mp3");

async function main() {
  const input = readFileSync(join(__dirname, 'script.txt'), 'utf-8')

  if (input.length >= 4096) throw new Error(`Input is too long: ${input.length}`)

  console.log(input.length)
  generateSpeech(input)
}

async function generateSpeech(input: string) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "onyx",
    input,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await promises.writeFile(speechFile, buffer);
}

main();