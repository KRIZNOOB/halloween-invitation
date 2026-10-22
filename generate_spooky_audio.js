import fs from 'fs';
import path from 'path';

// Generate a rich 16-second looping spooky ghost sound in 44.1kHz 16-bit Mono WAV
const sampleRate = 44100;
const durationSeconds = 16;
const numSamples = sampleRate * durationSeconds;
const buffer = new Float32Array(numSamples);

// 1. Ghost howling generator ("Huuu... huuu...")
function addGhostHowl(startSec, durSec, startFreq, peakFreq, endFreq, maxVol) {
  const startIdx = Math.floor(startSec * sampleRate);
  const total = Math.floor(durSec * sampleRate);

  let phase = 0;
  for (let i = 0; i < total; i++) {
    const idx = startIdx + i;
    if (idx >= numSamples) break;

    const progress = i / total;
    // Pitch curve: rises to peak, then slides down
    const freq = progress < 0.45
      ? startFreq + (peakFreq - startFreq) * Math.sin((progress / 0.45) * (Math.PI / 2))
      : endFreq + (peakFreq - endFreq) * Math.cos(((progress - 0.45) / 0.55) * (Math.PI / 2));

    // Ghost vibrato (4.5 Hz eerie wavering)
    const vibrato = Math.sin(2 * Math.PI * 4.5 * (i / sampleRate)) * 12;
    const currentFreq = freq + vibrato;

    phase += 2 * Math.PI * currentFreq / sampleRate;

    // Amplitude envelope: slow eerie swell and decay
    const env = Math.sin(progress * Math.PI);

    // Vocal hollow formant simulation (fundamental + soft 2nd harmonic)
    const voice = Math.sin(phase) + 0.35 * Math.sin(phase * 2) + 0.15 * Math.sin(phase * 3);

    buffer[idx] += voice * env * maxVol;
  }
}

// 2. Add multiple ghost howls across the 16 seconds loop
// "Huuu..."
addGhostHowl(1.0, 3.2, 220, 340, 190, 0.45);
// "...Huuuu-uuuh..." (answering ghost)
addGhostHowl(4.8, 3.8, 260, 410, 210, 0.50);
// "Huu... huuu..." (distant echo)
addGhostHowl(9.5, 3.0, 195, 290, 175, 0.38);
// rising wail
addGhostHowl(12.8, 2.8, 230, 360, 200, 0.42);

// 3. Add Cavern Cold Wind (filtered noise)
let lastNoise = 0;
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const white = Math.random() * 2 - 1;
  lastNoise = (lastNoise + 0.025 * white) / 1.025; // low-pass filter

  // Wind intensity modulation (swelling wind gusts)
  const windMod = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.125 * t);
  buffer[i] += lastNoise * windMod * 0.22;
}

// 4. Add Low Sub Drone (D2 = 73.4Hz + A2 = 110Hz + F2 = 87.3Hz)
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const drone =
    0.15 * Math.sin(2 * Math.PI * 73.42 * t) +
    0.10 * Math.sin(2 * Math.PI * 110.0 * t) +
    0.08 * Math.sin(2 * Math.PI * 87.31 * t);
  buffer[i] += drone;
}

// 5. Add Spooky Haunted Music Box Chime (isolated high delicate notes)
function addBellNote(sec, freq, vol) {
  const startIdx = Math.floor(sec * sampleRate);
  const durSamples = Math.floor(2.5 * sampleRate);
  for (let i = 0; i < durSamples; i++) {
    const idx = startIdx + i;
    if (idx >= numSamples) break;
    const progress = i / durSamples;
    const env = Math.exp(-progress * 5); // sharp strike, exponential decay
    const chime = Math.sin(2 * Math.PI * freq * (i / sampleRate));
    buffer[idx] += chime * env * vol;
  }
}

addBellNote(0.5, 587.33, 0.14); // D5
addBellNote(3.5, 523.25, 0.12); // C5
addBellNote(8.0, 698.46, 0.13); // F5
addBellNote(11.5, 622.25, 0.14); // Eb5 (dark tritone feel)

// Normalize audio buffer to prevent clipping
let maxAmp = 0;
for (let i = 0; i < numSamples; i++) {
  if (Math.abs(buffer[i]) > maxAmp) maxAmp = Math.abs(buffer[i]);
}
const normFactor = maxAmp > 0.001 ? 0.85 / maxAmp : 1;

// Build 16-bit PCM WAV File
const wavBuffer = Buffer.alloc(44 + numSamples * 2);

// RIFF chunk
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + numSamples * 2, 4);
wavBuffer.write('WAVE', 8);

// fmt chunk
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16); // subchunk1 size (16 for PCM)
wavBuffer.writeUInt16LE(1, 20); // audio format (1 = PCM)
wavBuffer.writeUInt16LE(1, 22); // num channels (1 = mono)
wavBuffer.writeUInt32LE(sampleRate, 24); // sample rate
wavBuffer.writeUInt32LE(sampleRate * 2, 28); // byte rate (sampleRate * numChannels * bitsPerSample/8)
wavBuffer.writeUInt16LE(2, 32); // block align
wavBuffer.writeUInt16LE(16, 34); // bits per sample

// data chunk
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(numSamples * 2, 40);

// Write PCM 16-bit integer samples
let offset = 44;
for (let i = 0; i < numSamples; i++) {
  const sample = Math.max(-1, Math.min(1, buffer[i] * normFactor));
  const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  wavBuffer.writeInt16LE(Math.floor(int16), offset);
  offset += 2;
}

const outDir = path.resolve('public/assets');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'spooky_ghost.wav');
fs.writeFileSync(outFile, wavBuffer);

console.log(`Generated ${outFile} successfully! Size: ${wavBuffer.length} bytes`);
