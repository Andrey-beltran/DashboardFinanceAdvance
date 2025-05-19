
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
  costData,
  getMonthName
} from '../../data/mockData';
import { 
  filterCostData, 
  FilterState, 
  initialFilterState, 
  groupAndAggregateIncomeData 
} from '../../utils/filterUtils';
import FilterBar from '../FilterBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Colors for charts
const COLORS = ['#3f37c9', '#4361ee', '#f72585', '#7209b7', '#560bad', '#480ca8'];

const CostsTab = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [filteredData, setFilteredData] = useState(costData);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    // Apply filters
    const filtered = filterCostData(costData, filters);
    setFilteredData(filtered);

    // Group data by country
    const groupedByCountry = groupAndAggregateIncomeData(filtered, ['country']);
    setCountryData(groupedByCountry);

    // Group data by category
    const groupedByCategory = groupAndAggregateIncomeData(filtered, ['category']);
    setCategoryData(groupedByCategory);

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

  // Total costs for the current filter
  const totalCosts = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Análisis de Costos</h2>
        <p className="text-muted-foreground mb-6">
          Desglose detallado de costos por país, categoría y período
        </p>
      </div>
      
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Costos Totales: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(totalCosts)}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
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
                  <YAxis type="category" dataKey="name" />
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
                  <Bar dataKey="amount" name="Costos" fill="#3f37c9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Costos por País</CardTitle>
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
            <CardTitle>Costos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="category"
                    label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
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

        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Tabla de Costos Detallada</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>País</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.slice(0, 10).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{getMonthName(item.month)} {item.year}</TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('es-MX', { 
                        style: 'currency', 
                        currency: 'MXN',
                        maximumFractionDigits: 0
                      }).format(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length > 10 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                      Mostrando 10 de {filteredData.length} registros
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CostsTab;
