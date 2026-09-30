// utils/nextEvents.js — dates are local calendar days (no time-of-day).
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// n-th given weekday (0=Sun) of a month; month may overflow (12 -> next January).
const nthWeekday = (year, month, weekday, n) => {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7);
};

const RULES = {
  'second-sunday': (from) => {
    let d = nthWeekday(from.getFullYear(), from.getMonth(), 0, 2);
    if (d < startOfDay(from)) d = nthWeekday(from.getFullYear(), from.getMonth() + 1, 0, 2);
    return d;
  },
  thanksgiving: (from) => {
    let d = nthWeekday(from.getFullYear(), 10, 4, 4);
    if (d < startOfDay(from)) d = nthWeekday(from.getFullYear() + 1, 10, 4, 4);
    return d;
  },
  christmas: (from) => {
    let d = new Date(from.getFullYear(), 11, 25);
    if (d < startOfDay(from)) d = new Date(from.getFullYear() + 1, 11, 25);
    return d;
  },
};

// -> rows in the shape mapEventsToCards expects, soonest first.
export function getUpcomingEventRows(defs, from = new Date()) {
  return defs
    .map((def) => ({
      id: def.id,
      name: def.name,
      city: def.city,
      imageUrl: def.image, // an image *name* (see ResponsiveImage)
      link: def.link,
      startsOn: RULES[def.rule](from).toISOString(),
    }))
    .sort((a, b) => new Date(a.startsOn) - new Date(b.startsOn));
}
