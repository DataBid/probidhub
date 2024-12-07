import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RoleSelectProps {
  value: "gc" | "sub" | null;
  onChange: (value: "gc" | "sub") => void;
}

export const RoleSelect = ({ value, onChange }: RoleSelectProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base">I am a:</Label>
      <RadioGroup
        value={value || undefined}
        onValueChange={(val: "gc" | "sub") => onChange(val)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="gc" id="gc" />
          <Label htmlFor="gc">General Contractor</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sub" id="sub" />
          <Label htmlFor="sub">Subcontractor</Label>
        </div>
      </RadioGroup>
    </div>
  );
};