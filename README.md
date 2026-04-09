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

```sh
npm install
npm run dev    # dev server at http://localhost:5173
npm run build  # production build → dist/
```

Sound files must be placed in `public/farts/` as `fart1.mp3` … `fart14.mp3` (or `.wav`). The library picks the format at runtime based on browser support.
