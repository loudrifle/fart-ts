const farts = {
  toot: "fart1",
  ripper: "fart2",
  plop: "fart3",
  squit: "fart4",
  raspberry: "fart5",
  squat: "fart6",
  tuppence: "fart7",
  liftoff: "fart8",
  trumpet: "fart9",
  fizzler: "fart10",
  windy: "fart11",
  eine: "fart12",
  fartception: "fart13",
  fartpoint1: "fart14",
};

type FartName = keyof typeof farts;

interface Options {
  defaultSound: FartName;
  loop: boolean;
  volume: number; // 0-100
}

/**
 * Represents the fart audio controller.
 *
 * This class handles audio initialization, fallback player loading for
 * legacy browsers, and configuration of fart playback options.
 *
 * @class Fart
 */
class Fart {
  public options: Options;
  public fartPlayer: HTMLAudioElement | null = null;
  public preloaded = false;
  /**
   * Creates a new Fart instance.
   *
   * @constructor
   * @param {Partial<Options>} [opts={}] - Partial configuration object to override defaults.
   */
  constructor(opts: Partial<Options> = {}) {
    this.options = {
      defaultSound: opts.defaultSound ?? "raspberry",
      loop: opts.loop ?? false,
      volume: opts.volume ?? 0,
    };

    this.init();
  }
  /**
   * Initializes the audio player.
   */
  init() {
    this.fartPlayer = document.createElement("audio");
    this.preload();
  }

  getFartPlayer() {
    const fartPlayer = this.fartPlayer;
    if (!fartPlayer) throw new Error("Fart Player isn't initialized");
    return fartPlayer;
  }

  preload() {
    const fartPlayer = this.getFartPlayer();
    if (!this.preloaded) {
      for (const f in farts) {
        const ext = fartPlayer.canPlayType("audio/mp3") ? ".mp3" : ".wav";
        fartPlayer.setAttribute("src", "/farts/" + farts[f as FartName] + ext);
      }
      this.preloaded = true;
    }
  }

  stop() {
    this.getFartPlayer().pause();
  }

  remove() {
    this.getFartPlayer().remove();
  }

  random() {
    const keys = Object.keys(farts) as FartName[];
    const fart = keys[Math.floor(keys.length * Math.random())];
    this.play(fart);
  }

  play(sound?: FartName, callback?: () => void) {
    const fart = sound ?? this.options.defaultSound;
    const fartPlayer = this.getFartPlayer();
    const ext = fartPlayer.canPlayType("audio/mp3") ? ".mp3" : ".wav";
    fartPlayer.setAttribute("src", "/farts/" + fart + ext);
    fartPlayer.loop = this.options.loop;
    fartPlayer.volume = this.options.volume / 100;
    fartPlayer.play();

    const onEnded = () => {
      callback?.();
      fartPlayer.removeEventListener("ended", onEnded);
    };

    fartPlayer.addEventListener("ended", onEnded);
  }
}
