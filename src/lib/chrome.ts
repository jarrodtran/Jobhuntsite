/** Browser / PWA theme-color — matches `--bg` paper. */
export const THEME_COLOR = "#F4F4F5";

/** Next.js `viewport` export: theme-color plus cover so safe-area insets apply. */
export const viewportChrome = {
  themeColor: THEME_COLOR,
  viewportFit: "cover",
} as const;
