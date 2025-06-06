import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for our nude/neutral palette
        sand: {
          50: "#faf6f0",
          100: "#f0e9df",
          200: "#e2d5c3",
          300: "#d3bea3",
          400: "#c4a683",
          500: "#b58e63",
          600: "#a47953",
          700: "#8c6548",
          800: "#735241",
          900: "#5e4437",
          950: "#2e211a",
        },
        clay: {
          50: "#f8f5f2",
          100: "#f0e9e4",
          200: "#e1d3ca",
          300: "#d0b9aa",
          400: "#bb9a85",
          500: "#a98269",
          600: "#9a7057",
          700: "#805c48",
          800: "#6a4c3e",
          900: "#573f35",
          950: "#2e201b",
        },
        olive: {
          50: "#f8f9f1",
          100: "#eef0df",
          200: "#dde3c0",
          300: "#c6d097",
          400: "#aeba6c",
          500: "#94a14a",
          600: "#758138",
          700: "#5a652f",
          800: "#49512a",
          900: "#3d4426",
          950: "#1f2512",
        },
        stone: {
          50: "#f7f7f6",
          100: "#e5e5e3",
          200: "#d0d0cc",
          300: "#b1b1ac",
          400: "#92928c",
          500: "#797974",
          600: "#63635f",
          700: "#515150",
          800: "#444443",
          900: "#3a3a39",
          950: "#232322",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

