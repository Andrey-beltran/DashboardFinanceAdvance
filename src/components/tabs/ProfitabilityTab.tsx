
import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  incomeData,
  costData,
  getMonthName
} from '../../data/mockData';
import { 
  filterIncomeData,
  filterCostData,
  FilterState, 
  initialFilterState, 
  groupAndAggregateIncomeData 
} from '../../utils/filterUtils';
import FilterBar from '../FilterBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Colors for charts
const COLORS = ['#2ecc71', '#3f37c9', '#4361ee', '#f72585', '#7209b7', '#560bad'];

const ProfitabilityTab = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [filteredIncomeData, setFilteredIncomeData] = useState(incomeData);
  const [filteredCostData, setFilteredCostData] = useState(costData);
  const [combinedMonthlyData, setCombinedMonthlyData] = useState<any[]>([]);
  const [profitByCountry, setProfitByCountry] = useState<any[]>([]);
  const [profitByService, setProfitByService] = useState<any[]>([]);
  const [profitMargin, setProfitMargin] = useState(0);

  useEffect(() => {
    // Apply filters
    const filteredIncome = filterIncomeData(incomeData, filters);
    setFilteredIncomeData(filteredIncome);

    const filteredCost = filterCostData(costData, filters);
    setFilteredCostData(filteredCost);

    // Calculate total income and cost
    const totalIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);
    const totalCost = filteredCost.reduce((sum, item) => sum + item.amount, 0);
    const profit = totalIncome - totalCost;
    
    // Calculate profit margin
    const margin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;
    setProfitMargin(margin);

    // Prepare monthly data for comparison chart
    if (filters.month === 0) {
      const incomeByMonth = groupAndAggregateIncomeData(
        filteredIncome.filter(item => item.year === filters.year),
        ['month']
      ).reduce((acc, item) => {
        acc[item.month as number] = item.amount as number;
        return acc;
      }, {} as Record<number, number>);
      
      const costByMonth = groupAndAggregateIncomeData(
        filteredCost.filter(item => item.year === filters.year),
        ['month']
      ).reduce((acc, item) => {
        acc[item.month as number] = item.amount as number;
        return acc;
      }, {} as Record<number, number>);
      
      const combined = Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
        const income = incomeByMonth[month] || 0;
        const cost = costByMonth[month] || 0;
        const profit = income - cost;
        const profitMargin = income > 0 ? (profit / income) * 100 : 0;
        
        return {
          month,
          name: getMonthName(month),
          income,
          cost,
          profit,
          profitMargin: parseFloat(profitMargin.toFixed(2))
        };
      });
      
      setCombinedMonthlyData(combined);
    }

    // Calculate profit by country
    const incomeByCountry = groupAndAggregateIncomeData(filteredIncome, ['country']).reduce(
      (acc, item) => {
        acc[item.country as string] = item.amount as number;
        return acc;
      },
      {} as Record<string, number>
    );
    
    const costByCountry = groupAndAggregateIncomeData(filteredCost, ['country']).reduce(
      (acc, item) => {
        acc[item.country as string] = item.amount as number;
        return acc;
      },
      {} as Record<string, number>
    );
    
    const countryProfit = Object.keys(incomeByCountry).map(country => {
      const income = incomeByCountry[country] || 0;
      const cost = costByCountry[country] || 0;
      const profit = income - cost;
      return {
        country,
        profit,
        profitMargin: income > 0 ? (profit / income) * 100 : 0
      };
    });
    
    setProfitByCountry(countryProfit);

    // Calculate profit by service
    const incomeByService = groupAndAggregateIncomeData(filteredIncome, ['service']).reduce(
      (acc, item) => {
        acc[item.service as string] = item.amount as number;
        return acc;
      },
      {} as Record<string, number>
    );
    
    const costByService = groupAndAggregateIncomeData(filteredCost, ['service']).reduce(
      (acc, item) => {
        acc[item.service as string] = item.amount as number;
        return acc;
      },
      {} as Record<string, number>
    );
    
    const serviceProfit = Object.keys(incomeByService).map(service => {
      const income = incomeByService[service] || 0;
      const cost = costByService[service] || 0;
      const profit = income - cost;
      return {
        service,
        profit,
        profitMargin: income > 0 ? (profit / income) * 100 : 0
      };
    });
    
    setProfitByService(serviceProfit);
    
  }, [filters]);

  // Calculate totals
  const totalIncome = filteredIncomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalCost = filteredCostData.reduce((sum, item) => sum + item.amount, 0);
  const totalProfit = totalIncome - totalCost;

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Análisis de Rentabilidad</h2>
        <p className="text-muted-foreground mb-6">
          Comparación de ingresos vs costos y cálculo de utilidad
        </p>
      </div>
      
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-keos-primary">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Costos Totales</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-keos-secondary">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(totalCost)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Utilidad</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-keos-success">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(totalProfit)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Margen de rentabilidad: {profitMargin.toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Ingresos vs Costos por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={combinedMonthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('es-MX', { 
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'MXN'
                      }).format(value)
                    } 
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'profitMargin') {
                        return [`${value}%`, 'Margen'];
                      }
                      return [
                        new Intl.NumberFormat('es-MX', { 
                          style: 'currency', 
                          currency: 'MXN',
                          maximumFractionDigits: 0
                        }).format(value as number),
                        name === 'income' ? 'Ingresos' : name === 'cost' ? 'Costos' : 'Utilidad'
                      ];
                    }}
                  />
                  <Legend 
                    payload={[
                      { value: 'Ingresos', type: 'rect', color: '#4361ee' },
                      { value: 'Costos', type: 'rect', color: '#3f37c9' },
                      { value: 'Utilidad', type: 'rect', color: '#2ecc71' },
                      { value: 'Margen', type: 'line', color: '#f72585' }
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="income" name="Ingresos" fill="#4361ee" />
                  <Bar yAxisId="left" dataKey="cost" name="Costos" fill="#3f37c9" />
                  <Bar yAxisId="left" dataKey="profit" name="Utilidad" fill="#2ecc71" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="profitMargin"
                    name="Margen"
                    stroke="#f72585"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rentabilidad por País</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={profitByCountry}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('es-MX', { 
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'MXN'
                      }).format(value)
                    } 
                  />
                  <YAxis type="category" dataKey="country" />
                  <Tooltip 
                    formatter={(value) => 
                      new Intl.NumberFormat('es-MX', { 
                        style: 'currency', 
                        currency: 'MXN',
                        maximumFractionDigits: 0
                      }).format(value as number)
                    }
                  />
                  <Legend />
                  <Bar dataKey="profit" name="Utilidad" fill="#2ecc71" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Margen de Rentabilidad por Servicio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={profitByService}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`} 
                  />
                  <Tooltip formatter={(value) => `${parseFloat(value as string).toFixed(2)}%`} />
                  <Legend />
                  <Bar dataKey="profitMargin" name="Margen de Rentabilidad (%)" fill="#f72585" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfitabilityTab;
