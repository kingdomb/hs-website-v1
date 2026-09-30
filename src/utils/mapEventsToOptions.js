// src/utils/mapEventsToOptions.js

/**
 * Transform DB worship rows into { icon, title, description, link }.
 *
 * Expected DB row shape (example):
 * {
 *   id: "wshp_123",
 *   name: "Sunday Morning Gathering",
 *   details: "We gather every Sunday at 10:50am in the Worship Center...",
 *   url: "https://example.com/events/sunday",
 *   type: "in-person" | "online" | "other"
 * }
 */
export function mapEventsToOptions(rows = []) {
  return rows.map((r) => {
    let icon = 'event';
    if (r.type === 'in-person') icon = 'place';
    else if (r.type === 'online') icon = 'computer';

    return {
      icon,
      title: r.name,
      description: r.details,
      link: r.url || '#',
    };
  });
}
