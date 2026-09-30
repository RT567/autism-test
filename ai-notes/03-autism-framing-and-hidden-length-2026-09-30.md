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
- The segmented 5-step progress bar is now one continuous bar with uneven widths
  (6/17/29/43/56%, see `progress()`). It never gets near 100%, because the "adaptive" test ends
  early. The processing screen opens with "Termination criterion met…".
- The last item's button is "Next", not "Submit responses".
- The report table is titled "Table 1 · Item weights (administered items)" and uses the item codes.
  The interpretation says "all administered items" instead of "all five items".

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
- Q4 gained "Reminded a family member that the first rule of magic is to \"always be the smartest guy in
  the room\"". The phrasing is Daniel Atlas's line as given on Wikiquote: "First rule of magic: always be
  the smartest guy in the room." It sits after the card flourish and before the "obvious" twist, so
  it is family-directed lecturing rather than a second quote-said-aloud item. Q4 still fits at
  1366×768.
- The disclaimer and on-page credits stay removed. Attributions remain in `CREDITS.md`.

## Minor

- When the nav row wraps (the intro on phones), the primary button stays right-aligned
  (`.nav > .btn:last-child { margin-left: auto }`).
- Cache-bust is now `?v=6` on `style.css` and `app.js`. Bump both on the next change.
