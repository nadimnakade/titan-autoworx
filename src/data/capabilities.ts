export type Capability = {
  id: string;
  idx: string;
  title: string;
  sub: string;
  desc: string;
  stat: { label: string; value: string }[];
  span: string; // tailwind grid classes
  accent: "ember" | "gold" | "steel" | "bone";
  tags: string[];
};

export const capabilities: Capability[] = [
  {
    id: "engine",
    idx: "01",
    title: "Engine Architecture",
    sub: "Forged Performance",
    desc: "Full HEMI, LS, and flat-six builds. Block boring, balancing, custom pistons, ported heads, dry sump systems.",
    stat: [
      { label: "MAX OUTPUT", value: "1,420 HP" },
      { label: "DYNO TUNED", value: "100%" },
    ],
    span: "md:col-span-3 md:row-span-2",
    accent: "ember",
    tags: ["FORGED INTERNALS", "PORTED HEADS", "DRY SUMP"],
  },
  {
    id: "aero",
    idx: "02",
    title: "Aero & Body",
    sub: "Computational Flow",
    desc: "Wind-tunnel validated aero. Carbon panels, widebody conversions, active splitters.",
    stat: [
      { label: "DRAG COEF", value: "0.21" },
      { label: "DOWNFORCE", value: "+340KG" },
    ],
    span: "md:col-span-3 md:row-span-2",
    accent: "steel",
    tags: ["CARBON FIBER", "WIDEBODY", "ACTIVE SPLIT"],
  },
  {
    id: "ecu",
    idx: "03",
    title: "ECU Calibration",
    sub: "Engineered Mapping",
    desc: "Standalone ECUs, custom tunes, flex-fuel strategies, launch control, anti-lag.",
    stat: [
      { label: "MAPS", value: "1,280" },
      { label: "SAMPLE RATE", value: "1kHz" },
    ],
    span: "md:col-span-3 md:row-span-2",
    accent: "gold",
    tags: ["MOTEC", "ECUMASTER", "FLEX FUEL"],
  },
  {
    id: "chassis",
    idx: "04",
    title: "Chassis Dynamics",
    sub: "Geometric Precision",
    desc: "Corner balancing, custom geometry, weld-in roll cages, KW / Öhlins suspension.",
    stat: [
      { label: "RIGIDITY", value: "+62%" },
      { label: "WEIGHT", value: "−180KG" },
    ],
    span: "md:col-span-2 md:row-span-2",
    accent: "bone",
    tags: ["KW V4", "WELD CAGE", "BUSHINGS"],
  },
  {
    id: "interior",
    idx: "05",
    title: "Interior Bespoke",
    sub: "Atelier Leather",
    desc: "Hand-stitched cabins. Alcantara, exposed carbon, machined switchgear.",
    stat: [
      { label: "STITCHES", value: "8,400" },
      { label: "LEATHER", value: "ALCANTARA" },
    ],
    span: "md:col-span-2 md:row-span-2",
    accent: "ember",
    tags: ["ALCANTARA", "CNC SWITCH", "HAND STITCH"],
  },
  {
    id: "track",
    idx: "06",
    title: "Track Validation",
    sub: "Circuit Hardening",
    desc: "End-to-end track validation, telemetry logging, brake bias optimization.",
    stat: [
      { label: "LAP TIME", value: "−3.2S" },
      { label: "TEMPS", value: "NOMINAL" },
    ],
    span: "md:col-span-2 md:row-span-2",
    accent: "gold",
    tags: ["TELEMETRY", "DATA LOG", "BRAKE BIAS"],
  },
];

export const workshopNodes = [
  { id: "design", x: 50, y: 18, label: "DESIGN LOFT", sub: "Concept & CAD" },
  { id: "fab", x: 22, y: 38, label: "FABRICATION", sub: "Tube Bending" },
  { id: "engine", x: 78, y: 36, label: "ENGINE CELL", sub: "Build & Dyno" },
  { id: "paint", x: 16, y: 62, label: "PAINT BOOTH", sub: "Carbon Finish" },
  { id: "interior", x: 50, y: 60, label: "INTERIOR ATELIER", sub: "Hand Stitch" },
  { id: "aero", x: 84, y: 60, label: "AERO LAB", sub: "Wind Tunnel" },
  { id: "dyno", x: 28, y: 84, label: "DYNO SUITE", sub: "1,400 HP" },
  { id: "track", x: 72, y: 84, label: "TRACK PADDOCK", sub: "Validation" },
];
