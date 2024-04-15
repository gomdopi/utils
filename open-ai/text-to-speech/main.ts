import { promises } from 'fs'
import { resolve } from 'path'
import OpenAI from 'openai'
import { args, ModelOptions, VoiceOptions } from './args'

type GenerateSpeechArgs = {
  model: ModelOptions,
  voice: VoiceOptions,
  input: string,
}

const openai = new OpenAI();

const speechFile = resolve('./speech.mp3');

async function main() {
  const scriptLength = args.input.length
  if (scriptLength >= 4096) throw new Error(`Input is too long: ${scriptLength}`)

  generateSpeech(args)
}

async function generateSpeech(args: GenerateSpeechArgs) {
  const mp3 = await openai.audio.speech.create({
    model: args.model,
    voice: args.voice,
    input: args.input,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  await promises.writeFile(speechFile, buffer);
}

main();