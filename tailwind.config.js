/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        titan: {
          void: "#0A0D12",
          carbon: "#13181F",
          ember: "#C8312A",
          forge: "#E8453C",
          steel: "#AAB2BD",
          bone: "#E8E5DD",
          gold: "#F2C14E",
        },
      },
      fontFamily: {
        display: ["'Teko'", "system-ui", "sans-serif"],
        sans: ["'Sora'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "scan-line": "scan-line 4s linear infinite",
        "noise-shift": "noise-shift 8s steps(10) infinite",
        flicker: "flicker 4s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(30px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "noise-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        flicker: {
          "0%, 18%, 22%, 25%, 53%, 57%, 100%": { opacity: "1" },
          "20%, 24%, 55%": { opacity: "0.4" },
        },
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(to bottom, transparent, #0A0D12 90%)",
        "radial-fade":
          "radial-gradient(ellipse at center, transparent 0%, #0A0D12 70%)",
        "ember-glow":
          "radial-gradient(circle at 50% 50%, rgba(232, 69, 60, 0.4), transparent 70%)",
      },
    },
  },
  plugins: [],
};
