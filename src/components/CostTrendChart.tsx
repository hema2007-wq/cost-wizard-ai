import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CostTrendData {
  month: string;
  currentCost: number;
  predictedCost: number;
  optimizedCost: number;
}

interface CostTrendChartProps {
  data: CostTrendData[];
}

export const CostTrendChart: React.FC<CostTrendChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <Card className="shadow-card">
      <CardHeader className="gradient-card">
        <CardTitle className="flex items-center gap-2">
          Cost Trend Analysis
        </CardTitle>
        <CardDescription>
          Historical and predicted cloud spending with optimization potential
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="currentCost" 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth={2}
              name="Current Spend"
              dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="predictedCost" 
              stroke="hsl(var(--warning))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted Spend"
              dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="optimizedCost" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              name="Optimized Spend"
              dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};