// giving.js
// PLACEHOLDER (owner decision): paste the ministry's own Tithe.ly form id below.
// While empty, the Give button renders disabled as "Giving coming soon" and the
// form/kiosk links and app badges are hidden.
const TITHELY_FORM_ID = '';

export const GIVING = {
  tithelyFormId: TITHELY_FORM_ID,
  enabled: Boolean(TITHELY_FORM_ID),
  formUrl: TITHELY_FORM_ID ? `https://give.tithe.ly/?formId=${TITHELY_FORM_ID}` : '',
  kioskUrl: TITHELY_FORM_ID ? `https://give.tithe.ly/?formId=${TITHELY_FORM_ID}&kiosk=true` : '',
  // App-store badges are only useful once a Tithe.ly account exists; owner adds them later.
  appLinks: [],
};
