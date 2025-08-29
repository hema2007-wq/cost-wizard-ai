import React from 'react';
import { TrendingDown, DollarSign, Percent, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SavingsData {
  monthly: number;
  annual: number;
  percentage: number;
}

interface SavingsMetricsProps {
  savings: SavingsData;
}

export const SavingsMetrics: React.FC<SavingsMetricsProps> = ({ savings }) => {
  const metrics = [
    {
      title: 'Monthly Savings',
      value: `$${savings.monthly.toLocaleString()}`,
      description: 'Projected monthly cost reduction',
      icon: DollarSign,
      gradient: 'gradient-success'
    },
    {
      title: 'Annual Savings',
      value: `$${savings.annual.toLocaleString()}`,
      description: 'Total yearly savings potential',
      icon: TrendingDown,
      gradient: 'gradient-primary'
    },
    {
      title: 'Cost Reduction',
      value: `${savings.percentage}%`,
      description: 'Overall spending optimization',
      icon: Percent,
      gradient: 'gradient-warning'
    },
    {
      title: 'ROI Impact',
      value: '312%',
      description: 'Return on optimization investment',
      icon: Target,
      gradient: 'gradient-success'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="shadow-card transition-spring hover:shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg ${metric.gradient}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <CardDescription className="text-xs">
                {metric.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};