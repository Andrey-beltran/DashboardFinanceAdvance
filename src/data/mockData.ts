
// Mock data for the dashboard

export interface IncomeData {
  country: string;
  service: string;
  year: number;
  month: number;
  amount: number;
}

export interface CostData {
  country: string;
  service: string;
  year: number;
  month: number;
  amount: number;
  category: string;
}

export interface BillingData {
  country: string;
  service: string;
  client: string;
  executive: string;
  year: number;
  month: number;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

// Income Data by country, service, year, month
export const incomeData: IncomeData[] = [
  { country: 'México', service: 'Consultoría', year: 2024, month: 1, amount: 125000 },
  { country: 'México', service: 'Implementación', year: 2024, month: 1, amount: 85000 },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 1, amount: 75000 },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 1, amount: 45000 },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 1, amount: 95000 },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 1, amount: 30000 },
  
  { country: 'México', service: 'Consultoría', year: 2024, month: 2, amount: 135000 },
  { country: 'México', service: 'Implementación', year: 2024, month: 2, amount: 90000 },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 2, amount: 80000 },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 2, amount: 50000 },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 2, amount: 100000 },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 2, amount: 35000 },
  
  { country: 'México', service: 'Consultoría', year: 2024, month: 3, amount: 150000 },
  { country: 'México', service: 'Implementación', year: 2024, month: 3, amount: 95000 },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 3, amount: 85000 },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 3, amount: 55000 },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 3, amount: 105000 },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 3, amount: 40000 },
  
  { country: 'México', service: 'Consultoría', year: 2024, month: 4, amount: 165000 },
  { country: 'México', service: 'Implementación', year: 2024, month: 4, amount: 100000 },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 4, amount: 90000 },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 4, amount: 60000 },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 4, amount: 110000 },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 4, amount: 45000 }
];

// Cost data by country, service, year, month
export const costData: CostData[] = [
  { country: 'México', service: 'Consultoría', year: 2024, month: 1, amount: 65000, category: 'Personal' },
  { country: 'México', service: 'Implementación', year: 2024, month: 1, amount: 45000, category: 'Personal' },
  { country: 'México', service: 'Consultoría', year: 2024, month: 1, amount: 12000, category: 'Operación' },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 1, amount: 38000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 1, amount: 22000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 1, amount: 8000, category: 'Operación' },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 1, amount: 50000, category: 'Personal' },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 1, amount: 15000, category: 'Personal' },
  
  { country: 'México', service: 'Consultoría', year: 2024, month: 2, amount: 68000, category: 'Personal' },
  { country: 'México', service: 'Implementación', year: 2024, month: 2, amount: 47000, category: 'Personal' },
  { country: 'México', service: 'Consultoría', year: 2024, month: 2, amount: 14000, category: 'Operación' },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 2, amount: 39000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 2, amount: 24000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 2, amount: 9000, category: 'Operación' },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 2, amount: 52000, category: 'Personal' },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 2, amount: 17000, category: 'Personal' },
  
  { country: 'México', service: 'Consultoría', year: 2024, month: 3, amount: 71000, category: 'Personal' },
  { country: 'México', service: 'Implementación', year: 2024, month: 3, amount: 49000, category: 'Personal' },
  { country: 'México', service: 'Consultoría', year: 2024, month: 3, amount: 15000, category: 'Operación' },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 3, amount: 41000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 3, amount: 26000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 3, amount: 10000, category: 'Operación' },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 3, amount: 54000, category: 'Personal' },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 3, amount: 19000, category: 'Personal' },
  
  { country: 'México', service: 'Consultoría', year: 2024, month: 4, amount: 74000, category: 'Personal' },
  { country: 'México', service: 'Implementación', year: 2024, month: 4, amount: 51000, category: 'Personal' },
  { country: 'México', service: 'Consultoría', year: 2024, month: 4, amount: 16000, category: 'Operación' },
  { country: 'Colombia', service: 'Consultoría', year: 2024, month: 4, amount: 43000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 4, amount: 28000, category: 'Personal' },
  { country: 'Colombia', service: 'Soporte', year: 2024, month: 4, amount: 11000, category: 'Operación' },
  { country: 'Chile', service: 'Implementación', year: 2024, month: 4, amount: 56000, category: 'Personal' },
  { country: 'Chile', service: 'Soporte', year: 2024, month: 4, amount: 21000, category: 'Personal' }
];

// Billing data
export const billingData: BillingData[] = [
  { country: 'México', service: 'Consultoría', client: 'Empresa A', executive: 'Juan Pérez', year: 2024, month: 1, amount: 65000, status: 'paid' },
  { country: 'México', service: 'Consultoría', client: 'Empresa B', executive: 'Ana López', year: 2024, month: 1, amount: 60000, status: 'paid' },
  { country: 'México', service: 'Implementación', client: 'Empresa C', executive: 'Carlos Ruiz', year: 2024, month: 1, amount: 85000, status: 'paid' },
  { country: 'Colombia', service: 'Consultoría', client: 'Empresa D', executive: 'María González', year: 2024, month: 1, amount: 75000, status: 'paid' },
  { country: 'Colombia', service: 'Soporte', client: 'Empresa E', executive: 'Pedro Ramírez', year: 2024, month: 1, amount: 45000, status: 'paid' },
  { country: 'Chile', service: 'Implementación', client: 'Empresa F', executive: 'Laura Torres', year: 2024, month: 1, amount: 95000, status: 'paid' },
  { country: 'Chile', service: 'Soporte', client: 'Empresa G', executive: 'Roberto Díaz', year: 2024, month: 1, amount: 30000, status: 'paid' },
  
  { country: 'México', service: 'Consultoría', client: 'Empresa A', executive: 'Juan Pérez', year: 2024, month: 2, amount: 70000, status: 'paid' },
  { country: 'México', service: 'Consultoría', client: 'Empresa B', executive: 'Ana López', year: 2024, month: 2, amount: 65000, status: 'paid' },
  { country: 'México', service: 'Implementación', client: 'Empresa C', executive: 'Carlos Ruiz', year: 2024, month: 2, amount: 90000, status: 'pending' },
  { country: 'Colombia', service: 'Consultoría', client: 'Empresa D', executive: 'María González', year: 2024, month: 2, amount: 80000, status: 'paid' },
  { country: 'Colombia', service: 'Soporte', client: 'Empresa E', executive: 'Pedro Ramírez', year: 2024, month: 2, amount: 50000, status: 'pending' },
  { country: 'Chile', service: 'Implementación', client: 'Empresa F', executive: 'Laura Torres', year: 2024, month: 2, amount: 100000, status: 'paid' },
  { country: 'Chile', service: 'Soporte', client: 'Empresa G', executive: 'Roberto Díaz', year: 2024, month: 2, amount: 35000, status: 'paid' },
  
  { country: 'México', service: 'Consultoría', client: 'Empresa A', executive: 'Juan Pérez', year: 2024, month: 3, amount: 75000, status: 'paid' },
  { country: 'México', service: 'Consultoría', client: 'Empresa B', executive: 'Ana López', year: 2024, month: 3, amount: 75000, status: 'paid' },
  { country: 'México', service: 'Implementación', client: 'Empresa C', executive: 'Carlos Ruiz', year: 2024, month: 3, amount: 95000, status: 'pending' },
  { country: 'Colombia', service: 'Consultoría', client: 'Empresa D', executive: 'María González', year: 2024, month: 3, amount: 85000, status: 'paid' },
  { country: 'Colombia', service: 'Soporte', client: 'Empresa E', executive: 'Pedro Ramírez', year: 2024, month: 3, amount: 55000, status: 'overdue' },
  { country: 'Chile', service: 'Implementación', client: 'Empresa F', executive: 'Laura Torres', year: 2024, month: 3, amount: 105000, status: 'paid' },
  { country: 'Chile', service: 'Soporte', client: 'Empresa G', executive: 'Roberto Díaz', year: 2024, month: 3, amount: 40000, status: 'paid' },
  
  { country: 'México', service: 'Consultoría', client: 'Empresa A', executive: 'Juan Pérez', year: 2024, month: 4, amount: 80000, status: 'pending' },
  { country: 'México', service: 'Consultoría', client: 'Empresa B', executive: 'Ana López', year: 2024, month: 4, amount: 85000, status: 'pending' },
  { country: 'México', service: 'Implementación', client: 'Empresa C', executive: 'Carlos Ruiz', year: 2024, month: 4, amount: 100000, status: 'pending' },
  { country: 'Colombia', service: 'Consultoría', client: 'Empresa D', executive: 'María González', year: 2024, month: 4, amount: 90000, status: 'pending' },
  { country: 'Colombia', service: 'Soporte', client: 'Empresa E', executive: 'Pedro Ramírez', year: 2024, month: 4, amount: 60000, status: 'overdue' },
  { country: 'Chile', service: 'Implementación', client: 'Empresa F', executive: 'Laura Torres', year: 2024, month: 4, amount: 110000, status: 'pending' },
  { country: 'Chile', service: 'Soporte', client: 'Empresa G', executive: 'Roberto Díaz', year: 2024, month: 4, amount: 45000, status: 'pending' }
];

// Get countries, services, years, months from data
export const countries = [...new Set(incomeData.map(item => item.country))];
export const services = [...new Set(incomeData.map(item => item.service))];
export const years = [...new Set(incomeData.map(item => item.year))];
export const months = [...new Set(incomeData.map(item => item.month))];
export const clients = [...new Set(billingData.map(item => item.client))];
export const executives = [...new Set(billingData.map(item => item.executive))];

// Helper to get month name
export const getMonthName = (monthNumber: number): string => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[monthNumber - 1];
};

// Calculate summary metrics
export const calculateSummaryMetrics = () => {
  // Total income
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  
  // Total costs
  const totalCosts = costData.reduce((sum, item) => sum + item.amount, 0);
  
  // Total profit
  const totalProfit = totalIncome - totalCosts;
  
  // Profit margin
  const profitMargin = (totalProfit / totalIncome) * 100;
  
  // Total billing
  const totalBilling = billingData.reduce((sum, item) => sum + item.amount, 0);
  
  // Pending billing
  const pendingBilling = billingData
    .filter(item => item.status === 'pending' || item.status === 'overdue')
    .reduce((sum, item) => sum + item.amount, 0);
  
  return {
    totalIncome,
    totalCosts,
    totalProfit,
    profitMargin,
    totalBilling,
    pendingBilling,
  };
};

// Generate insights based on data
export const generateInsights = () => {
  const metrics = calculateSummaryMetrics();
  const insights = [
    `La rentabilidad general del negocio es del ${metrics.profitMargin.toFixed(2)}%, ${metrics.profitMargin >= 40 ? 'superando' : 'por debajo de'} el objetivo del 40%.`,
    `${countries[0]} es el país con mayor volumen de ingresos, representando aproximadamente el ${((incomeData.filter(i => i.country === countries[0]).reduce((sum, item) => sum + item.amount, 0) / metrics.totalIncome) * 100).toFixed(2)}% del total.`,
    `El servicio más rentable es Consultoría con un margen promedio del 48%.`,
    `Hay $${metrics.pendingBilling.toLocaleString()} en facturación pendiente, lo que representa el ${((metrics.pendingBilling / metrics.totalBilling) * 100).toFixed(2)}% del total facturado.`,
    `Se observa una tendencia de crecimiento en ingresos del 7% mensual en promedio.`,
  ];
  
  return insights;
};
