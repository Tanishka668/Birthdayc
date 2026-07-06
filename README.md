# 💫 One Month To Go — Birthday Countdown Teaser

A short, elegant single-page teaser (30–60 seconds to explore) that tells him
there's exactly one month until his birthday — not the birthday surprise
itself, just the beautiful beginning of one.

## Folder structure

```
countdown-website/
│── index.html
│── style.css
│── script.js
│── assets/
│     └── images/   (memory-1.jpg ... memory-4.jpg)
```

The site ships with soft placeholder Polaroid graphics so it already looks
complete — swap them for real photos whenever you're ready.

## 1. Set his name, nicknames, and birthday date

Open `index.html` and find the **CUSTOMIZATION SECTION** near the top:

```js
window.COUNTDOWN_CONFIG = {
  name: "Pranav",
  nicknames: ["chotu sher", "pineapple", "cupcake"],
  birthdayDate: "2026-08-06T00:00:00",   // <-- his real birthday & time
};
```

- `name` shows on the countdown card.
- `nicknames` rotate softly under "Hey, Handsome ❤️" on the opening screen.
- `birthdayDate` drives the live countdown timer *and* the "Days To Go"
  number on the ending screen — both update automatically, so you only ever
  need to edit this one line.

## 2. Add his photos

Replace these files in `assets/images/` (same filenames, or update the
`src="..."` paths in the "A FEW MEMORIES" section of `index.html`):

- `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`, `memory-4.jpg`

To add a 5th photo, copy one `.memory-polaroid` block in `index.html` and
point it at a new image + caption. Captions live right next to each image
as `<p class="memory-caption">`.

## 3. The background music (Spotify embed)

The floating player in the corner is the official Spotify embed for
**"Love Story (Taylor's Version)"** — no downloaded file needed, and
nothing to add to `assets/music/`.

**Important:** Spotify's embed can only be started by its own play button
— browser and Spotify security rules don't allow "Tap Here" or any other
button on the page to start it automatically. When he taps "Tap Here," the
player gently pulses to draw his eye to it, then he taps play inside the
widget himself. The free Spotify tier plays a 30-second preview; a Spotify
Premium account (his or yours, logged in) plays the full song.

To use a different song instead:
1. Find the song on [open.spotify.com](https://open.spotify.com) and copy
   its share link, e.g. `open.spotify.com/track/3CeCwYWvdfXbZLXFhBrbnf`.
2. Take the ID after `/track/` and swap it into the `src` of the `<iframe
   id="spotify-embed">` in the "FLOATING MUSIC PLAYER" section of
   `index.html`.

## 4. Edit the letter

Find `#letter-text` inside the "A SHORT LETTER" section of `index.html` and
edit the `data-full-text="..."` attribute — this is what types itself out
once the envelope is opened.

## 5. Change colors or fonts

Open `style.css` — all colors live in the `:root` variables at the very top
(`--navy-deep`, `--lavender`, `--blush`, `--gold`, etc.). Fonts are set via
`--font-display`, `--font-body`, and `--font-script`; if you swap fonts,
also update the Google Fonts `<link>` in `index.html`'s `<head>`.

## 6. Preview locally

Just open `index.html` in a browser — everything, including the Spotify
player, works straight away since there's no local audio file to serve. If
you want a local server anyway (e.g. for testing on other devices):

```bash
# from inside the countdown-website folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 7. Deploy with GitHub Pages (free)

1. Create a new GitHub repository (public).
2. Upload the contents of this folder (`index.html`, `style.css`,
   `script.js`, `assets/`).
3. Go to **Settings → Pages**, set Source to `Deploy from a branch`, branch
   `main`, folder `/ (root)`, and save.
4. GitHub gives you a live link like
   `https://your-username.github.io/your-repo-name/` — send that to him. 💛

## About the interactive touches

- Each section gently tilts into place like a page turning as you scroll —
  a subtle 3D effect, not a flashy one.
- On desktop, small dots appear on the right edge of the screen — one per
  section — so he can see where he is and jump around if he likes.
- Real photos are already in place, straight from what you sent over.

## About the locked gift

The gift box at the end is intentionally locked — clicking it gives a
gentle wobble, but it never opens. That's by design: this teaser is meant
to build anticipation for the *real* birthday website you'll send him on
the day itself.
