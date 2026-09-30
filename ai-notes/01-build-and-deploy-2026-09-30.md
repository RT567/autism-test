# autism-test — "NYSM-5" fake screening questionnaire. Brief, build, deploy

Live: https://rt567.github.io/autism-test/  ·  Repo: github.com/RT567/autism-test (branch `main`, legacy
Pages serves `/`). Local: `~/silly/autism-test`.

## The idea (Rob's brief)

A family in-joke between Rob and his siblings: there's a funny correlation between people who loved the
*Now You See Me* films as teenagers and being autistic. Rob's brother is "kind of autistic" and loves the
movie. The site is an affectionate ribbing aimed at the brother and at the movie — **not** mocking
autistic people. Keep it in that register if you change the copy.

Joke structure: it poses as a serious, clinical screening questionnaire. It starts nonchalant, every
question is secretly about *Now You See Me*, and it gets more blatant until it's obvious the "test" is
just "do you like Now You See Me". The result is **exactly the Q5 answer** and nothing else.

## What's on the page

One screen at a time, rendered by `app.js` into `<main id="app">`:

0. **Intro** — "Adolescent Interests Screening Questionnaire", metadata table (instrument NYSM-5 =
   "Neurodevelopmental Youth Screening Measure" — the acronym is the slow-burn gag; version 2.1; random
   respondent ID; today's date), "Begin screening".
1. **Q1** (Rob's text) "As a teenager, did you find comfort in individual pursuits such as magic?" —
   Never/Rarely/Sometimes/Often/Always with clinical (0)–(4) codes.
2. **Q2** facial recognition (Rob's framing): reference photo of Jesse Eisenberg, then four unnamed tiles
   (Michael Cera, a *different* Jesse photo, Mark Zuckerberg, Andrew Garfield), order shuffled per load.
   On pick: names revealed under every tile, the Jesse tile marked "✓ Match", deadpan "Thank you. Your
   response has been recorded. Accuracy is not scored." Same response whatever they pick.
3. **Q3** (Rob's text) comfort media "…such as the 2013 feature film *Now You See Me*?" — Yes / Somewhat
   / No / Prefer not to say.
4. **Q4** (invented; Rob didn't specify) "Have you ever done any of the following? Select all that
   apply." Checklist that escalates within itself: explained the ending to someone who did not ask;
   explained "the Eye"; said "the closer you look, the less you see" aloud in a non-magic context;
   assigned family members to the Four Horsemen; watched *NYSM 2* (2016) and defended it; attempted a
   card flourish at a family meal; insisted the twist was "obvious if you were paying attention"; None of
   the above (exclusive).
5. **Q5** (Rob's text) 1–10 enjoyment of "the magic-based feature film *Now You See Me*, featuring Jesse
   Eisenberg". 10 buttons (5×2 grid on phones).
6. **Processing** ~2 s fake progress bar ("Applying item weights…").
7. **Screening report** — big score N/10, band label + meter, formal interpretation paragraph per band
   (1–2 minimal, 3–4 low, 5–6 moderate, 7–8 elevated, 9–10 high), **Table 1 · Item weights** showing
   items 1–4 weighted 0.00 and item 5 weighted 1.00 (the reveal), then **Figure 1 "Autism correlation to
   enjoyment of *Now You See Me*"**: inline-SVG scatter of 48 "participants" exactly on y = x (r = 1.00,
   p < 0.001), least-squares line, "You (N)" plotted on the line in orange, hover/tap tooltip. Signed by
   "J. D. Horseman, Reviewing clinician". Share (navigator.share, else clipboard) and Retake.

Footer: tiny "Not a real medical test. The institute is also not real. Made with love for a brother."
plus collapsible image credits.

Years checked: *Now You See Me* 2013, *NYSM 2* 2016, *Now You See Me: Now You Don't* 2025.

## Design decisions

- Clinical self-report-form look: warm off-white paper, a single deep-blue accent (`--ink-accent
  #1d4a6b`), Source Serif 4 (headings/questions) + IBM Plex Sans (UI) + IBM Plex Mono (form metadata),
  all from Google Fonts. Form bar "Form NYSM-5 · Rev. 2.1 · Item n of 5", segmented progress bar.
- Invented neutral institute: "Institute for Adolescent Neurodevelopmental Screening", logo is a simple
  eye glyph (a quiet nod to "the Eye"). No real organisation's name/branding is imitated — keep it so.
- Chart colours are the dataviz skill's validated categorical slots 1 (blue `#2a78d6`, participants)
  and 2 (orange `#eb6834`, You); text never uses series colours; legend present; 1px recessive grid.
  Chart is drawn at the container's real pixel width (not a scaled viewBox) and redrawn on resize so
  text stays legible on phones. Participant x values come from a seeded PRNG (seed 20130531 = NYSM
  release date) so the figure is identical every time. On widths < 440px the dots drop their surface
  ring (rings overlapping made crescent artefacts).
- Pure static site: `index.html`, `style.css`, `app.js`, `img/`. No build step, no chart library.
  All asset paths are relative (served under `/autism-test/`).

## Photos (Wikimedia Commons, downloaded + cropped to 480×600 4:5 JPEGs in `img/`)

| file | subject | source | author | licence |
|---|---|---|---|---|
| `subject.jpg` | Jesse Eisenberg (reference) | File:Jesse_Eisenberg_by_Gage_Skidmore.jpg | Gage Skidmore | CC BY-SA 3.0 |
| `option-b.jpg` | Jesse Eisenberg (the match) | File:Jesse_Eisenberg_2009.jpg | Steve Rogers | CC BY-SA 2.0 |
| `option-a.jpg` | Michael Cera | File:Michael_Cera_2012_(Cropped).jpg | Eva Rinaldi | CC BY-SA 2.0 |
| `option-c.jpg` | Mark Zuckerberg | File:Mark_Zuckerberg_at_the_37th_G8_Summit_in_Deauville_018_v1.jpg | Guillaume Paumier | CC BY 3.0 |
| `option-d.jpg` | Andrew Garfield | File:Andrew_Garfield_2011_CC2011.jpg | Gerald Geronimo | CC BY-SA 2.0 |

Credits (author, licence link, source link, "cropped and resized", derivatives under the same licences)
are in the footer's "Image credits". The file letters a–d are just filenames; on screen the tiles are
shuffled and labelled Photo A–D by position. Crops were done with Pillow via
`uv run --with pillow` (no PIL in system python): top-anchored, full width, height = 1.25 × width.

## Deploy

```bash
gh repo create RT567/autism-test --public --source . --push
gh api -X POST repos/RT567/autism-test/pages -f 'source[branch]=main' -f 'source[path]=/'
gh api repos/RT567/autism-test/pages/builds/latest --jq .status   # poll until "built"
```
After that, deploy = `git push` to `main`; Pages rebuilds in ~1 min.

## Testing

`python3 -m http.server 8763 --directory ~/silly/autism-test` and drive it with chrome-devtools MCP.
Checked at 1280×900 and 375/390px phone emulation, Q5 = 1, 3, 6, 7, 10; no console errors, no
horizontal scroll on phones.

## Gotchas

- `<img>` tags carry `width/height` attributes for layout stability, so CSS must set `height: auto`
  or the 4:5 aspect is lost (it was, briefly).
- Face tiles are `<button>`s; buttons vertically centre their content by default, so `.face` is a
  flex column with `justify-content: flex-start` (otherwise tiles with a two-line name misalign).
- `bd init` added `.beads/`, `.claude/settings.json`, `AGENTS.md` and a beads block in `CLAUDE.md`
  (same as talkingbeers). The landing page (`~/silly/RT567.github.io`) link is added by the
  orchestrator, not from this repo.

## Still to do / ideas

- Nothing required. Possible: an OG preview image for nicer link unfurls in the family chat.
