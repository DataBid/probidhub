import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Building2, HardHat } from "lucide-react";

interface RoleSelectProps {
  value: "gc" | "sub" | null;
  onChange: (value: "gc" | "sub") => void;
}

export const RoleSelect = ({ value, onChange }: RoleSelectProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-semibold">I am a:</Label>
      <RadioGroup
        value={value || undefined}
        onValueChange={(val: "gc" | "sub") => onChange(val)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="relative flex items-center space-x-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
          <RadioGroupItem value="gc" id="gc" className="absolute right-4" />
          <Building2 className="h-5 w-5" />
          <Label htmlFor="gc" className="cursor-pointer">
            <div className="font-semibold">General Contractor</div>
            <p className="text-sm text-muted-foreground">
              Post projects and manage bids
            </p>
          </Label>
        </div>
        <div className="relative flex items-center space-x-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
          <RadioGroupItem value="sub" id="sub" className="absolute right-4" />
          <HardHat className="h-5 w-5" />
          <Label htmlFor="sub" className="cursor-pointer">
            <div className="font-semibold">Subcontractor</div>
            <p className="text-sm text-muted-foreground">
              Receive and respond to bids
            </p>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};