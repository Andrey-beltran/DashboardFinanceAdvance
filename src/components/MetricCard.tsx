
import { Card, CardContent } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const metricCardVariants = cva(
  "metric-card transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card",
        income: "bg-gradient-to-br from-keos-primary/10 to-keos-primary/5",
        costs: "bg-gradient-to-br from-keos-secondary/10 to-keos-secondary/5",
        profit: "bg-gradient-to-br from-keos-success/10 to-keos-success/5",
        billing: "bg-gradient-to-br from-keos-accent/10 to-keos-accent/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MetricCardProps extends VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
}

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  variant,
  className,
  trend,
}: MetricCardProps) => {
  // Format the value if it's a number
  const formattedValue = typeof value === 'number' 
    ? new Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN',
        maximumFractionDigits: 0
      }).format(value)
    : value;

  return (
    <Card className={cn(metricCardVariants({ variant }), className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="mt-1">
              <h3 className="text-2xl font-bold tracking-tight">{formattedValue}</h3>
              {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-xs ${trend.positive ? 'text-keos-success' : 'text-keos-danger'} font-medium`}>
                  {trend.positive ? '+' : ''}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">{trend.label}</span>
              </div>
            )}
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
