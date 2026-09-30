# autism-test — clearer autism framing, hidden questionnaire length, copy tweaks

This is the third batch of Rob's requests on 2026-09-30. It supersedes the names and copy given in
docs 01 and 02 wherever they conflict.

## Clearly an autism screening (still clinical and deadpan)

- The page title and og:title are "NYSM-R Autism Spectrum Screening Questionnaire". The meta
  descriptions mention autism spectrum traits with adolescent onset.
- Under the masthead, the department line now reads "Autism Spectrum Screening Programme". The
  institute is unchanged.
- The intro eyebrow reads "Autism spectrum screening" and the h1 is "Autism Spectrum Screening
  Questionnaire". The lede says it screens for autism spectrum traits with adolescent onset.
- The form-details table gained two rows: "Condition screened: Autism spectrum disorder (ASD)" and
  "Onset window: Adolescence (ages 13–19)".
- On the report, the h1 is "ASD screening report", the eyebrow is "Autism spectrum screening ·
  Results", and the score label is "ASD likelihood score". The interpretation says "…range for autism
  spectrum disorder (ASD)". The chart's y-axis is "ASD likelihood score". The share text reads
  "My NYSM-R ASD likelihood score is N/10…".

## Don't reveal that there are only 5 questions

- **NYSM-5 is renamed NYSM-R** ("Neurodevelopmental Youth Screening Measure, Revised"). The old name
  read as "5 questions".
- The intro table no longer has an "Items" row. Administration is "Self-report, adaptive" and
  estimated time is "2–4 minutes" (Rob's later call; it had briefly been "10–15 minutes"). In the intro nav, "5 items" became "Adaptive item selection in
  use".
- Items carry non-sequential bank codes, as if adaptively selected from a larger pool: A-03, B-11,
  C-07, D-14, E-22 (`code` field in `Q`). The form bar shows "Section A · Item A-03" and the item
  label shows "Item A-03 · …".
- The segmented 5-step progress bar is now one continuous bar. Rob's final call is that it must be
  faithful: the width is (item index + 1) / 5, so it reaches 100% on the last item (`progress()`).
  For a short while it used uneven widths that stopped around 56%. No total count is ever shown as
  text. The processing screen opens with "Termination criterion met…".
- The last item's button is "Next", not "Submit responses".
- **The item-weights table is gone** (Rob: it made it too obvious that the score is just the last
  answer). Nothing on the page says or implies that items 1–4 carry zero weight. The interpretation
  now says scores are "referenced against age-matched normative data from the 2019 validation cohort
  (Figure 1)". The score still equals the Q5 answer; it just isn't explained. On desktop the left
  column is balanced with a "Recommended next steps" list (retain this report; discuss concerns with
  a qualified clinician; avoid rewatching *Now You See Me* in the 48 hours before any follow-up
  assessment). The chart column is no longer sticky.

## Copy tweaks

- Q1 now reads "As a teenager, did you find comfort in individual, repetitive, practice-based
  activities (for example, magic)?" (short label "Solitary, repetitive activities").
- Q3 now reads "As a teenager, did you obsess over any comfort media, such as the 2013 feature film
  *Now You See Me*?"
- Q2's post-pick acknowledgement is now just "Thank you. Your response has been recorded." The line
  "Accuracy is not scored." was removed.
- Q4: the "Explained the ending of *Now You See Me* to someone who did not ask" option was removed.
  The remaining six keep their escalating order (the Eye, the tagline, Four Horsemen, NYSM 2, card
  flourish, "obvious" twist), plus "None of the above".
- Q4 gained "Often considered yourself the smartest in the room" (Rob's wording). It nods to Atlas's
  "First rule of magic: always be the smartest guy in the room" and sits after the card flourish,
  before the "obvious" twist. The stem is unchanged. An earlier version briefly used a
  "reminded a family member that the first rule of magic…" wording. Q4 still fits at 1366×768.
- The disclaimer and on-page credits stay removed. Attributions remain in `CREDITS.md`.

## Minor

- When the nav row wraps (the intro on phones), the primary button stays right-aligned
  (`.nav > .btn:last-child { margin-left: auto }`).
- Cache-bust is now `?v=9` on `style.css` and `app.js`. Bump both on the next change.
