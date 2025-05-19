
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
  billingData,
  getMonthName
} from '../../data/mockData';
import { 
  filterBillingData, 
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
import { Badge } from "@/components/ui/badge";

// Colors for charts
const COLORS = ['#4361ee', '#3f37c9', '#f72585', '#7209b7', '#560bad', '#480ca8'];

// Status colors
const STATUS_COLORS = {
  paid: 'bg-green-500',
  pending: 'bg-yellow-500',
  overdue: 'bg-red-500'
};

const BillingTab = () => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [filteredData, setFilteredData] = useState(billingData);
  const [clientData, setClientData] = useState<any[]>([]);
  const [executiveData, setExecutiveData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);

  useEffect(() => {
    // Apply filters
    const filtered = filterBillingData(billingData, filters);
    setFilteredData(filtered);

    // Group data by client
    const groupedByClient = groupAndAggregateIncomeData(filtered, ['client']);
    setClientData(groupedByClient);

    // Group data by executive
    const groupedByExecutive = groupAndAggregateIncomeData(filtered, ['executive']);
    setExecutiveData(groupedByExecutive);

    // Group data by status
    const groupedByStatus = filtered.reduce((acc, item) => {
      const { status } = item;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status] += item.amount;
      return acc;
    }, {} as Record<string, number>);

    const statusChartData = Object.entries(groupedByStatus).map(([status, amount]) => ({
      status,
      amount
    }));
    
    setStatusData(statusChartData);

  }, [filters]);

  // Total billing for the current filter
  const totalBilling = filteredData.reduce((sum, item) => sum + item.amount, 0);

  // Pending and overdue billing
  const pendingBilling = filteredData
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);
    
  const overdueBilling = filteredData
    .filter(item => item.status === 'overdue')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Facturación Detallada</h2>
        <p className="text-muted-foreground mb-6">
          Análisis de facturación por cliente, ejecutiva y estatus
        </p>
      </div>
      
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        showClientFilter={true}
        showExecutiveFilter={true}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Facturación Total</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-keos-primary">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(totalBilling)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facturación Pendiente</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-yellow-500">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(pendingBilling)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {((pendingBilling / totalBilling) * 100).toFixed(1)}% del total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facturación Vencida</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-3xl font-bold text-red-500">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(overdueBilling)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {((overdueBilling / totalBilling) * 100).toFixed(1)}% del total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Facturación por Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={clientData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="client"
                    label={({ client, percent }) => `${client}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {clientData.map((entry, index) => (
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
            <CardTitle>Facturación por Ejecutiva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={executiveData}
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
                  <YAxis type="category" dataKey="executive" />
                  <Tooltip
                    formatter={(value) => 
                      new Intl.NumberFormat('es-MX', { 
                        style: 'currency', 
                        currency: 'MXN',
                        maximumFractionDigits: 0
                      }).format(value as number)
                    }
                  />
                  <Bar dataKey="amount" name="Facturación" fill="#4361ee" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Facturación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                    nameKey="status"
                    label={({ status, percent }) => {
                      const statusLabels = {
                        paid: 'Pagado',
                        pending: 'Pendiente',
                        overdue: 'Vencido'
                      };
                      return `${statusLabels[status as keyof typeof statusLabels]}: ${(percent * 100).toFixed(0)}%`;
                    }}
                  >
                    {statusData.map((entry) => {
                      const statusColors = {
                        paid: '#2ecc71',
                        pending: '#f39c12',
                        overdue: '#e74c3c'
                      };
                      return (
                        <Cell
                          key={entry.status}
                          fill={statusColors[entry.status as keyof typeof statusColors]}
                        />
                      );
                    })}
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
                  <Legend
                    formatter={(value) => {
                      const statusLabels = {
                        paid: 'Pagado',
                        pending: 'Pendiente',
                        overdue: 'Vencido'
                      };
                      return statusLabels[value as keyof typeof statusLabels];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Detalle de Facturación</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Ejecutiva</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.slice(0, 10).map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>{item.executive}</TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{getMonthName(item.month)} {item.year}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[item.status]}>
                        {item.status === 'paid' && 'Pagado'}
                        {item.status === 'pending' && 'Pendiente'}
                        {item.status === 'overdue' && 'Vencido'}
                      </Badge>
                    </TableCell>
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
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
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

export default BillingTab;
