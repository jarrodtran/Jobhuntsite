/** Keep 150ms height/translate; snap when prefers-reduced-motion: reduce. */
export function withReducedMotionSnap(animatedClass: string): string {
  return `${animatedClass} motion-reduce:transition-none`;
}
