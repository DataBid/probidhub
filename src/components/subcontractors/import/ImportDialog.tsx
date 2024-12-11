import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ImportDialog({ open, onOpenChange, onSuccess }: ImportDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const rows = text.split('\n');
        const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
        
        const subcontractors = rows.slice(1)
          .filter(row => row.trim())
          .map(row => {
            const values = row.split(',').map(v => v.trim());
            const sub: any = {};
            headers.forEach((header, index) => {
              if (values[index]) {
                sub[header] = values[index].replace(/^"(.*)"$/, '$1');
              }
            });
            return {
              ...sub,
              gc_id: user.id,
              status: 'active',
              company_type: 'subcontractor'
            };
          });

        const { error } = await supabase
          .from('companies_directory')
          .insert(subcontractors);

        if (error) throw error;

        toast({
          title: "Import successful",
          description: `${subcontractors.length} subcontractors imported successfully.`,
        });
        
        onSuccess();
        onOpenChange(false);
      } catch (error) {
        console.error('Import error:', error);
        toast({
          title: "Import failed",
          description: "Please check your CSV file format and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Subcontractors</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload a CSV file with the following headers:
            name, company, trade, email, phone, location, notes
          </p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label 
              htmlFor="csv-upload" 
              className={`
                flex flex-col items-center justify-center w-full h-32
                border-2 border-dashed rounded-lg
                cursor-pointer hover:bg-gray-50
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">
                {isLoading ? 'Importing...' : 'Click to upload CSV'}
              </span>
            </label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              const headers = ['name', 'company', 'trade', 'email', 'phone', 'location', 'notes'];
              const csvContent = headers.join(',');
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'subcontractors_template.csv';
              a.click();
            }}
          >
            Download Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}