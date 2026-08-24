# Foreign Delegations — Corfu 2026

## Live form

[Open the active English registration form](https://script.google.com/a/macros/nglgreece.gr/s/AKfycbyMTD6JF8UGql8p7XMij_EIOBigcYzQZxug3ap4DqDLqExORIiA37ykqx74GkCthsdeBQ/exec)

## Event

- National Grand Lodge of Greece
- Semi-Annual Grand Communication
- Corfu, Greece
- 18–19 December 2026

## Information collected

The form requests:

- Grand Lodge
- Delegation role
- First name and last name
- Email
- Title / salutation
- Rank / office
- Accompanying spouse details
- Whether flights have been booked
- Arrival and departure dates
- Arrival and departure flight numbers and times

## Files

- `Index.html` is a responsive English interface suitable for Google Apps Script HTML Service.
- `Code.gs.example` is a sanitized reference backend. Copy it to `Code.gs` inside Apps Script and configure Script Properties.
- `links.json` records the current public URL and verification date.

## Apps Script configuration

Set these values in **Project Settings → Script Properties**:

- `SPREADSHEET_ID`: the private response spreadsheet ID
- `RESPONSES_SHEET`: response-tab name, for example `form1`
- `INVITATION_SHEET`: Grand Lodge list-tab name, for example `invitation`
- `ORGANIZER_EMAIL`: optional address that receives a copy

Deploy as a Web App and verify access in a private/incognito browser window.

> The live production deployment may contain additional private configuration. Never add response data or private spreadsheet identifiers to this public repository.
