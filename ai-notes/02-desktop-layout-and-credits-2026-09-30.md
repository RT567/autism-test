# autism-test — desktop layout pass, footer/credits removed

Follow-up the same day as doc 01. Two requests from Rob.

## 1. A proper desktop version

Before this, desktop was the phone layout inside a 760px column. Now there are three tiers in
`style.css`:

- **< 560px (phones)**: unchanged single column. The Q2 photos are a 2×2 grid and Q5 is a 5×2 grid.
- **960px+ (desktop)**: the sheet is 1140px wide and body text is 17px.
  - **Intro**: title, lede and instructions on the left, metadata table on the right (`.intro-grid`).
  - **Q1, Q3, Q4, Q5**: question on the left (5fr), answers on the right (7fr) (`.q-layout`).
    The Q4 checklist is more compact so Next stays above the fold at 1366×768. On Q5 only the scale
    column is vertically centred.
  - **Q2**: a single-column "police lineup". The reference photo is the first column, then a hairline
    divider, then the four candidates 4-across (`.lineup`).
  - **Report**: score, band, interpretation and Table 1 on the left; Figure 1 on the right, and it is
    sticky (`.report-grid`). Signature and actions sit underneath.
- **1600px+**: sheet 1320px, root and body font 18px, bigger gutters and padding, a little more top
  padding.

JS changes to support this:

- `renderIntro`, `renderQuestion`, `faceChoice` and `renderResult` wrap their content in the grid
  containers above.
- Q2's "Thank you." acknowledgement moved into the nav row (`.ack-slot`, between Back and Next) so the
  page doesn't grow after a pick. On phones it sits above the buttons at full width.
- The chart is taller on wide containers (`H = min(480, W*0.8)` when W > 500).
- Participant dots no longer have the 2px surface ring, because neighbouring dots overlapped into
  crescent shapes. The "You" dot keeps its ring.
- `scrollbar-gutter: stable` on `html` stops the layout shifting sideways between short and long
  screens.

Checked every screen (intro, Q1–Q5, processing, report) at 1366×768 and 1920×1080. Also rechecked 390px
and 375px phone widths: no console errors and no horizontal scroll.

## 2. Footer disclaimer and visible image credits removed (Rob's request)

The footer ("Not a real medical test. The institute is also not real. Made with love for a brother."
plus the collapsible "Image credits" list) is gone from `index.html`, and its CSS is gone too. There is
no leftover footer spacing. The photo attributions (author, licence, source URL for each file) now live
in **`CREDITS.md`** in the repo root. Doc 01's mentions of the footer disclaimer and credits are
superseded by this change.

Caveat for the future: the CC BY / CC BY-SA licences ask for attribution "reasonable to the medium".
Credits that exist only in the repo, not on the page, are a weaker form of that. If this ever matters,
the cheap fix is a small "Photo credits" link to `CREDITS.md` on the page.
