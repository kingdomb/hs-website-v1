// data/events.js — the ministry is event-based; these are its recurring events.
// rule: 'second-sunday' (every month) | 'thanksgiving' (4th Thursday of November) | 'christmas' (Dec 25)
export const EVENT_DEFS = [
  { id: 'second-sunday-serve', name: 'Second Sunday Serve — Homeless Food Outreach', city: 'Atlanta', image: 'meals-handout', rule: 'second-sunday', link: '#' },
  { id: 'thanksgiving', name: 'Thanksgiving Community Meal', city: 'Atlanta', image: 'thanksgiving-meal', rule: 'thanksgiving', link: '#' },
  { id: 'christmas', name: 'Christmas Community Meal', city: 'Atlanta', image: 'christmas-meal', rule: 'christmas', link: '#' },
];
