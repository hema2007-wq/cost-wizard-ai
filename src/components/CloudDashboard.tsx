import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { CostTrendChart } from './CostTrendChart';
import { SavingsMetrics } from './SavingsMetrics';
import { InstanceOptimization } from './InstanceOptimization';
import { Cloud, BarChart3, Brain, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-dashboard.jpg';

interface DashboardData {
  instanceData: any[];
  trends: any[];
  savings: {
    monthly: number;
    annual: number;
    percentage: number;
  };
}

export const CloudDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (data: DashboardData) => {
    setIsAnalyzing(true);
    // Simulate ML analysis time
    setTimeout(() => {
      setDashboardData(data);
      setIsAnalyzing(false);
    }, 1500);
  };

  const features = [
    {
      icon: Cloud,
      title: 'Multi-Cloud Support',
      description: 'Analyze AWS, Azure, and GCP usage patterns'
    },
    {
      icon: Brain,
      title: 'ML-Powered Insights',
      description: 'Advanced algorithms predict optimal configurations'
    },
    {
      icon: BarChart3,
      title: 'Trend Analysis',
      description: 'Historical data reveals spending patterns'
    },
    {
      icon: Zap,
      title: 'Auto-Optimization',
      description: 'Automated recommendations for instant savings'
    }
  ];

  if (!dashboardData && !isAnalyzing) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-90"></div>
          <img 
            src={heroImage} 
            alt="Cloud Cost Optimization Dashboard" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative container mx-auto px-4 py-24 text-center">
            <Badge variant="secondary" className="mb-4">
              AI-Powered Cloud Optimization
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Autonomous Cloud
              <br />
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Cost Optimization
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Advanced machine learning analyzes your cloud usage patterns across AWS and Azure, 
              automatically suggesting rightsizing and scheduling optimizations to reduce costs by up to 40%.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-card text-center transition-spring hover:shadow-elegant">
                  <CardHeader>
                    <div className="mx-auto gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* File Upload Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Start Your Analysis</h2>
              <p className="text-muted-foreground text-lg">
                Upload your cloud usage data to get personalized optimization recommendations
              </p>
            </div>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-elegant">
          <CardHeader className="text-center">
            <div className="mx-auto gradient-primary w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-glow">
              <Brain className="h-8 w-8 text-white animate-pulse" />
            </div>
            <CardTitle className="text-xl">Analyzing Your Data</CardTitle>
            <CardDescription>
              Our ML algorithms are processing your cloud usage patterns...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-primary rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Identifying optimization opportunities
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cloud Cost Optimization Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered insights and recommendations for your cloud infrastructure
          </p>
        </div>

        {/* Savings Metrics */}
        <div className="mb-8">
          <SavingsMetrics savings={dashboardData.savings} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CostTrendChart data={dashboardData.trends} />
          <Card className="shadow-card">
            <CardHeader className="gradient-card">
              <CardTitle>Optimization Summary</CardTitle>
              <CardDescription>Key findings from your cloud analysis</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                  <span className="text-sm font-medium">Overprovisioned Instances</span>
                  <Badge variant="secondary">{dashboardData.instanceData.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <span className="text-sm font-medium">Potential Monthly Savings</span>
                  <Badge variant="outline">${dashboardData.savings.monthly.toLocaleString()}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <span className="text-sm font-medium">Optimization Score</span>
                  <Badge className="gradient-primary text-white">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instance Optimization */}
        <InstanceOptimization instances={dashboardData.instanceData} />
      </div>
    </div>
  );
};