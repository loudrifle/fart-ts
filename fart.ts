// All available fart sound names, ordered to match fart1.mp3 … fart14.mp3
const fartNames = [
  "toot", "ripper", "plop", "squit", "raspberry", "squat",
  "tuppence", "liftoff", "trumpet", "fizzler", "windy",
  "eine", "fartception", "fartpoint1",
] as const;

export type FartName = (typeof fartNames)[number];

export interface Options {
  defaultSound: FartName;
  loop: boolean;
  volume: number; // 0-100
}

export class Fart {
  public options: Options;
  // Main player used for playback
  public fartPlayer: HTMLAudioElement;
  // Resolved once at init: ".mp3" if supported, otherwise ".wav"
  private ext: string;
  // One hidden audio element per sound, preloaded in the background
  private preloadPlayers: Partial<Record<FartName, HTMLAudioElement>> = {};

  constructor(opts: Partial<Options> = {}) {
    this.options = {
      defaultSound: opts.defaultSound ?? "raspberry",
      loop: opts.loop ?? false,
      volume: opts.volume ?? 100,
    };

    // Probe format support once so we don't repeat the check on every play()
    const probe = document.createElement("audio");
    this.ext = probe.canPlayType("audio/mp3") ? ".mp3" : ".wav";

    this.fartPlayer = document.createElement("audio");
    this.preload();
  }

  // Creates a hidden audio element for each sound so the browser fetches
  // and buffers them before the user clicks anything
  preload(): void {
    for (const name of fartNames) {
      const audio = document.createElement("audio");
      audio.src = this.srcFor(name);
      audio.preload = "auto";
      this.preloadPlayers[name] = audio;
    }
  }

  stop(): void {
    this.fartPlayer.pause();
  }

  remove(): void {
    this.fartPlayer.remove();
  }

  random(): void {
    const name = fartNames[Math.floor(fartNames.length * Math.random())];
    this.play(name);
  }

  play(sound?: FartName, callback?: () => void): void {
    const name = sound ?? this.options.defaultSound;
    const player = this.fartPlayer;
    player.src = this.srcFor(name);
    player.loop = this.options.loop;
    player.volume = this.options.volume / 100;

    // play() returns a Promise that rejects if autoplay is blocked by the browser
    player.play().catch((err) => console.error("Fart playback failed:", err));

    if (callback) {
      // Register a one-shot listener so callback fires exactly once per play
      const onEnded = () => {
        callback();
        player.removeEventListener("ended", onEnded);
      };
      player.addEventListener("ended", onEnded);
    }
  }

  // Maps a sound name to its file path using its index in fartNames
  private srcFor(name: FartName): string {
    return `/farts/fart${fartNames.indexOf(name) + 1}${this.ext}`;
  }
}

export default Fart;
