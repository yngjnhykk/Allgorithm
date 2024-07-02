const shipTable = [
    { type: "Bulk Carrier", useMetric: "DWT", capacityRanges: [
        { min: 279000, max: Infinity, a: 279000, c: 0.622, exp: [0.86, 0.94, 1.06, 1.18] },
        { min: 0, max: 278999, a: 4745, c: 0.622, exp: [0.86, 0.94, 1.06, 1.18] }
    ]},
    { type: "Gas Carrier", useMetric: "DWT", capacityRanges: [
        { min: 65000, max: Infinity, a: 14016, c: 2.071, exp: [0.85, 0.95, 1.06, 1.25] },
        { min: 0, max: 64999, a: 8104, c: 0.639, exp: [0.85, 0.95, 1.06, 1.25] }
    ]},
    { type: "Tanker", useMetric: "DWT", capacityRanges: [
        { min: 0, max: Infinity, a: 5247, c: 0.610, exp: [0.82, 0.93, 1.08, 1.28] }
    ]},
    { type: "Container Ship", useMetric: "DWT", capacityRanges: [
        { min: 0, max: Infinity, a: 1984, c: 0.489, exp: [0.83, 0.91, 1.12, 1.19] }
    ]},
    { type: "General Cargo Ship", useMetric: "DWT", capacityRanges: [
        { min: 20000, max: Infinity, a: 31948, c: 0.792, exp: [0.83, 0.94, 1.06, 1.19] },
        { min: 0, max: 19999, a: 588, c: 0.389, exp: [0.83, 0.94, 1.06, 1.19] }
    ]},
    { type: "Refrigerated Cargo Carrier", useMetric: "DWT", capacityRanges: [
        { min: 0, max: Infinity, a: 4600, c: 0.557, exp: [0.78, 0.91, 1.07, 1.20] }
    ]},
    { type: "Combination Carrier", useMetric: "DWT", capacityRanges: [
        { min: 0, max: Infinity, a: 40853, c: 0.812, exp: [0.87, 0.96, 1.06, 1.14] }
    ]},
    { type: "LNG Carrier", useMetric: "DWT", capacityRanges: [
        { min: 100000, max: Infinity, a: 9827, c: 0.000, exp: [0.89, 0.98, 1.06, 1.13] },
        { min: 65000, max: 99999, a: 1448e+12, c: 2.673, exp: [0.89, 0.98, 1.06, 1.13] },
        { min: 0, max: 64999, a: 65000, c: 2.673, exp: [0.89, 0.98, 1.06, 1.13] }
    ]},
    { type: "Ro-Ro Cargo Ship (Vehicle Carrier)", useMetric: "GT", capacityRanges: [
        { min: 0, max: Infinity, a: 5739, c: 0.631, exp: [0.78, 0.92, 1.10, 1.37] }
    ]},
    { type: "Ro-Ro Cargo Ship", useMetric: "DWT", capacityRanges: [
        { min: 0, max: Infinity, a: 10952, c: 0.637, exp: [0.66, 0.90, 1.11, 1.37] }
    ]},
    { type: "Ro-Ro Passenger Ship", useMetric: "GT", capacityRanges: [
        { min: 0, max: Infinity, a: 7540, c: 0.587, exp: [0.72, 0.90, 1.09, 1.41] }
    ]},
    { type: "Cruise Passenger Ship", useMetric: "GT", capacityRanges: [
        { min: 0, max: Infinity, a: 930, c: 0.383, exp: [0.87, 0.95, 1.06, 1.16] }
    ]}
];

const findShipInfo = ({type, GT, DWT}) => {
    const ship = shipTable.find(ship => ship.type === type);
    if (!ship) return { a: null, c: null };

    const metricValue = ship.useMetric === "DWT" ? DWT : GT;
    const range = ship.capacityRanges.find(range => metricValue >= range.min && metricValue <= range.max);
    return range ? { a: range.a, c: range.c, useMetric: ship.useMetric } : { a: null, c: null, useMetric: null };
};


const { a, c, useMetric } = findShipInfo({ type: data.ship_type, GT: data.gross_tonnage, DWT: data.summer_load_dwt });

const capacity = useMetric === "DWT" ? data.summer_load_dwt : data.gross_tonnage;
const requiredCII = ((100 - data.reduction_factor) / 100 * a * Math.pow(capacity, -c)).toFixed(2);

const fuelData = {
    "diesel_gas_oil_consumption": { CF: 3.206 },
    "light_fuel_oil_consumption": { CF: 3.151 },
    "heavy_fuel_oil_consumption": { CF: 3.114 },
    "lpg_propane_consumption": { CF: 3.000 },
    "lpg_butane_consumption": { CF: 3.030 },
    "lpg_consumption": { CF: 2.750 },
    "methanol_consumption": { CF: 1.375 },
    "ethanol_consumption": { CF: 1.913 }
};

const calculateTotalCO2Emissions = (fuels) => {
    let totalEmissions = 0;
    for (const [fuelKey, amount] of Object.entries(fuels)) {
        const fuelInfo = fuelData[fuelKey];
        if (fuelInfo) {
            const emissions = fuelInfo.CF * amount;
            totalEmissions += emissions;
        } else {

            console.error('error');
        }
    }
    return totalEmissions;
};


const totalEmissions = calculateTotalCO2Emissions(data.fuels) * 1000000;

const calculateCapacity = (shipInfo, totalDistance) => {
    const ship = shipTable.find(s => s.type === shipInfo.ship_type);
    if (!ship) {
        console.error('Ship type not found');
        return null;
    }

    const metric = ship.useMetric === "GT" ? shipInfo.gross_tonnage : shipInfo.summer_load_dwt;
    return metric * totalDistance;
};
const resultW = calculateCapacity(data, data.total_distance_travelled);
const attainedCII = (totalEmissions / resultW).toFixed(2);

const calculateCIRating = (shipType, capacity, requiredCII) => {
    const ship = shipTable.find(s => s.type === shipType);
    if (!ship) {
        console.error('Ship type not found');
        return null;
    }

    const capacityRange = ship.capacityRanges.find(range => capacity >= range.min && capacity <= range.max);
    if (!capacityRange) {
        console.error('Capacity range not found for this ship type');
        return null;
    }

    const ratings = {
        A: Math.round(requiredCII * capacityRange.exp[0] * 100) / 100,
        B: Math.round(requiredCII * capacityRange.exp[1] * 100) / 100,
        C: Number(requiredCII),
        D: Math.round(requiredCII * capacityRange.exp[2] * 100) / 100,
        E: Math.round(requiredCII * capacityRange.exp[3] * 100) / 100
    };

    return ratings;
};

const determineCIRating = (shipType, capacity, requiredCII, attainedCII) => {
    const ratings = calculateCIRating(shipType, capacity, requiredCII);
    if (!ratings) {
        return 'Unable to determine rating: Ship type or capacity range not found.';
    }

    if (attainedCII <= ratings.A) {
        return 'A';
    } else if (attainedCII <= ratings.B) {
        return 'B';
    } else if (attainedCII <= ratings.C) {
        return 'C';
    } else if (attainedCII <= ratings.D) {
        return 'D';
    } else {
        return 'E';
    }
};


const rating = calculateCIRating(data.ship_type, capacity, requiredCII);
const grade = determineCIRating(data.ship_type, capacity, requiredCII, attainedCII);

// return {
//           Required_CII : requiredCII,
//           Attained_CII : attainedCII,
//           Grade : grade,
// };