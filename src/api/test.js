export const ciiTestData = {
  name: "CII",
  info: "기업의 탄소 배출 강도를 평가하고 비교하는 데 사용되는 방법론",
  inputs: [
    {
      name: "Ship Type",
      detail: {
        title: "Ship Information",
        parameter_name: "ship_type",
        type: "select",
        options: [
          "Bulk Carrier",
          "Gas Carrier",
          "Tanker",
          "Container Ship",
          "Refrigerated Cargo Carrier",
          "Combination Carrier",
          "LNG Carrier",
          "Ro-Ro Cargo Ship (Vehicle Carrier)",
          "Ro-Ro Cargo Ship",
          "Ro-Ro Passenger Ship",
          "Cruise Passenger Ship",
        ],
        example: "Bulk Carrier",
      },
    },
    {
      name: "DWT at Summer Load Draught",
      detail: {
        title: "Ship Information",
        parameter_name: "dwt",
        type: "input",
        example: 69999,
      },
    },
    {
      name: "Gross Tonnage",
      detail: {
        title: "Ship Information",
        parameter_name: "gt",
        type: "input",
        example: 51164,
      },
    },
    {
      name: "Fuels",
      detail: {
        title: "Fuel Information",
        parameter_name: "fuels",
        type: "object",
        options: [
          {
            name: "Diesel/Gas Oil",
            parameter_name: "diesel",
            value: 26,
          },
          {
            name: "Heavy Fuel Oil",
            parameter_name: "hfo",
            value: 0,
          },
          {
            name: "Light Fuel Oil",
            parameter_name: "lfo",
            value: 5693,
          },
          {
            name: "LPG Propane",
            parameter_name: "lpg-p",
            value: 0,
          },
          {
            name: "LPG Butane",
            parameter_name: "lpg-b",
            value: 0,
          },
          {
            name: "Liquefied Natural Gas",
            parameter_name: "lng",
            value: 0,
          },
          {
            name: "Methanol",
            parameter_name: "methanol",
            value: 0,
          },
          {
            name: "Ethanol",
            parameter_name: "ethanol",
            value: 0,
          },
        ],
        example: "",
      },
    },
    {
      name: "Total Distance Traveled",
      detail: {
        title: "Voyage Information",
        parameter_name: "distance",
        type: "input",
        example: 61523,
      },
    },
    {
      name: "Reduction Factor",
      detail: {
        title: "Etc",
        parameter_name: "reduction_factor",
        type: "select",
        options: [
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        example: "2024",
      },
    },
  ],
  outputs: [
    {
      name: "Required_CII",
      parameter_name: "requiredCII",
      type: "text",
      options: [""],
    },
    {
      name: "Attained_CII",
      parameter_name: "attainedCII",
      type: "text",
      options: [""],
    },
    {
      name: "Grade",
      parameter_name: "grade",
      type: "text",
      options: [""],
    },
  ],
  content: `const shipTable = [
  {
    type: "Bulk Carrier",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 279000,
        max: Infinity,
        a: 279000,
        c: 0.622,
        exp: [0.86, 0.94, 1.06, 1.18],
      },
      { min: 0, max: 278999, a: 4745, c: 0.622, exp: [0.86, 0.94, 1.06, 1.18] },
    ],
  },
  {
    type: "Gas Carrier",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 65000,
        max: Infinity,
        a: 14016,
        c: 2.071,
        exp: [0.85, 0.95, 1.06, 1.25],
      },
      { min: 0, max: 64999, a: 8104, c: 0.639, exp: [0.85, 0.95, 1.06, 1.25] },
    ],
  },
  {
    type: "Tanker",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 5247,
        c: 0.61,
        exp: [0.82, 0.93, 1.08, 1.28],
      },
    ],
  },
  {
    type: "Container Ship",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 1984,
        c: 0.489,
        exp: [0.83, 0.91, 1.12, 1.19],
      },
    ],
  },
  {
    type: "General Cargo Ship",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 20000,
        max: Infinity,
        a: 31948,
        c: 0.792,
        exp: [0.83, 0.94, 1.06, 1.19],
      },
      { min: 0, max: 19999, a: 588, c: 0.389, exp: [0.83, 0.94, 1.06, 1.19] },
    ],
  },
  {
    type: "Refrigerated Cargo Carrier",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 4600,
        c: 0.557,
        exp: [0.78, 0.91, 1.07, 1.2],
      },
    ],
  },
  {
    type: "Combination Carrier",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 40853,
        c: 0.812,
        exp: [0.87, 0.96, 1.06, 1.14],
      },
    ],
  },
  {
    type: "LNG Carrier",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 100000,
        max: Infinity,
        a: 9827,
        c: 0.0,
        exp: [0.89, 0.98, 1.06, 1.13],
      },
      {
        min: 65000,
        max: 99999,
        a: 1448e12,
        c: 2.673,
        exp: [0.89, 0.98, 1.06, 1.13],
      },
      { min: 0, max: 64999, a: 65000, c: 2.673, exp: [0.89, 0.98, 1.06, 1.13] },
    ],
  },
  {
    type: "Ro-Ro Cargo Ship (Vehicle Carrier)",
    useMetric: "GT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 5739,
        c: 0.631,
        exp: [0.78, 0.92, 1.1, 1.37],
      },
    ],
  },
  {
    type: "Ro-Ro Cargo Ship",
    useMetric: "DWT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 10952,
        c: 0.637,
        exp: [0.66, 0.9, 1.11, 1.37],
      },
    ],
  },
  {
    type: "Ro-Ro Passenger Ship",
    useMetric: "GT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 7540,
        c: 0.587,
        exp: [0.72, 0.9, 1.09, 1.41],
      },
    ],
  },
  {
    type: "Cruise Passenger Ship",
    useMetric: "GT",
    capacityRanges: [
      {
        min: 0,
        max: Infinity,
        a: 930,
        c: 0.383,
        exp: [0.87, 0.95, 1.06, 1.16],
      },
    ],
  },
];

const findShipInfo = ({ type, GT, DWT }) => {
  const ship = shipTable.find((ship) => ship.type === type);
  if (!ship) return { a: null, c: null };

  const metricValue = ship.useMetric === "DWT" ? DWT : GT;
  const range = ship.capacityRanges.find(
    (range) => metricValue >= range.min && metricValue <= range.max
  );
  return range
    ? { a: range.a, c: range.c, useMetric: ship.useMetric }
    : { a: null, c: null, useMetric: null };
};

const { a, c, useMetric } = findShipInfo({
  type: data.ship_type,
  GT: data.gt,
  DWT: data.dwt,
});

const capacity = useMetric === "DWT" ? data.dwt : data.gt;
let reduction_factor = 0;
switch (data.reduction_factor) {
  case "2019":
    reduction_factor = 0;
    break;
  case "2020":
    reduction_factor = 1;
    break;
  case "2021":
    reduction_factor = 2;
    break;
  case "2022":
    reduction_factor = 3;
    break;
  case "2023":
    reduction_factor = 5;
    break;
  case "2024":
    reduction_factor = 7;
    break;
  case "2025":
    reduction_factor = 9;
    break;
  case "2026":
    reduction_factor = 11;
    break;
}
const requiredCII = (
  ((100 - reduction_factor) / 100) *
  a *
  Math.pow(capacity, -c)
).toFixed(2);

const fuelData = {
  diesel: { CF: 3.206 },
  lfo: { CF: 3.151 },
  hfo: { CF: 3.114 },
  "lpg-p": { CF: 3.0 },
  "lpg-b": { CF: 3.03 },
  lng: { CF: 2.75 },
  methanol: { CF: 1.375 },
  ethanol: { CF: 1.913 },
};

const calculateTotalCO2Emissions = (fuels) => {
  let totalEmissions = 0;
  for (const [fuelKey, amount] of Object.entries(fuels)) {
    const fuelInfo = fuelData[fuelKey];
    if (fuelInfo) {
      const emissions = fuelInfo.CF * amount;
      totalEmissions += emissions;
    } else {
      console.error("error");
    }
  }
  return totalEmissions;
};

const totalEmissions = calculateTotalCO2Emissions(data.fuels) * 1000000;

const calculateCapacity = (shipInfo, totalDistance) => {
  const ship = shipTable.find((s) => s.type === shipInfo.ship_type);
  if (!ship) {
    console.error("Ship type not found");
    return null;
  }

  const metric = ship.useMetric === "GT" ? shipInfo.gt : shipInfo.dwt;
  return metric * totalDistance;
};
const resultW = calculateCapacity(data, data.distance);
const attainedCII = (totalEmissions / resultW).toFixed(2);

const calculateCIRating = (shipType, capacity, requiredCII) => {
  const ship = shipTable.find((s) => s.type === shipType);
  if (!ship) {
    console.error("Ship type not found");
    return null;
  }

  const capacityRange = ship.capacityRanges.find(
    (range) => capacity >= range.min && capacity <= range.max
  );
  if (!capacityRange) {
    console.error("Capacity range not found for this ship type");
    return null;
  }

  const ratings = {
    A: Math.round(requiredCII * capacityRange.exp[0] * 100) / 100,
    B: Math.round(requiredCII * capacityRange.exp[1] * 100) / 100,
    C: Number(requiredCII),
    D: Math.round(requiredCII * capacityRange.exp[2] * 100) / 100,
    E: Math.round(requiredCII * capacityRange.exp[3] * 100) / 100,
  };

  return ratings;
};

const determineCIRating = (shipType, capacity, requiredCII, attainedCII) => {
  const ratings = calculateCIRating(shipType, capacity, requiredCII);
  if (!ratings) {
    return "Unable to determine rating: Ship type or capacity range not found.";
  }

  if (attainedCII <= ratings.A) {
    return "A";
  } else if (attainedCII <= ratings.B) {
    return "B";
  } else if (attainedCII <= ratings.C) {
    return "C";
  } else if (attainedCII <= ratings.D) {
    return "D";
  } else {
    return "E";
  }
};

const rating = calculateCIRating(data.ship_type, capacity, requiredCII);
const grade = determineCIRating(
  data.ship_type,
  capacity,
  requiredCII,
  attainedCII
);
`,
};

const data = {
  distance: 61523,
  dwt: 69999,
  fuels: { diesel: 26, lfo: 5693 },
  gt: 51164,
  reduction_factor: "2024",
  ship_type: "Bulk Carrier",
};
