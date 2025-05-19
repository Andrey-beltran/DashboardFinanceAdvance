
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, BarChart, FileText, LineChart } from "lucide-react";
import MetricCard from "./MetricCard";
import { calculateSummaryMetrics } from "../data/mockData";
import IncomeTab from "./tabs/IncomeTab";
import CostsTab from "./tabs/CostsTab";
import ProfitabilityTab from "./tabs/ProfitabilityTab";
import BillingTab from "./tabs/BillingTab";
import AnalysisTab from "./tabs/AnalysisTab";
import ThemeSwitcher from "./ThemeSwitcher";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("ingresos");
  const metrics = calculateSummaryMetrics();
  
  // Current time for welcome message
  const now = new Date();
  const hours = now.getHours();
  
  let greeting = "Buenos días";
  if (hours >= 12 && hours < 18) {
    greeting = "Buenas tardes";
  } else if (hours >= 18) {
    greeting = "Buenas noches";
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="border-b bg-background z-10">
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h1 className="text-3xl font-bold text-keos-primary">Keos - Anyawayback</h1>
              <p className="text-muted-foreground">{greeting}, bienvenido al panel de análisis estratégico</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm py-1 px-2">
                Último reporte: Mayo 2024
              </Badge>
              <ThemeSwitcher />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Ingresos Acumulados"
              value={metrics.totalIncome}
              subtitle="2024"
              icon={<DollarSign className="h-6 w-6" />}
              variant="income"
              trend={{ value: 7.2, label: "vs. mes anterior", positive: true }}
            />
            <MetricCard
              title="Costos Totales"
              value={metrics.totalCosts}
              subtitle="2024"
              icon={<BarChart className="h-6 w-6" />}
              variant="costs"
              trend={{ value: 3.5, label: "vs. mes anterior", positive: false }}
            />
            <MetricCard
              title="Rentabilidad General"
              value={`${metrics.profitMargin.toFixed(1)}%`}
              subtitle="Margen Operativo"
              icon={<TrendingUp className="h-6 w-6" />}
              variant="profit"
              trend={{ value: 2.1, label: "vs. mes anterior", positive: true }}
            />
            <MetricCard
              title="Facturación Total"
              value={metrics.totalBilling}
              subtitle="2024"
              icon={<FileText className="h-6 w-6" />}
              variant="billing"
              trend={{ value: 6.8, label: "vs. mes anterior", positive: true }}
            />
          </div>
          
          {/* Tabs Content */}
          <div className="bg-card rounded-xl border shadow-sm p-6">
            {activeTab === "ingresos" && <IncomeTab />}
            {activeTab === "costos" && <CostsTab />}
            {activeTab === "rentabilidad" && <ProfitabilityTab />}
            {activeTab === "facturacion" && <BillingTab />}
            {activeTab === "analisis" && <AnalysisTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
