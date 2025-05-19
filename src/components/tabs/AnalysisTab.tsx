
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateSummaryMetrics, generateInsights } from '../../data/mockData';
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Mocked forecast data
const forecastData = [
  { month: 'Mayo', income: 645000, cost: 382000, profit: 263000, profitMargin: 40.8 },
  { month: 'Junio', income: 690000, cost: 400000, profit: 290000, profitMargin: 42.0 },
  { month: 'Julio', income: 738000, cost: 419000, profit: 319000, profitMargin: 43.2 },
  { month: 'Agosto', income: 790000, cost: 439000, profit: 351000, profitMargin: 44.4 },
  { month: 'Septiembre', income: 845000, cost: 460000, profit: 385000, profitMargin: 45.6 },
  { month: 'Octubre', income: 904000, cost: 482000, profit: 422000, profitMargin: 46.7 },
  { month: 'Noviembre', income: 968000, cost: 505000, profit: 463000, profitMargin: 47.8 },
  { month: 'Diciembre', income: 1036000, cost: 530000, profit: 506000, profitMargin: 48.8 }
];

// KPI targets
const kpiData = [
  { name: 'Ingresos', current: 84.7, target: 100 },
  { name: 'Rentabilidad', current: 93.5, target: 100 },
  { name: 'Clientes Nuevos', current: 65.0, target: 100 },
  { name: 'Retención', current: 97.2, target: 100 },
  { name: 'Satisfacción', current: 88.9, target: 100 }
];

// SWOT Analysis data
const swotData = {
  strengths: [
    'Alta rentabilidad en servicios de Consultoría (48%)',
    'Crecimiento mensual sostenido del 7%',
    'Baja tasa de facturación vencida (4.8%)'
  ],
  weaknesses: [
    'Alta dependencia del mercado mexicano (45% del ingreso total)',
    'Margen de rentabilidad variable por país',
    'Alta concentración en pocos clientes clave'
  ],
  opportunities: [
    'Expansión de servicios de Soporte en Chile (+25% de potencial)',
    'Crecimiento en Colombia con nuevos servicios',
    'Desarrollo de ofertas de mayor margen'
  ],
  threats: [
    'Presión de precios en servicios de implementación',
    'Competencia creciente en México',
    'Inestabilidad económica en la región'
  ]
};

const AnalysisTab = () => {
  const metrics = calculateSummaryMetrics();
  const insights = generateInsights();

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-2">Análisis Estratégico</h2>
        <p className="text-muted-foreground mb-6">
          Insights automáticos y recomendaciones basadas en datos
        </p>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Insights Clave</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-keos-primary/20 text-keos-primary flex items-center justify-center mr-3">
                    <span className="text-sm">{index + 1}</span>
                  </div>
                  <p>{insight}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Forecast Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Proyección a 8 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={forecastData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="income" name="Ingresos" stroke="#4361ee" strokeWidth={2} />
                  <Line yAxisId="left" type="monotone" dataKey="cost" name="Costos" stroke="#3f37c9" strokeWidth={2} />
                  <Line yAxisId="left" type="monotone" dataKey="profit" name="Utilidad" stroke="#2ecc71" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="profitMargin" name="Margen" stroke="#f72585" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* KPI Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso hacia Metas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={kpiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="current" name="Actual" fill="#4361ee" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="target" name="Meta" fill="#f72585" radius={[0, 4, 4, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SWOT Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis FODA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border bg-green-50 dark:bg-green-950 p-4">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Fortalezas</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {swotData.strengths.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-lg border bg-red-50 dark:bg-red-950 p-4">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Debilidades</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {swotData.weaknesses.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-lg border bg-blue-50 dark:bg-blue-950 p-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Oportunidades</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {swotData.opportunities.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-lg border bg-amber-50 dark:bg-amber-950 p-4">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">Amenazas</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {swotData.threats.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones Estratégicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-keos-primary/10 to-transparent">
                <div className="rounded-full p-2 bg-keos-primary/20 text-keos-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l3.29 3.29a.75.75 0 0 1-1.06 1.06L8 7.77 4.88 10.88a.75.75 0 1 1-1.06-1.06l3.29-3.29a.75.75 0 0 1 1.06 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Diversificar el portafolio de servicios en Chile</h4>
                  <p className="text-sm text-muted-foreground">Con el mayor margen de rentabilidad en Chile, se recomienda expandir la oferta de servicios de Soporte e Implementación para lograr un crecimiento adicional del 25% en los próximos 12 meses.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-keos-secondary/10 to-transparent">
                <div className="rounded-full p-2 bg-keos-secondary/20 text-keos-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l3.29 3.29a.75.75 0 0 1-1.06 1.06L8 7.77 4.88 10.88a.75.75 0 1 1-1.06-1.06l3.29-3.29a.75.75 0 0 1 1.06 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Implementar estrategia de reducción de costos en Colombia</h4>
                  <p className="text-sm text-muted-foreground">Los análisis muestran que una reducción del 8% en costos operativos en Colombia podría incrementar el margen de rentabilidad en un 5%, llevándolo al nivel objetivo del 40%.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-gradient-to-r from-keos-accent/10 to-transparent">
                <div className="rounded-full p-2 bg-keos-accent/20 text-keos-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l3.29 3.29a.75.75 0 0 1-1.06 1.06L8 7.77 4.88 10.88a.75.75 0 1 1-1.06-1.06l3.29-3.29a.75.75 0 0 1 1.06 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Mejorar proceso de facturación y cobranza</h4>
                  <p className="text-sm text-muted-foreground">La facturación pendiente representa un 15% del total. Implementar un nuevo proceso de seguimiento puede reducir este indicador al 8% y mejorar el flujo de caja en aproximadamente $120,000 mensuales.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisTab;
