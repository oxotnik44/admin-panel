export interface SaleData {
  name: string;
  timestamp: string;
  sold: number;
  total: number;
}

export type ProductData = {
  hour?: string;
  date?: string;
  sales: number;
  amount: number;
  residue?: number;
  timestamp?: string;
};

export interface UseProductDataProps {
  initialData: SaleData[];
  productName: string;
  dateRange: [Date | null, Date | null];
  isSingleDaySelected: boolean | null;
  filterNoSales: boolean;
  isDayAnalitics: boolean;
}
