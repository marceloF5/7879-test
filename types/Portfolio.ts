export interface IItem {
  image: string;
  sku: string;
  name: string;
  purchasePrice: number;
  weight: number;
  metal: "gold" | "platinum";
}

export interface IPortfolio {
  id: string;
  currentBalance: {
    goldBalance: number;
    platinumBalance: number;
  };
  history: {
    date: string;
    goldValue: {
      currency: string;
      amount: number;
    };
    platinumValue: {
      currency: string;
      amount: number;
    };
    totalValue: {
      currency: string;
      amount: number;
    };
  }[];
  portfolioItems: IItem[];
}
