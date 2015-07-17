var URL_ARCHIVED_WEBMAKER = 'https://old.webmaker.org';
var URL_EVENTS_WEBMAKER = 'https://events.webmaker.org';
var URL_TEACH_SITE = 'https://teach.mozilla.org';

exports.redirectMap = [{
  to: URL_ARCHIVED_WEBMAKER + '/tools',
  from: [
    '/tools/x-ray-goggles',
    '/tools/x-ray-goggles/install'
  ]
}, {
  // Switch to SSL after Bug 883370 lands.
  to: 'http://blog.webmaker.org',
  from: [
    '/news'
  ]
}, {
  to: URL_ARCHIVED_WEBMAKER + '/getinvolved',
  from: [
    '/build',
    '/get-involved'
  ]
}, {
  to: URL_EVENTS_WEBMAKER + '/#!/event-guides',
  from: [
    '/guides',
    '/event-guides'
  ]
}, {
  to: 'https://support.mozilla.org/kb/translate-webmaker',
  from: [
    '/translate'
  ]
}, {
  to: URL_EVENTS_WEBMAKER,
  from: [
    '/events'
  ]
}, {
  to: URL_EVENTS_WEBMAKER + '/#!/events/',
  from: [
    '/events/{event}'
  ]
}, {
  to: URL_ARCHIVED_WEBMAKER + '/explore',
  from: [
    '/gallery'
  ]
}, {
  to: 'https://hivelearningnetworks.org/',
  from: [
    '/_hive'
  ]
}, {
  to: URL_TEACH_SITE + '/events',
  from: [
    // Previous from that redirected to /party
    '/partners',
    '/party',
    '/makerparty'
  ]
}, {
  to: URL_TEACH_SITE + '/teach-like-mozilla/web-literacy',
  from: [
    // Previous from that redirected to /resources
    '/network',
    '/kits',
    '/kit-prototypes',
    '/starter-makes',
    '/resources',
    '/resources/{param*}',
    '/literacy',
    '/literacy/{param*}'
  ]
}, {
  to: URL_TEACH_SITE,
  from: [
    // Previous from that redirected to /mentor
    '/community',
    '/connect',
    '/mentor'
  ]
}];
