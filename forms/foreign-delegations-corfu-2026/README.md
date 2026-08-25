# Foreign Delegations — Corfu 2026

## Live form

[Open the active English registration form](https://script.google.com/a/macros/nglgreece.gr/s/AKfycbxlT3ubfUS6TYloOAfd1BNSq4WvnA9_ekRJIyOUSGSC34Ie2oEyXJhVAM2fLqT9TNS0OA/exec)

## Event

- National Grand Lodge of Greece
- Semi-Annual Grand Communication
- Corfu, Greece
- 18–19 December 2026

## Response destination

The production backend in `Code.gs` writes to:

- Spreadsheet: **Form 18 19 Dec 2026**
- Spreadsheet ID: `143R9sFxNZ08yJs6HD21YGaXqge2M5f3pYAOEpeyDUtY`
- Sheet tab: `form1`
- Build: `NGLG-EN-CORFU-2026-R5`

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

## Conditional and multilingual behaviour

- Arrival date, departure date, airline, arrival flight/time and departure flight/time remain hidden unless **Flights booked?** is set to **Yes**.
- Selecting a Grand Lodge displays a five-second welcome card in English and the relevant local language or languages.
- The welcome card includes a close button and right-to-left presentation for Hebrew and Arabic.
- Registrations are stored before email delivery is attempted, so an email-service error cannot lose the submitted data.
- Confirmation email to the registrant and notification email to the Grand Chancellor are sent independently.
- Confirmation emails include the NGLG emblem in the header and the Grand Chancellor portrait beside the signature.

## Deployment

1. Open the Google Apps Script project.
2. Replace its `Code.gs` with this repository's `Code.gs`.
3. Replace its `Index.html` with this repository's `Index.html`.
4. In Apps Script, run `testConnection()` once and grant the requested permissions.
5. Confirm the result reports:
   - `spreadsheet: Form 18 19 Dec 2026`
   - `sheet: form1`
   - `build: NGLG-EN-CORFU-2026-R5`
   - `emailHeader: Email (Head of Delegation)`
   - `organizerEmail: grand.chancellor@nglgreece.gr`
   - a positive `remainingDailyEmailQuota`
6. Select **Deploy → Manage deployments → Edit → New version → Deploy**.
7. Open the `/exec` URL in a private/incognito browser and submit one clearly labelled test registration.
8. Confirm that one new row appears in `form1` and that the confirmation email arrives.

## Optional email copy

The default organiser notification address is `grand.chancellor@nglgreece.gr`. Set `ORGANIZER_EMAIL` in **Project Settings → Script Properties** only if it needs to be overridden.

## Privacy

Never commit response exports or personal data. The spreadsheet is intentionally not included in this repository.
