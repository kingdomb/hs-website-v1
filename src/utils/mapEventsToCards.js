// src/utils/mapEventsToCards.js

/**
 * Transform DB event rows into { title, date, month, location, image, href }.
 *
 * Expected DB row shape (example):
 * {
 *   id: "evt_123",
 *   name: "Thanksgiving Community Meal — Atlanta",
 *   startsOn: "2025-11-27T12:00:00-05:00",
 *   city: "Atlanta",
 *   imageUrl: "encounter-hero", // an image *name* (see ResponsiveImage), not a URL
 *   link: "https://example.com/events/thanksgiving"
 * }
 */
export function mapEventsToCards(rows = []) {
  return rows.map((r) => {
    const d = new Date(r.startsOn);
    const date = String(d.getDate());
    const month = d.toLocaleString('en-US', { month: 'short' });

    return {
      title: r.name,
      date,
      month,
      location: r.city || '',
      image: r.imageUrl || '',
      href: r.link || '#',
    };
  });
}
