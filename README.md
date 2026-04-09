# fart-ts

A TypeScript browser library for playing fart sounds. Rewrite of the original `fart.js`.

## Usage

```typescript
const fart = new Fart();
fart.play("toot");
```

### Options

```typescript
const fart = new Fart({
  defaultSound: "raspberry", // sound played when none is specified
  loop: false,               // loop the audio
  volume: 50,                // 0–100
});
```

### Methods

| Method | Description |
|--------|-------------|
| `play(sound?, callback?)` | Play a sound by name. Uses `defaultSound` if omitted. Calls `callback` when playback ends. |
| `random()` | Play a random sound. |
| `stop()` | Pause playback. |
| `remove()` | Remove the audio element from the DOM. |

### Available sounds

`toot`, `ripper`, `plop`, `squit`, `raspberry`, `squat`, `tuppence`, `liftoff`, `trumpet`, `fizzler`, `windy`, `eine`, `fartception`, `fartpoint1`

## Setup

Sound files must be served from `/farts/` as `fart1.mp3` / `fart1.wav` … `fart14.mp3` / `fart14.wav`. The library picks `.mp3` or `.wav` at runtime based on browser support.

Compile with:

```sh
tsc fart.ts
```
