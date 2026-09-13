/** Browser / PWA theme-color — matches `--bg` paper. */
export const THEME_COLOR = "#F5F0E6";

/** Next.js `viewport` export: theme-color plus cover so safe-area insets apply. */
export const viewportChrome = {
  themeColor: THEME_COLOR,
  viewportFit: "cover",
} as const;

/** Height of the fixed chrome: the desktop ScrollRail and the mobile Resume bar. */
export const CHROME_HEIGHT_PX = 48;

/**
 * Scroll margin for anything an in-page anchor can target — sections and
 * experience rows. 2rem below 640, where nothing is fixed at the top; 5rem from
 * 640 up, where the ScrollRail is, so a recruiter who clicks "Experience" or a
 * Where-I-fit link does not land with the heading tucked under the rail.
 */
export const ANCHOR_OFFSET_CLASS = "scroll-mt-8 sm:scroll-mt-20";
