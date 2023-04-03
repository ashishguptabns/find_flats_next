export enum ActionFlat {
  SELL = "SELL",
  RENT = "RENT",
  NONE = "NONE",
  BUY = "BUY",
}
export function getPrices(actionFlat: string): Budget[] {
  switch (actionFlat) {
    case ActionFlat.BUY:
      return BuySellFlatBudgets;
    case ActionFlat.SELL:
      return BuySellFlatBudgets;
    default:
      return RentFlatBudgets;
  }
}

export interface Budget {
  checked: boolean;
  budget: string;
}
export const BuySellFlatBudgets: Budget[] = [
  { budget: "Till 30 L", checked: false },
  { budget: "30 - 50 L", checked: false },
  { budget: "50 - 80 L", checked: false },
  { budget: "Above 80 L", checked: false },
];
export const RentFlatBudgets: Budget[] = [
  { budget: "Till 15,000", checked: false },
  { budget: "15 - 25,000", checked: false },
  { budget: "25 - 35,000", checked: false },
  { budget: "Above 35,000", checked: false },
];
export interface BHK {
  type: string;
  chosen: boolean;
}
export const BHKS: BHK[] = [
  { type: "1 BHK", chosen: false },
  { type: "2 BHK", chosen: false },
  { type: "3 BHK", chosen: false },
  { type: "4 BHK", chosen: false },
];
export enum FlatFurnishTypes {
  Furnished = "Furnished",
  Semi_Furnished = "Semi furnished",
}

export const Areas = [
  {
    value: 15,
    label: "300 sqft",
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

export interface PostDTO {
  contactByAgents: boolean;
  furnishing?: string;
  location?: string;
  area: number;
  bhks: string[];
  actionFlat: string;
  budgets: string[];
  owners: boolean;
}
export function PostDomainToDTO(postDomain: PostDomain): PostDTO {
  function getBhks(bhks: BHK[]): string[] {
    var finalBHKs: string[] = [];
    bhks.map((item) => {
      if (item.chosen) {
        finalBHKs.push(item.type);
      }
    });
    return finalBHKs;
  }
  function getBudgets(budgets: Budget[]): string[] {
    var finalBudgets: string[] = [];
    budgets.map((item) => {
      if (item.checked) {
        finalBudgets.push(item.budget);
      }
    });
    return finalBudgets;
  }

  return {
    contactByAgents: postDomain.contactByAgents,
    furnishing: postDomain.furnishing,
    location: postDomain.location,
    area: postDomain.area,
    bhks: getBhks(postDomain.bhks),
    actionFlat: postDomain.actionFlat,
    budgets: getBudgets(postDomain.budgets),
    owners: postDomain.owners,
  };
}
export interface PostDomain {
  contactByAgents: boolean;
  furnishing?: string;
  location?: string;
  area: number;
  bhks: BHK[];
  actionFlat: ActionFlat;
  budgets: Budget[];
  owners: boolean;
}
