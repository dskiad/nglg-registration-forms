# NGLG Registration Forms

Official registry and implementation notes for online registration forms of the National Grand Lodge of Greece.

## Foreign Delegations — Corfu 2026

- **Event:** Semi-Annual Grand Communication
- **Dates:** 18–19 December 2026
- **Location:** Corfu, Greece
- **Status:** Active
- **Public registration form:** [Open the English registration form](https://script.google.com/a/macros/nglgreece.gr/s/AKfycbyMTD6JF8UGql8p7XMij_EIOBigcYzQZxug3ap4DqDLqExORIiA37ykqx74GkCthsdeBQ/exec)
- **Official website:** [nglgreece.org/en](https://nglgreece.org/en/)
- **Response destination:** `Form 18 19 Dec 2026` → `form1`
- **Build:** `NGLG-EN-CORFU-2026-R1`
- **Last code update:** 24 August 2026

The form can also be reached through the official website under **External Relations → REGISTER IN Semi Annual Grand Communication – 18 & 19 Dec 2026 in Corfu**.

## Repository contents

- `forms/foreign-delegations-corfu-2026/Code.gs` — production Apps Script backend connected to the response spreadsheet.
- `forms/foreign-delegations-corfu-2026/Index.html` — responsive English webform aligned with the response columns.
- `forms/foreign-delegations-corfu-2026/README.md` — deployment and testing instructions.
- `forms/foreign-delegations-corfu-2026/links.json` — machine-readable public-link registry.
- `forms/foreign-delegations-corfu-2026/Code.gs.example` — optional Script Properties reference.

## Privacy and security

This public repository contains **no submitted registrations or participant data**. The response spreadsheet remains access-controlled in Google Drive.

Never commit exported registrations, participant names, email addresses, travel details, credentials, or service-account files.
