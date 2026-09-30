// src/utils/mapNewsToItems.js

/**
 * Transform DB news rows into { title, subtitle, date, href } for news display. News is not currently rendered anywhere; this mapper is kept for future wiring.
 *
 * Expected DB row shape (example):
 * {
 *   id: "news_123",
 *   headline: "Pictorial Directory Update",
 *   subhead: "Short blurb or sub-title",
 *   publishedAt: "2025-06-10T14:30:00Z",
 *   link: "/news/pictorial-directory-update"
 * }
 */
export function mapNewsToItems(rows = []) {
  return rows.map((r) => {
    const d = new Date(r.publishedAt);
    const date = d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }); // e.g., "Jun 10, 2025"

    return {
      title: r.headline,
      subtitle: r.subhead || '',
      date,
      href: r.link || '#',
    };
  });
}
