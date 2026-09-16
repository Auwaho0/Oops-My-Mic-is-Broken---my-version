import type { SoundId, StopFn } from "./types";

class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeSounds: Map<SoundId, StopFn> = new Map();
  private volume = 0.35;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.03);
    }
  }

  public isPlaying(id: SoundId): boolean {
    return this.activeSounds.has(id);
  }

  public toggle(id: SoundId): boolean {
    if (this.activeSounds.has(id)) {
      this.stop(id);
      return false;
    } else {
      this.play(id);
      return true;
    }
  }

  public play(id: SoundId): void {
    if (this.activeSounds.has(id)) {
      return;
    }
    const ctx = this.getContext();
    if (!this.masterGain) return;

    let stopFn: StopFn;

    switch (id) {
      case "drill":
        stopFn = this.createDrillSound(ctx, this.masterGain);
        break;
      case "jackhammer":
        stopFn = this.createJackhammerSound(ctx, this.masterGain);
        break;
      case "hammer":
        stopFn = this.createHammerSound(ctx, this.masterGain);
        break;
      case "baby":
        stopFn = this.createBabySound(ctx, this.masterGain);
        break;
      case "dog":
        stopFn = this.createDogSound(ctx, this.masterGain);
        break;
      case "socks":
        stopFn = this.createSocksSound(ctx, this.masterGain);
        break;
      case "static":
        stopFn = this.createStaticSound(ctx, this.masterGain);
        break;
      case "robot":
        stopFn = this.createRobotSound(ctx, this.masterGain);
        break;
      case "doorbell":
        stopFn = this.createDoorbellSound(ctx, this.masterGain);
        break;
      default:
        stopFn = () => {};
    }

    this.activeSounds.set(id, stopFn);
  }

  public stop(id: SoundId): void {
    const stopFn = this.activeSounds.get(id);
    if (stopFn) {
      stopFn();
      this.activeSounds.delete(id);
    }
  }

  public stopAll(): void {
    for (const stopFn of this.activeSounds.values()) {
      stopFn();
    }
    this.activeSounds.clear();
  }

  // --- Sound generators ---

  private createNoiseBuffer(ctx: AudioContext, duration = 3): AudioBuffer {
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  private createDrillSound(ctx: AudioContext, output: AudioNode): StopFn {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(280, ctx.currentTime);

    // LFO for motor rpm fluctuation
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(24, ctx.currentTime);
    lfoGain.gain.setValueAtTime(45, ctx.currentTime);
    lfo.connect(osc.frequency);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(output);

    osc.start();
    lfo.start();

    return () => {
      try {
        osc.stop();
        lfo.stop();
        osc.disconnect();
        lfo.disconnect();
      } catch {
        // ignore
      }
    };
  }

  private createJackhammerSound(ctx: AudioContext, output: AudioNode): StopFn {
    const buffer = this.createNoiseBuffer(ctx, 1);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    // Staccato gating LFO (sharp pulse)
    const panner = ctx.createGain();
    const lfo = ctx.createOscillator();
    lfo.type = "square";
    lfo.frequency.setValueAtTime(14, ctx.currentTime);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(panner.gain);

    const bassOsc = ctx.createOscillator();
    bassOsc.type = "triangle";
    bassOsc.frequency.setValueAtTime(55, ctx.currentTime);
    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0.3, ctx.currentTime);

    noise.connect(filter);
    filter.connect(panner);
    bassOsc.connect(bassGain);
    bassGain.connect(panner);
    panner.connect(output);

    noise.start();
    lfo.start();
    bassOsc.start();

    return () => {
      try {
        noise.stop();
        lfo.stop();
        bassOsc.stop();
        noise.disconnect();
      } catch {
        // ignore
      }
    };
  }

  private createHammerSound(ctx: AudioContext, output: AudioNode): StopFn {
    let isRunning = true;
    let timer: number | null = null;

    const strike = () => {
      if (!isRunning) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(output);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);

      const nextTime = 700 + Math.random() * 400;
      timer = window.setTimeout(strike, nextTime);
    };

    strike();

    return () => {
      isRunning = false;
      if (timer) clearTimeout(timer);
    };
  }

  private createBabySound(ctx: AudioContext, output: AudioNode): StopFn {
    let isRunning = true;
    let timer: number | null = null;

    const cry = () => {
      if (!isRunning) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(850, now + 0.35);
      osc.frequency.linearRampToValueAtTime(420, now + 0.85);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.9);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(output);

      osc.start(now);
      osc.stop(now + 0.95);

      timer = window.setTimeout(cry, 1300 + Math.random() * 600);
    };

    cry();

    return () => {
      isRunning = false;
      if (timer) clearTimeout(timer);
    };
  }

  private createDogSound(ctx: AudioContext, output: AudioNode): StopFn {
    let isRunning = true;
    let timer: number | null = null;

    const bark = () => {
      if (!isRunning) return;
      const count = Math.random() > 0.4 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const t = ctx.currentTime + i * 0.22;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(260, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.16);

        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(output);

        osc.start(t);
        osc.stop(t + 0.2);
      }

      timer = window.setTimeout(bark, 2000 + Math.random() * 2500);
    };

    bark();

    return () => {
      isRunning = false;
      if (timer) clearTimeout(timer);
    };
  }

  private createSocksSound(ctx: AudioContext, output: AudioNode): StopFn {
    let isRunning = true;
    let timer: number | null = null;

    const shout = () => {
      if (!isRunning) return;
      const now = ctx.currentTime;
      // "Мам, где носки?!" - distance muffled voice synthesis
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(340, now + 0.3);
      osc.frequency.linearRampToValueAtTime(180, now + 0.7);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, now); // muffled behind 2 walls

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.1);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(output);

      osc.start(now);
      osc.stop(now + 0.85);

      timer = window.setTimeout(shout, 4000 + Math.random() * 3000);
    };

    shout();

    return () => {
      isRunning = false;
      if (timer) clearTimeout(timer);
    };
  }

  private createStaticSound(ctx: AudioContext, output: AudioNode): StopFn {
    const buffer = this.createNoiseBuffer(ctx, 2);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(output);

    noise.start();

    return () => {
      try {
        noise.stop();
        noise.disconnect();
      } catch {
        // ignore
      }
    };
  }

  private createRobotSound(ctx: AudioContext, output: AudioNode): StopFn {
    const osc = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, ctx.currentTime);

    mod.type = "square";
    mod.frequency.setValueAtTime(45, ctx.currentTime);
    modGain.gain.setValueAtTime(120, ctx.currentTime);

    mod.connect(modGain);
    modGain.connect(osc.frequency);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(output);

    osc.start();
    mod.start();

    return () => {
      try {
        osc.stop();
        mod.stop();
        osc.disconnect();
        mod.disconnect();
      } catch {
        // ignore
      }
    };
  }

  private createDoorbellSound(ctx: AudioContext, output: AudioNode): StopFn {
    let isRunning = true;
    let timer: number | null = null;

    const ring = () => {
      if (!isRunning) return;
      const now = ctx.currentTime;
      // "Ding-Dong": 660Hz -> 520Hz
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(660, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc1.connect(gain1);
      gain1.connect(output);
      osc1.start(now);
      osc1.stop(now + 0.85);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(520, now + 0.45);
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.32, now + 0.45);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      osc2.connect(gain2);
      gain2.connect(output);
      osc2.start(now + 0.45);
      osc2.stop(now + 1.45);

      timer = window.setTimeout(ring, 5000 + Math.random() * 4000);
    };

    ring();

    return () => {
      isRunning = false;
      if (timer) clearTimeout(timer);
    };
  }
}

export const webAudioEngine = new WebAudioEngine();
