/* eslint-disable no-useless-escape */
const path = require("path");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const { light, dark } = require("mx-design-tokens");

function simplifyMXColor(colorMode, key) {
  return Object.keys(colorMode.Color)
    .filter((k) => k.includes(key))
    .reduce((s, v) => {
      const num = v.match(/\d+/g);

      s[num] = light.Color[v];
      return s;
    }, {});
}

module.exports = {
  darkMode: "class",
  content: [
    "content/**/*.md",
    path.join(__dirname, "components/**/*.vue"),
    path.join(__dirname, "layouts/**/*.vue"),
    path.join(__dirname, "pages/**/*.vue"),
    path.join(__dirname, "plugins/**/*.js"),
    "nuxt.config.js",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            b: {
              color: theme('colors.neutral.900'),
              fontWeight: 600
            },

            a: {
              color: theme("colors.primary.500"),
            },

            h2: {
              paddingBottom: theme("padding.2"),
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.gray.200"),
            },
            h3: {
              color: theme("colors.neutral.900"),
              paddingBottom: theme("padding.2"),
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.gray.200"),
            },
            blockquote: {
              fontWeight: "400",
              color: theme("colors.gray.600"),
              fontStyle: "normal",
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            "blockquote p:first-of-type::before": {
              content: "",
            },
            "blockquote p:last-of-type::after": {
              content: "",
            },
            code: {
              fontWeight: "400",
              backgroundColor: theme("colors.gray.100"),
              padding: theme("padding.1"),
              borderWidth: 1,
              borderColor: theme("colors.gray.200"),
              borderRadius: theme("borderRadius.default"),
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            "h3 code": {
              fontWeight: "600",
            },
            "pre code": {
              fontFamily: "DM Mono",
            },
            "a code": {
              color: theme("colors.primary.500"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.neutral[300]"),
            '[class~="lead"]': {
              color: theme("colors.neutral[300]"),
            },
            a: {
              color: theme("colors.primary[500]"),
            },
            "ol > li::before": {
              color: theme("colors.neutral[400]"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.neutral[600]"),
            },
            hr: {
              borderColor: theme("colors.neutral[700]"),
            },
            blockquote: {
              color: theme("colors.neutral[400]"),
              borderLeftColor: theme("colors.neutral[700]"),
            },
            h1: {
              color: theme("colors.neutral[100]"),
            },
            h2: {
              color: theme("colors.neutral[100]"),
              borderBottomColor: theme("colors.neutral[800]"),
            },
            h3: {
              color: theme("colors.blue.100"),
              borderBottomColor: theme("colors.neutral[800]"),
            },
            h4: {
              color: theme("colors.neutral[100]"),
            },
            "figure figcaption": {
              color: theme("colors.neutral[400]"),
            },
            code: {
              color: theme("colors.neutral[100]"),
              backgroundColor: theme("colors.neutral[800]"),
              borderWidth: 0,
            },
            "a code": {
              color: theme("colors.primary[500]"),
            },
            thead: {
              color: theme("colors.neutral.100"),
              borderBottomColor: theme("colors.neutral[600]"),
            },
            th: {
              color: theme("colors.neutral.100"),
              borderBottomColor: theme("colors.neutral[600]"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.neutral[700]"),
            },
          },
        },
      }),
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        mono: ["DM Mono", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: simplifyMXColor(dark, "Primary"),
        neutral: simplifyMXColor(light, "Neutral"),
      },
    },
  },

  corePlugins: {
    container: false,
  },

  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addVariant, e }) {
      addVariant("dark-hover", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark-mode .${e(`dark-hover${separator}${className}`)}:hover`;
        });
      });

      addVariant("dark-focus", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark-mode .${e(`dark-focus${separator}${className}`)}:focus`;
        });
      });
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "1440px",
          margin: "0 auto",
        },
        ".content-container": {
          maxWidth: "682px",
          margin: "0 auto",
        },
      });
    }),
    // Add ability to add print styles
    require('tailwindcss-print-styles')
  ],

  variants: {
    margin: ["responsive", "last", "print"],
    padding: ["responsive", "hover", "print"],
    backgroundColor: ["responsive", "hover", "focus", "dark", "print"],
    textColor: ["responsive", "hover", "focus", "dark", "print"],
    borderColor: ["responsive", "hover", "focus", "dark", "print"],
    borderWidth: ["responsive", "first", "last", "print"],
    typography: ["responsive", "dark", "print"],
    display: ["print"]
  },
};
