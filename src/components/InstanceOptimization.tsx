import React from 'react';
import { Server, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InstanceData {
  id: string;
  type: string;
  usage: number;
  cost: number;
  recommendation: string;
}

interface InstanceOptimizationProps {
  instances: InstanceData[];
}

export const InstanceOptimization: React.FC<InstanceOptimizationProps> = ({ instances }) => {
  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'text-destructive';
    if (usage > 60) return 'text-warning';
    return 'text-success';
  };

  const getUsageBadgeVariant = (usage: number) => {
    if (usage > 80) return 'destructive';
    if (usage > 60) return 'outline';
    return 'secondary';
  };

  const calculateSavings = (current: number) => {
    return Math.floor(current * 0.3); // Mock 30% savings
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="gradient-card">
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Instance Rightsizing Recommendations
        </CardTitle>
        <CardDescription>
          ML-powered analysis of your cloud instances with optimization suggestions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {instances.map((instance, index) => (
            <div key={index} className="p-4 border rounded-lg transition-smooth hover:shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Server className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{instance.id}</h4>
                    <p className="text-sm text-muted-foreground">Current: {instance.type}</p>
                  </div>
                </div>
                <Badge variant={getUsageBadgeVariant(instance.usage)}>
                  {instance.usage}% utilized
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Current Cost</div>
                  <div className="text-lg font-semibold">${instance.cost}</div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">{instance.type}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-primary">{instance.recommendation}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Projected Savings</div>
                  <div className="text-lg font-semibold text-success">
                    ${calculateSavings(instance.cost)}/month
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {instance.usage < 60 ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {instance.usage < 60 
                      ? 'Ready for optimization' 
                      : 'Monitor before resizing'
                    }
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Apply Recommendation
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};