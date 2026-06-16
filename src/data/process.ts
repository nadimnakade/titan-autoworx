export type ProcessStep = {
  idx: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  kpis: { label: string; value: string }[];
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    idx: "01",
    title: "INTAKE",
    role: "Discovery",
    duration: "WEEK 1—2",
    description: "Full vehicle audit, customer vision, performance targets, and engineering brief.",
    kpis: [
      { label: "BRIEF", value: "SIGNED" },
      { label: "TARGETS", value: "LOCKED" },
    ],
    outputs: ["Engineering Brief", "CAD Skeleton", "Material Schedule"],
  },
  {
    idx: "02",
    title: "TEARDOWN",
    role: "Disassembly",
    duration: "WEEK 3—4",
    description: "Vehicle is reduced to its rolling chassis. Every fastener is catalogued. Every weakness exposed.",
    kpis: [
      { label: "PARTS", value: "1,240" },
      { label: "REUSE", value: "62%" },
    ],
    outputs: ["Parts Manifest", "Weight Report", "Weakness Map"],
  },
  {
    idx: "03",
    title: "FABRICATION",
    role: "Build",
    duration: "MONTH 2—4",
    description: "Roll cage, engine assembly, driveline, suspension geometry. In-house welding and CNC.",
    kpis: [
      { label: "WELDS", value: "640" },
      { label: "CNC HRS", value: "180" },
    ],
    outputs: ["Chassis Skeleton", "Engine Cell", "Driveline"],
  },
  {
    idx: "04",
    title: "DYNO",
    role: "Calibration",
    duration: "WEEK 12—14",
    description: "Engine mapping, driveline calibration, launch control strategies. Closed-loop refinement.",
    kpis: [
      { label: "MAPS", value: "1,280" },
      { label: "POWER", value: "TARGET+" },
    ],
    outputs: ["Final Tune", "Dyno Sheet", "Thermal Map"],
  },
  {
    idx: "05",
    title: "ASSEMBLY",
    role: "Integration",
    duration: "WEEK 15—18",
    description: "Body panels, interior, wiring looms, and final fitment. Every detail inspected.",
    kpis: [
      { label: "PANELS", value: "ADJ" },
      { label: "GAPS", value: "±0.4MM" },
    ],
    outputs: ["Full Vehicle", "QA Report", "Owner Handover"],
  },
  {
    idx: "06",
    title: "VALIDATION",
    role: "Track",
    duration: "WEEK 19—20",
    description: "Shakedown at the Nordschleife, Spa, and our private circuit. Telemetry-driven iteration.",
    kpis: [
      { label: "LAPS", value: "120" },
      { label: "BRAKE TEMP", value: "NOMINAL" },
    ],
    outputs: ["Final Setup Sheet", "Owner Track Day", "Service Schedule"],
  },
];
