const inputs = [
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
      example: 0,
    },
  },
  {
    name: "Gross Tonnage",
    detail: {
      title: "Ship Information",
      parameter_name: "gt",
      type: "input",
      example: 0,
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
          value: 0,
        },
        {
          name: "Heavy Fuel Oil",
          parameter_name: "hfo",
          value: 0,
        },
        {
          name: "Light Fuel Oil",
          parameter_name: "lfo",
          value: 0,
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
      example: 0,
    },
  },
  {
    name: "Reduction Factor",
    detail: {
      title: "Etc",
      parameter_name: "reduction_factor",
      type: "select",
      options: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
      example: "",
    },
  },
];
