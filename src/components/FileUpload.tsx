import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (data: any) => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate file processing
      setTimeout(() => {
        // Mock data parsing for cloud usage CSV
        const mockData = {
          instanceData: [
            { id: 'i-1234', type: 't3.large', usage: 85, cost: 156.00, recommendation: 't3.medium' },
            { id: 'i-5678', type: 'm5.xlarge', usage: 45, cost: 287.50, recommendation: 'm5.large' },
            { id: 'i-9012', type: 'c5.2xlarge', usage: 78, cost: 421.20, recommendation: 'c5.xlarge' },
          ],
          trends: Array.from({ length: 12 }, (_, i) => ({
            month: `Month ${i + 1}`,
            currentCost: Math.floor(Math.random() * 5000) + 3000,
            predictedCost: Math.floor(Math.random() * 4000) + 2500,
            optimizedCost: Math.floor(Math.random() * 3000) + 2000,
          })),
          savings: {
            monthly: 1247.80,
            annual: 14973.60,
            percentage: 23.5
          }
        };
        
        onFileUpload(mockData);
        setIsProcessing(false);
      }, 2000);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  return (
    <Card className="shadow-card">
      <div
        {...getRootProps()}
        className={cn(
          "p-8 border-2 border-dashed rounded-lg transition-smooth cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
          isProcessing && "opacity-50 pointer-events-none"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="text-center space-y-4">
          {uploadedFile ? (
            <div className="space-y-4">
              <CheckCircle className="mx-auto h-12 w-12 text-success" />
              <div>
                <h3 className="text-lg font-semibold">File Uploaded Successfully</h3>
                <p className="text-muted-foreground">{uploadedFile.name}</p>
              </div>
              {isProcessing && (
                <div className="space-y-2">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full gradient-primary animate-pulse rounded-full w-3/4"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Processing your cloud usage data...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Upload Cloud Usage Data</h3>
                <p className="text-muted-foreground">
                  Drop your CSV, JSON, or TXT files here, or click to browse
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  Supports AWS Cost Explorer exports, Azure cost data
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {!uploadedFile && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Expected Data Format:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Instance ID, Type, CPU Usage, Memory Usage, Cost</li>
            <li>• Historical usage data for trend analysis</li>
            <li>• Supports both AWS and Azure formats</li>
          </ul>
        </div>
      )}
    </Card>
  );
};