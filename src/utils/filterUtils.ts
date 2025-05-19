
import { IncomeData, CostData, BillingData } from '../data/mockData';

export interface FilterState {
  country: string;
  service: string;
  year: number;
  month: number;
  client?: string;
  executive?: string;
}

export const initialFilterState: FilterState = {
  country: 'Todos',
  service: 'Todos',
  year: 2024,
  month: 0, // 0 means all months
  client: 'Todos',
  executive: 'Todos',
};

export const filterIncomeData = (data: IncomeData[], filters: FilterState): IncomeData[] => {
  return data.filter(item => {
    // Apply country filter
    if (filters.country !== 'Todos' && item.country !== filters.country) {
      return false;
    }
    
    // Apply service filter
    if (filters.service !== 'Todos' && item.service !== filters.service) {
      return false;
    }
    
    // Apply year filter
    if (item.year !== filters.year) {
      return false;
    }
    
    // Apply month filter if specified
    if (filters.month !== 0 && item.month !== filters.month) {
      return false;
    }
    
    return true;
  });
};

export const filterCostData = (data: CostData[], filters: FilterState): CostData[] => {
  return data.filter(item => {
    // Apply country filter
    if (filters.country !== 'Todos' && item.country !== filters.country) {
      return false;
    }
    
    // Apply service filter
    if (filters.service !== 'Todos' && item.service !== filters.service) {
      return false;
    }
    
    // Apply year filter
    if (item.year !== filters.year) {
      return false;
    }
    
    // Apply month filter if specified
    if (filters.month !== 0 && item.month !== filters.month) {
      return false;
    }
    
    return true;
  });
};

export const filterBillingData = (data: BillingData[], filters: FilterState): BillingData[] => {
  return data.filter(item => {
    // Apply country filter
    if (filters.country !== 'Todos' && item.country !== filters.country) {
      return false;
    }
    
    // Apply service filter
    if (filters.service !== 'Todos' && item.service !== filters.service) {
      return false;
    }
    
    // Apply year filter
    if (item.year !== filters.year) {
      return false;
    }
    
    // Apply month filter if specified
    if (filters.month !== 0 && item.month !== filters.month) {
      return false;
    }
    
    // Apply client filter if specified
    if (filters.client && filters.client !== 'Todos' && item.client !== filters.client) {
      return false;
    }
    
    // Apply executive filter if specified
    if (filters.executive && filters.executive !== 'Todos' && item.executive !== filters.executive) {
      return false;
    }
    
    return true;
  });
};

// Modificada para aceptar más tipos de dimensiones
export const groupAndAggregateIncomeData = (
  data: any[],
  dimensions: string[]
) => {
  const groupedData: Record<string, number> = {};
  
  data.forEach(item => {
    const key = dimensions.map(dim => item[dim]).join('-');
    
    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    
    groupedData[key] += item.amount;
  });
  
  return Object.entries(groupedData).map(([key, amount]) => {
    const dimensionValues = key.split('-');
    const result: Record<string, any> = {};
    
    dimensions.forEach((dim, index) => {
      result[dim] = dimensionValues[index];
    });
    
    result.amount = amount;
    return result;
  });
};

// Function to prepare data for charts
export const prepareChartData = (data: any[], category: string, value: string) => {
  return data.map(item => ({
    name: item[category],
    value: item[value]
  }));
};
