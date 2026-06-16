export type Build = {
  id: string;
  idx: string;
  codename: string;
  chassis: string;
  year: number;
  power: string;
  torque: string;
  weight: string;
  zeroSixty: string;
  topSpeed: string;
  description: string;
  specs: { k: string; v: string }[];
  story: string;
  hue: string; // gradient stop
  tag: string;
};

export const builds: Build[] = [
  {
    id: "rhea",
    idx: "01",
    codename: "RHEA",
    chassis: "PORSCHE 911 — 993",
    year: 1996,
    power: "720 HP",
    torque: "820 NM",
    weight: "1,180 KG",
    zeroSixty: "2.6 S",
    topSpeed: "340 KM/H",
    description: "An air-cooled icon reimagined as a track-dominant weapon.",
    specs: [
      { k: "ENGINE", v: "3.8L Twin-Plug Flat-Six" },
      { k: "TRANSMISSION", v: "6-Speed Sequential" },
      { k: "AERO", v: "Carbon GT3 R Widebody" },
      { k: "INTERIOR", v: "Alcantara + CNC Switchgear" },
    ],
    story: "RHEA was born from a stripped 993 cabriolet. The flat-six was bored, balanced, and mated to a sequential box. We kept the soul of the air-cooled era and gave it the bite of a modern GT3.",
    hue: "from-titan-ember via-titan-ember/30 to-titan-void",
    tag: "FLAGSHIP BUILD",
  },
  {
    id: "nyx",
    idx: "02",
    codename: "NYX",
    chassis: "NISSAN GT-R — R35",
    year: 2012,
    power: "1,250 HP",
    torque: "1,420 NM",
    weight: "1,540 KG",
    zeroSixty: "2.1 S",
    topSpeed: "388 KM/H",
    description: "The dark side of the R35. A rolling symphony of boost.",
    specs: [
      { k: "ENGINE", v: "VR38DETT Built Block" },
      { k: "TURBOS", v: "Garrett G35-900 Twins" },
      { k: "DRIVETRAIN", v: "AMS Race DCT" },
      { k: "FUEL", v: "E85 Flex-Fuel" },
    ],
    story: "NYX was a customer's vision: the fastest street-legal R35 in EMEA. We delivered. Twin turbos, E85 mapping, and a chassis geometry honed on the Nordschleife.",
    hue: "from-titan-gold via-titan-ember/30 to-titan-void",
    tag: "QUARTER-MILE KING",
  },
  {
    id: "atlas",
    idx: "03",
    codename: "ATLAS",
    chassis: "LAMBORGHINI HURACÁN",
    year: 2018,
    power: "880 HP",
    torque: "760 NM",
    weight: "1,310 KG",
    zeroSixty: "2.4 S",
    topSpeed: "355 KM/H",
    description: "Carbon obsession. A Huracán disassembled to its essence.",
    specs: [
      { k: "ENGINE", v: "5.2L V10 — Stock Stroke" },
      { k: "AERO", v: "Custom Carbon Splitter" },
      { k: "EXHAUST", v: "Titanium Inconel" },
      { k: "TIRES", v: "Toyo R888 Semi-Slick" },
    ],
    story: "ATLAS took 18 months. Every panel was templated in CAD, then laid in prepreg carbon. The V10 howls through hand-fabricated Inconel — a sound you feel in your chest.",
    hue: "from-titan-bone via-titan-steel/30 to-titan-void",
    tag: "ATELIER CARBON",
  },
  {
    id: "orion",
    idx: "04",
    codename: "ORION",
    chassis: "BMW M3 — E92",
    year: 2011,
    power: "680 HP",
    torque: "640 NM",
    weight: "1,420 KG",
    zeroSixty: "3.0 S",
    topSpeed: "320 KM/H",
    description: "S54 reborn. A naturally aspirated masterpiece.",
    specs: [
      { k: "ENGINE", v: "4.4L S65 Stroker" },
      { k: "INTAKE", v: "Individual Throttle Bodies" },
      { k: "DIFFERENTIAL", v: "OS Giken Twin Plate" },
      { k: "SUSPENSION", v: "KW V4 Clubsport" },
    ],
    story: "ORION was our love letter to the high-revving S54. We stroked the V8 to 4.4L, fitted ITBs, and set the rev limiter to 8,400 RPM. The result: an analog missile.",
    hue: "from-titan-ember via-titan-gold/30 to-titan-void",
    tag: "ANALOG ARMAGEDDON",
  },
];
