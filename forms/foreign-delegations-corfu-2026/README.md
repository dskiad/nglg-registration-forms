# Foreign Delegations — Corfu 2026

## Live form

[Open the active English registration form](https://script.google.com/a/macros/nglgreece.gr/s/AKfycbyMTD6JF8UGql8p7XMij_EIOBigcYzQZxug3ap4DqDLqExORIiA37ykqx74GkCthsdeBQ/exec)

## Event

- National Grand Lodge of Greece
- Semi-Annual Grand Communication
- Corfu, Greece
- 18–19 December 2026

## Response destination

The production backend in `Code.gs` writes to:

- Spreadsheet: **Form 18 19 Dec 2026**
- Spreadsheet ID: `1HrlJceDivajt2ENWmlaZSR7U5ScMkxL7OoNu-KMh9_c`
- Sheet tab: `form1`
- Build: `NGLG-EN-CORFU-2026-R1`

The first 25 columns are validated before every write. Column Z is used for **Email (Head of Delegation)** and is created automatically if the header is blank. If any earlier header differs, the submission stops before writing, preventing column misalignment.

## Information collected

- Grand Lodge and founding year
- Head of Delegation: name, salutation, rank/office and email
- Accompanying person/spouse
- Arrival and departure dates
- Flight booking status, airline, flight numbers and times
- Allergies and dietary restrictions
- Optional Participant 2 details
- Optional Participant 3 details

## Deployment

1. Open the Google Apps Script project.
2. Replace its `Code.gs` with this repository's `Code.gs`.
3. Replace its `Index.html` with this repository's `Index.html`.
4. In Apps Script, run `testConnection()` once and grant the requested permissions.
5. Confirm the result reports:
   - `spreadsheet: Form 18 19 Dec 2026`
   - `sheet: form1`
   - `build: NGLG-EN-CORFU-2026-R1`
6. Select **Deploy → Manage deployments → Edit → New version → Deploy**.
7. Open the `/exec` URL in a private/incognito browser and submit one clearly labelled test registration.
8. Confirm that one new row appears in `form1` and that the confirmation email arrives.

## Optional email copy

Set `ORGANIZER_EMAIL` in **Project Settings → Script Properties** if the organiser should receive a copy of each confirmation.

## Privacy

Never commit response exports or personal data. The spreadsheet is intentionally not included in this repository.
