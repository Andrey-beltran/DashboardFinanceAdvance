
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
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  incomeData,
  countries,
  getMonthName
} from '../../data/mockData';
import { 
  filterIncomeData, 
  FilterState, 
  initialFilterState, 
  groupAndAggregateIncomeData 
} from '../../utils/filterUtils';
import FilterBar from '../FilterBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Colors for charts
const COLORS = ['#4361ee', '#3f37c9', '#f72585', '#7209b7', '#560bad', '#480ca8'];

const IncomeTab = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [filteredData, setFilteredData] = useState(incomeData);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [serviceData, setServiceData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    // Apply filters
    const filtered = filterIncomeData(incomeData, filters);
    setFilteredData(filtered);

    // Group data by country
    const groupedByCountry = groupAndAggregateIncomeData(filtered, ['country']);
    setCountryData(groupedByCountry);

    // Group data by service
    const groupedByService = groupAndAggregateIncomeData(filtered, ['service']);
    setServiceData(groupedByService);

    // Group data by month (if year is selected)
    if (filters.month === 0) {
      const groupedByMonth = groupAndAggregateIncomeData(
        filtered.filter(item => item.year === filters.year),
        ['month']
      ).sort((a, b) => (a.month as number) - (b.month as number))
       .map(item => ({
         ...item,
         name: getMonthName(item.month as number),
       }));
      
      setMonthlyData(groupedByMonth);
    }
  }, [filters]);

  // Total income for the current filter
  const totalIncome = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Visión General de Ingresos</h2>
        <p className="text-muted-foreground mb-6">
          Análisis detallado de los ingresos por país, servicio y período
        </p>
      </div>
      
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Ingresos Totales: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(totalIncome)}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('es-MX', { 
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'MXN'
                      }).format(value)
                    } 
                  />
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
                  <Bar dataKey="amount" name="Ingresos" fill="#4361ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos por País</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="country"
                    label={({ country, percent }) => `${country}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingresos por Servicio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="service"
                    label={({ service, percent }) => `${service}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('es-MX', { 
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'MXN'
                      }).format(value)
                    } 
                  />
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
                  <Bar dataKey="amount" name="Ingresos" fill="#f72585" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IncomeTab;
