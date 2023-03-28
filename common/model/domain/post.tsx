export enum ActionFlat {
  SELL = "SELL",
  RENT = "RENT",
  NONE = "NONE",
  BUY = "BUY",
}

export interface Budget {
  budget: string;
  key: string;
}
export const BuyFlatBudgets = [
  { budget: "Till 30 L", key: "TILL_30L" },
  { budget: "30 - 50 L", key: "TILL_50L" },
  { budget: "50 - 80 L", key: "TILL_80L" },
  { budget: "Above 80 L", key: "ABOVE_80L" },
];
export const RentFlatBudgets = [
  { budget: "Till 15,000", key: "TILL_15K" },
  { budget: "15 - 25,000", key: "TILL_25K" },
  { budget: "25 - 35,000", key: "TILL_35K" },
  { budget: "Above 35,000", key: "ABOVE_35K" },
];
interface BHK {
  type: string;
  chosen: boolean;
}
export const BHKS = [
  { type: "1 BHK", chosen: false },
  { type: "2 BHK", chosen: false },
  { type: "3 BHK", chosen: false },
  { type: "4 BHK", chosen: false },
];
export const FlatFurnishTypes = ["Unfurnished", "Furnished", "Semi furnished"];

export const Areas = [
  {
    value: 15,
    label: "300 sqft",
  },

  {
    value: 40,
    label: "800 sqft",
  },
  {
    value: 60,
    label: "1200 sqft",
  },
  {
    value: 100,
    label: "2000 sqft",
  },
];

export function areaText(area: number) {
  return `${area * 20} sqft`;
}

export interface PostDomain {
  furnishing?: string;
  location?: string;
  area: number;
  bhks: BHK[];
  actionFlat: ActionFlat;
  budgets: string[];
  agents: boolean;
  owners: boolean;
}
