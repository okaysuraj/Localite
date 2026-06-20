/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "primary-fixed": "#e5e2e1",
        "surface-bright": "#393939",
        "surface-dim": "#131313",
        "on-surface": "#e5e2e1",
        "on-tertiary-container": "#668100",
        "tertiary-container": "#040600",
        "text-muted": "#A3A3A3",
        "inverse-on-surface": "#313030",
        "secondary": "#d3fbff",
        "background": "#131313",
        "on-primary-fixed-variant": "#474646",
        "surface-container-highest": "#353534",
        "on-surface-variant": "#c4c7c7",
        "on-secondary-fixed-variant": "#004f54",
        "secondary-fixed": "#7df4ff",
        "inverse-surface": "#e5e2e1",
        "surface-container-low": "#1c1b1b",
        "lime-vibe": "#CCFF00",
        "inverse-primary": "#5f5e5e",
        "secondary-container": "#00eefc",
        "tertiary": "#abd600",
        "electric-blue": "#00F0FF",
        "on-secondary": "#00363a",
        "tertiary-fixed": "#c3f400",
        "error-container": "#93000a",
        "secondary-fixed-dim": "#00dbe9",
        "on-secondary-fixed": "#002022",
        "surface-variant": "#353534",
        "surface": "#131313",
        "on-primary-fixed": "#1c1b1b",
        "on-primary": "#313030",
        "on-error": "#690005",
        "on-tertiary-fixed": "#161e00",
        "outline": "#8e9192",
        "on-error-container": "#ffdad6",
        "on-primary-container": "#797777",
        "surface-container-lowest": "#0e0e0e",
        "tertiary-fixed-dim": "#abd600",
        "primary-container": "#050505",
        "on-tertiary-fixed-variant": "#3c4d00",
        "surface-container-high": "#2a2a2a",
        "surface-tint": "#c9c6c5",
        "on-background": "#e5e2e1",
        "surface-container": "#201f1f",
        "on-tertiary": "#283500",
        "primary": "#c9c6c5",
        "error": "#ffb4ab",
        "on-secondary-container": "#00686f",
        "primary-fixed-dim": "#c9c6c5",
        "outline-variant": "#444748",
        "surface-dark": "#0A0A0A"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "margin-desktop": "64px",
        "section-gap": "120px",
        "base": "8px",
        "gutter": "24px",
        "margin-mobile": "20px",
        "container-max": "1440px"
      },
      "fontFamily": {
        "body-md": ["inter"],
        "headline-lg": ["anybody"],
        "display-lg-mobile": ["anybody"],
        "label-mono": ["jetbrainsMono"],
        "headline-md": ["anybody"],
        "label-caps": ["jetbrainsMono"],
        "display-lg": ["anybody"],
        "body-lg": ["inter"]
      },
      "fontSize": {
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "display-lg-mobile": ["48px", { "lineHeight": "52px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "label-mono": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500" }],
        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
        "label-caps": ["10px", { "lineHeight": "12px", "letterSpacing": "0.2em", "fontWeight": "700" }],
        "display-lg": ["80px", { "lineHeight": "88px", "letterSpacing": "-0.04em", "fontWeight": "800" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
