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
        "surface-container-highest": "#e4e2e2",
        "surface-bright": "#fbf9f8",
        "on-tertiary-fixed": "#1b1c15",
        "on-secondary-fixed": "#261900",
        "inverse-surface": "#303030",
        "tertiary-fixed-dim": "#c7c7bc",
        "primary-fixed": "#d6e3ff",
        "surface-variant": "#e4e2e2",
        "secondary-fixed-dim": "#e9c176",
        "error-container": "#ffdad6",
        "on-surface": "#1b1c1c",
        "error": "#ba1a1a",
        "secondary": "#775a19",
        "surface-container-low": "#f5f3f3",
        "on-surface-variant": "#44474d",
        "on-primary-fixed": "#0d1c32",
        "outline": "#75777e",
        "on-error": "#ffffff",
        "surface-dim": "#dbd9d9",
        "outline-variant": "#c5c6cd",
        "primary-container": "#0d1c32",
        "on-tertiary-fixed-variant": "#46473f",
        "tertiary-fixed": "#e4e3d7",
        "on-error-container": "#93000a",
        "on-secondary-container": "#785a1a",
        "secondary-container": "#fed488",
        "primary-fixed-dim": "#b9c7e4",
        "on-secondary-fixed-variant": "#5d4201",
        "on-primary-fixed-variant": "#39475f",
        "tertiary-container": "#1b1c15",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#76849f",
        "on-background": "#1b1c1c",
        "inverse-primary": "#b9c7e4",
        "surface-container": "#efeded",
        "surface-container-high": "#eae8e7",
        "secondary-fixed": "#ffdea5",
        "background": "#fbf9f8",
        "on-tertiary-container": "#84847b",
        "tertiary": "#000000",
        "on-primary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface": "#fbf9f8",
        "on-secondary": "#ffffff",
        "inverse-on-surface": "#f2f0f0",
        "surface-tint": "#515f78",
        "primary": "#000000",
        "brand-navy": "#0A192F"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "stack-md": "24px",
        "stack-lg": "48px",
        "gutter": "16px",
        "container-margin": "24px",
        "unit": "8px",
        "stack-sm": "8px"
      },
      "fontFamily": {
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "label-caps": ["Plus Jakarta Sans", "sans-serif"],
        "display-lg-mobile": ["Playfair Display", "serif"],
        "headline-sm": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "display-lg": ["Playfair Display", "serif"]
      },
      "fontSize": {
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700"}],
        "display-lg-mobile": ["36px", {"lineHeight": "42px", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "headline-md": ["32px", {"lineHeight": "40px", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
