/**
 * NGLG English registration form — Corfu, 18–19 December 2026.
 * Production response destination:
 *   Spreadsheet: Form 18 19 Dec 2026
 *   Sheet tab: form1
 *   Build: NGLG-EN-CORFU-2026-R5
 */

const SPREADSHEET_ID_ = '143R9sFxNZ08yJs6HD21YGaXqge2M5f3pYAOEpeyDUtY';
const RESPONSE_SHEET_ = 'form1';
const BUILD_ = 'NGLG-EN-CORFU-2026-R5';
const DEFAULT_ORGANIZER_EMAIL_ = 'grand.chancellor@nglgreece.gr';
const EMAIL_EMBLEM_URL_ = 'https://raw.githubusercontent.com/dskiad/nglg-registration-forms/main/forms/foreign-delegations-corfu-2026/assets/nglg-emblem.jpg.b64';
const EMAIL_CHANCELLOR_PHOTO_URL_ = 'https://raw.githubusercontent.com/dskiad/nglg-registration-forms/main/forms/foreign-delegations-corfu-2026/assets/grand-chancellor.jpg.b64';

const RESPONSE_HEADERS_ = [
  'Timestamp',
  'Grand Lodge',
  'Founding Year',
  'Last Name (Head of Delegation)',
  'First Name (Head of Delegation)',
  'Salutation / Title (Head of Delegation)',
  'Rank / Office (Head of Delegation)',
  'Accompanying Person / Spouse',
  'Arrival (Date)',
  'Departure (Date)',
  'Flights Booked?',
  'Airline',
  'Arrival Flight & Time',
  'Departure Flight & Time',
  'Allergies / Dietary Restrictions',
  'Full Name (Participant 2)',
  'Salutation / Title (Participant 2)',
  'Rank / Office (Participant 2)',
  'Accompanying Person (Participant 2)',
  'Allergies / Diet (Participant 2)',
  'Full Name (Participant 3)',
  'Salutation / Title (Participant 3)',
  'Rank / Office (Participant 3)',
  'Accompanying Person (Participant 3)',
  'Allergies / Diet (Participant 3)',
  'Email (Head of Delegation)'
];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('NGLG Assembly Registration')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1');
}

function getBuildInfo() {
  return {
    build: BUILD_,
    destination: 'Form 18 19 Dec 2026 / form1'
  };
}

function submitData(formData) {
  const data = normalizeAndValidate_(formData);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    const sheet = getValidatedResponseSheet_();
    sheet.appendRow([
      new Date(),
      data.grandLodge,
      data.foundingYear,
      data.lastName,
      data.firstName,
      data.title,
      data.rank,
      data.accompanyingPerson,
      data.arrivalDate,
      data.departureDate,
      data.flightsBooked,
      data.airline,
      data.arrivalFlightAndTime,
      data.departureFlightAndTime,
      data.allergies,
      data.participant2FullName,
      data.participant2Title,
      data.participant2Rank,
      data.participant2Companion,
      data.participant2Allergies,
      data.participant3FullName,
      data.participant3Title,
      data.participant3Rank,
      data.participant3Companion,
      data.participant3Allergies,
      data.email
    ]);

    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }

  const emailResult = sendConfirmation_(data);

  return {
    ok: true,
    build: BUILD_,
    message: 'Registration received successfully.',
    email: data.email,
    stored: true,
    userEmailSent: emailResult.userEmailSent,
    organizerEmailSent: emailResult.organizerEmailSent,
    emailSent: emailResult.userEmailSent && emailResult.organizerEmailSent,
    organizerEmail: emailResult.organizerEmail,
    emailErrors: emailResult.errors
  };
}

function getValidatedResponseSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID_);
  const sheet = spreadsheet.getSheetByName(RESPONSE_SHEET_);

  if (!sheet) {
    throw new Error('The response sheet "form1" was not found.');
  }

  const currentHeaders = sheet
    .getRange(1, 1, 1, RESPONSE_HEADERS_.length)
    .getDisplayValues()[0];

  for (let index = 0; index < RESPONSE_HEADERS_.length - 1; index += 1) {
    if (String(currentHeaders[index] || '').trim() !== RESPONSE_HEADERS_[index]) {
      throw new Error(
        'Response-sheet header mismatch in column ' + (index + 1) +
        '. No registration was written.'
      );
    }
  }

  const emailColumn = RESPONSE_HEADERS_.length;
  const currentEmailHeader = String(currentHeaders[emailColumn - 1] || '').trim();

  if (!currentEmailHeader) {
    sheet.getRange(1, emailColumn).setValue(RESPONSE_HEADERS_[emailColumn - 1]);
  } else if (currentEmailHeader !== RESPONSE_HEADERS_[emailColumn - 1]) {
    throw new Error('Column Z must be "Email (Head of Delegation)".');
  }

  return sheet;
}

function normalizeAndValidate_(formData) {
  const clean = value => String(value == null ? '' : value).trim();

  const data = {
    grandLodge: clean(formData.grandLodge),
    foundingYear: clean(formData.foundingYear),
    lastName: clean(formData.lastName),
    firstName: clean(formData.firstName),
    title: clean(formData.title),
    rank: clean(formData.rank),
    accompanyingPerson: clean(formData.accompanyingPerson),
    arrivalDate: clean(formData.arrivalDate),
    departureDate: clean(formData.departureDate),
    flightsBooked: clean(formData.flightsBooked),
    airline: clean(formData.airline),
    arrivalFlightAndTime: clean(formData.arrivalFlightAndTime),
    departureFlightAndTime: clean(formData.departureFlightAndTime),
    allergies: clean(formData.allergies),
    participant2FullName: clean(formData.participant2FullName),
    participant2Title: clean(formData.participant2Title),
    participant2Rank: clean(formData.participant2Rank),
    participant2Companion: clean(formData.participant2Companion),
    participant2Allergies: clean(formData.participant2Allergies),
    participant3FullName: clean(formData.participant3FullName),
    participant3Title: clean(formData.participant3Title),
    participant3Rank: clean(formData.participant3Rank),
    participant3Companion: clean(formData.participant3Companion),
    participant3Allergies: clean(formData.participant3Allergies),
    email: clean(formData.email).toLowerCase()
  };

  ['grandLodge', 'lastName', 'firstName', 'title', 'rank', 'flightsBooked', 'email']
    .forEach(key => {
      if (!data[key]) {
        throw new Error('Please complete every required field.');
      }
    });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (data.foundingYear && !/^\d{3,4}$/.test(data.foundingYear)) {
    throw new Error('Please enter a valid founding year.');
  }

  return data;
}

function sendConfirmation_(data) {
  const organizerEmail = PropertiesService.getScriptProperties()
    .getProperty('ORGANIZER_EMAIL') || DEFAULT_ORGANIZER_EMAIL_;

  const emailImages = getEmailImages_();
  const emblemHtml = emailImages.inlineImages.nglgEmblem
    ? '<img src="cid:nglgEmblem" width="80" height="80" alt="NGLG emblem" style="display:block;width:80px;height:80px;object-fit:cover;border-radius:6px">'
    : '';
  const chancellorHtml = emailImages.inlineImages.grandChancellor
    ? '<img src="cid:grandChancellor" width="50" height="50" alt="RW Bro. Dimitrios Skiadopoulos" style="display:block;width:50px;height:50px;object-fit:cover;border-radius:50%;border:1px solid #c99a35">'
    : '';

  const subject = 'NGLG Registration Confirmation — Corfu 18–19 December 2026';
  const html = '<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#17233b">' +
    '<div style="background:#06244a;color:#fff;padding:24px;text-align:center;border-bottom:3px solid #c99a35">' +
      '<table role="presentation" style="border-collapse:collapse;margin:0 auto"><tr>' +
        (emblemHtml ? '<td style="padding:0 12px 0 0;vertical-align:middle">' + emblemHtml + '</td>' : '') +
        '<td style="vertical-align:middle;text-align:left"><h2 style="margin:0">The National Grand Lodge of Greece</h2>' +
      '<p style="margin:8px 0 0;color:#efd58f">Registration Confirmation</p>' +
        '</td></tr></table>' +
    '</div>' +
    '<div style="padding:24px;border:1px solid #d7c28e">' +
      '<p>Dear ' + escapeHtml_(data.title) + ' ' + escapeHtml_(data.lastName) + ',</p>' +
      '<p>Your registration for the Semi-Annual Grand Communication in Corfu, 18–19 December 2026, has been received.</p>' +
      '<table style="border-collapse:collapse;width:100%">' +
        row_('Grand Lodge', data.grandLodge) +
        row_('Founding Year', data.foundingYear) +
        row_('Head of Delegation', data.firstName + ' ' + data.lastName) +
        row_('Email', data.email) +
        row_('Rank / Office', data.rank) +
        row_('Accompanying Person / Spouse', data.accompanyingPerson) +
        row_('Arrival', [data.arrivalDate, data.arrivalFlightAndTime].filter(Boolean).join(' — ')) +
        row_('Departure', [data.departureDate, data.departureFlightAndTime].filter(Boolean).join(' — ')) +
        row_('Flights Booked', data.flightsBooked) +
        row_('Airline', data.airline) +
        row_('Allergies / Dietary Restrictions', data.allergies) +
        row_('Participant 2', participantSummary_(data, 2)) +
        row_('Participant 3', participantSummary_(data, 3)) +
      '</table>' +
      '<table role="presentation" style="border-collapse:collapse;margin-top:24px"><tr>' +
        '<td style="vertical-align:middle;padding:0 10px 0 0">' + chancellorHtml + '</td>' +
        '<td style="vertical-align:middle;line-height:1.45">For the Organisation<br><strong>The Grand Chancellor</strong><br>RW Bro. Dimitrios Skiadopoulos</td>' +
      '</tr></table>' +
    '</div>' +
  '</div>';

  const plainBody = [
    'Dear ' + data.title + ' ' + data.lastName + ',',
    '',
    'Your registration for the Semi-Annual Grand Communication in Corfu, 18–19 December 2026, has been received.',
    '',
    'Grand Lodge: ' + (data.grandLodge || '—'),
    'Head of Delegation: ' + data.firstName + ' ' + data.lastName,
    'Email: ' + data.email,
    'Rank / Office: ' + data.rank,
    'Arrival: ' + ([data.arrivalDate, data.arrivalFlightAndTime].filter(Boolean).join(' — ') || '—'),
    'Departure: ' + ([data.departureDate, data.departureFlightAndTime].filter(Boolean).join(' — ') || '—'),
    '',
    'For the Organisation',
    'The Grand Chancellor',
    'RW Bro. Dimitrios Skiadopoulos'
  ].join('\n');

  const result = {
    organizerEmail: organizerEmail,
    userEmailSent: false,
    organizerEmailSent: false,
    errors: []
  };

  try {
    const userEmailOptions = {
      to: data.email,
      replyTo: organizerEmail,
      subject: subject,
      body: plainBody,
      htmlBody: html,
      name: 'National Grand Lodge of Greece'
    };
    if (Object.keys(emailImages.inlineImages).length) {
      userEmailOptions.inlineImages = emailImages.inlineImages;
    }
    MailApp.sendEmail(userEmailOptions);
    result.userEmailSent = true;
  } catch (error) {
    result.errors.push('User confirmation: ' + String(error && error.message ? error.message : error));
    console.error(result.errors[result.errors.length - 1]);
  }

  try {
    const organizerEmailOptions = {
      to: organizerEmail,
      replyTo: data.email,
      subject: 'New foreign-delegation registration — ' + data.grandLodge,
      body: 'A new registration has been stored.\n\n' + plainBody,
      htmlBody: '<p><strong>A new registration has been stored.</strong></p>' + html,
      name: 'NGLG Registration System'
    };
    if (Object.keys(emailImages.inlineImages).length) {
      organizerEmailOptions.inlineImages = emailImages.inlineImages;
    }
    MailApp.sendEmail(organizerEmailOptions);
    result.organizerEmailSent = true;
  } catch (error) {
    result.errors.push('Organizer notification: ' + String(error && error.message ? error.message : error));
    console.error(result.errors[result.errors.length - 1]);
  }

  return result;
}

function getEmailImages_() {
  const inlineImages = {};

  try {
    inlineImages.nglgEmblem = fetchBase64Image_(EMAIL_EMBLEM_URL_, 'nglg-emblem.jpg');
  } catch (error) {
    console.error('Email emblem could not be loaded: ' + String(error));
  }

  try {
    inlineImages.grandChancellor = fetchBase64Image_(EMAIL_CHANCELLOR_PHOTO_URL_, 'grand-chancellor.jpg');
  } catch (error) {
    console.error('Grand Chancellor photo could not be loaded: ' + String(error));
  }

  return { inlineImages: inlineImages };
}

function fetchBase64Image_(url, fileName) {
  const encoded = UrlFetchApp.fetch(url).getContentText().replace(/\s/g, '');
  return Utilities.newBlob(Utilities.base64Decode(encoded), 'image/jpeg', fileName);
}

function participantSummary_(data, number) {
  const prefix = 'participant' + number;
  const fullName = data[prefix + 'FullName'];

  if (!fullName) {
    return '—';
  }

  return [
    data[prefix + 'Title'],
    fullName,
    data[prefix + 'Rank'],
    data[prefix + 'Companion'] ? 'Accompanying: ' + data[prefix + 'Companion'] : '',
    data[prefix + 'Allergies'] ? 'Diet: ' + data[prefix + 'Allergies'] : ''
  ].filter(Boolean).join(' — ');
}

function row_(label, value) {
  return '<tr><th style="text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid #ddd">' +
    escapeHtml_(label) +
    '</th><td style="padding:8px;border-bottom:1px solid #ddd">' +
    escapeHtml_(value || '—') +
    '</td></tr>';
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Run once from the Apps Script editor before deployment.
 * It verifies access and adds the Email header to column Z when needed.
 */
function testConnection() {
  const sheet = getValidatedResponseSheet_();
  const organizerEmail = PropertiesService.getScriptProperties()
    .getProperty('ORGANIZER_EMAIL') || DEFAULT_ORGANIZER_EMAIL_;

  return {
    ok: true,
    build: BUILD_,
    spreadsheet: SpreadsheetApp.openById(SPREADSHEET_ID_).getName(),
    sheet: sheet.getName(),
    lastRow: sheet.getLastRow(),
    emailHeader: sheet.getRange(1, RESPONSE_HEADERS_.length).getDisplayValue(),
    organizerEmail: organizerEmail,
    remainingDailyEmailQuota: MailApp.getRemainingDailyQuota()
  };
}
