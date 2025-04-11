
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { downloadUsersTemplate } from './ExcelTemplates';

interface BulkUploadUsersProps {
  onSuccess?: () => void;
}

const BulkUploadUsers = ({ onSuccess }: BulkUploadUsersProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is Excel
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && 
          file.type !== 'application/vnd.ms-excel') {
        toast.error('Please select an Excel file (.xlsx or .xls)');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    
    // In a real app, we would send the file to the server
    // For now, just show a success message
    toast.success(`${selectedFile.name} uploaded successfully. Processing data...`);
    
    // Simulate processing
    setTimeout(() => {
      toast.success(`Users imported successfully`);
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('users-file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Upload Users</CardTitle>
        <CardDescription>Import users in bulk using Excel templates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Users Import Template</h3>
          <p className="text-sm text-muted-foreground">
            Download the template, fill it with user data and upload it back.
          </p>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={downloadUsersTemplate}
          >
            <Download size={16} />
            Download Template
          </Button>
        </div>
        
        <div className="border rounded-lg p-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="users-file-upload" className="block text-sm font-medium">
              Upload Users Excel File
            </label>
            <Input 
              id="users-file-upload" 
              type="file" 
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: .xlsx, .xls (Excel)
            </p>
          </div>
          
          {selectedFile && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md">
              <p className="text-sm"><strong>Selected:</strong> {selectedFile.name}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleUpload}
          className="flex items-center gap-2"
          disabled={!selectedFile}
        >
          <Upload size={16} />
          Upload and Process
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BulkUploadUsers;
