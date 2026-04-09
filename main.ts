import { Fart } from "./fart";

const fart = new Fart({ volume: 100 });
const loop = new Fart({ loop: true, volume: 100 });

// Generate a button for each sound
const fartsDiv = document.getElementById("farts")!;
const sounds: string[] = [
  "toot", "ripper", "plop", "squit", "raspberry", "squat",
  "tuppence", "liftoff", "trumpet", "fizzler", "windy",
  "eine", "fartception", "fartpoint1",
];

for (const sound of sounds) {
  const btn = document.createElement("button");
  btn.textContent = sound;
  btn.addEventListener("click", () => fart.play(sound as Parameters<typeof fart.play>[0]));
  fartsDiv.appendChild(btn);
}

document.getElementById("start")!.addEventListener("click", () => loop.play("fartception"));
document.getElementById("stop")!.addEventListener("click", () => loop.stop());

document.querySelectorAll<HTMLButtonElement>(".volume").forEach((btn) => {
  btn.addEventListener("click", () => {
    const level = Number(btn.dataset.level);
    const f = new Fart({ volume: level });
    f.play("toot", () => f.remove());
  });
});

document.getElementById("scroller")!.addEventListener("scroll", () => fart.random());
