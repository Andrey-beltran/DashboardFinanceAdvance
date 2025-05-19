
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  BarChart,
  DollarSign,
  TrendingUp,
  FileText,
  LineChart,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    {
      id: "ingresos",
      label: "Ingresos",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: "costos",
      label: "Costos",
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      id: "rentabilidad",
      label: "Rentabilidad",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: "facturacion",
      label: "Facturación",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "analisis",
      label: "Análisis",
      icon: <LineChart className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <div className="font-bold text-lg text-keos-primary">Keos</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-col space-y-1 p-2 flex-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              collapsed && "justify-center px-2"
            )}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
