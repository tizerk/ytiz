import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function Switch(props) {
  return (
    <div className="flex flex-row justify-center">
      <Checkbox
        id={props.id}
        checked={props.checked}
        onCheckedChange={props.onCheckedChange}
        className="border-2"
      />
      <Label htmlFor={props.id}>{props.label}</Label>
    </div>
  );
}

export default Switch;
