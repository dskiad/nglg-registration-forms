# Greek dinner registration form

This is the Greek NGLG dinner-registration web app (`BUILD NGLG-7S-R6`). It is separate from the English foreign-delegation form.

## Supported events

- Μεγάλη Συνέλευση 19ης Δεκεμβρίου 2026 → worksheet `DEC 2026`
- Μεγάλη Συνέλευση 15ης Μαΐου 2027 → worksheet `MAY 2027`

If `MAY 2027` does not exist, the backend creates it with the same response headers.

## Spreadsheet structure

The source spreadsheet should contain:

- `DEC 2026` with the headers: `register day`, `name`, `surname`, `Salutation`, `Office`, `Province`, `Lodge`, `Partner`, `mobile`, `email`
- `lodges` with `lodge`, `number`, `province`
- `web text` (optional presentation text)
- `cover` or `cover ` (optional) with mobile in column A, personal message in column B, and the one-time display timestamp in column D

The app creates/updates `Στατιστικά`. December statistics use columns A:B and May statistics use D:E.

## Deploy in Google Apps Script

1. Import the master workbook into Google Sheets, or open the existing Google Sheet that contains the same tabs.
2. Open **Extensions → Apps Script**.
3. Replace `Code.gs`, add an HTML file named `Index`, and paste in the matching files from this folder.
4. In **Project Settings → Script properties**, set `SPREADSHEET_ID` to the Google Sheet ID. A spreadsheet-bound script can omit this property.
5. Optionally set `ORGANIZER_EMAIL` to receive a copy/notification for every registration.
6. Deploy as **Web app**, execute as **Me**, and grant access to **Anyone**.
7. After every code change, create a **New version** and update the deployment.

## Behaviour

- Filters lodges by Province/Region and displays lodge numbers.
- Uses the approved 36-item list of active Grand Officers in the exact supplied order.
- Prevents duplicate registrations with the same mobile number in the selected event sheet.
- Displays a personal mobile message only once and records the display time in column D of `cover`.
- Confirms/corrects the email before submission.
- Saves the registration even if the confirmation email service fails, and returns the real email-delivery status to the browser.
- Updates event statistics after every registration.

The public repository contains no real mobile-to-message mappings. Personal messages remain in the private Google Sheet.
