/**
 * The one card treatment on the page: white surface, 1px hairline, a single
 * 1px shadow line, 0.5rem radius (tokens in globals.css). Used by the $260M
 * hero figure and the open experience panel — nothing else gets a surface.
 */
export const cardClass =
  "rounded-card border border-hairline bg-surface shadow-card";

/**
 * Under 640px the card runs edge to edge: gutter negated, side borders and
 * radius dropped so the hairlines read as rules across the page.
 */
export const bleedCardClass =
  "-mx-5 rounded-none border-x-0 sm:mx-0 sm:rounded-card sm:border-x";
