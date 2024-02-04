import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function ToggleSwitch(props) {
  return (
    <>
      <div className=""></div>
      <div className="flex flex-row items-center justify-center gap-3">
        <Switch
          id={props.id}
          checked={props.checked}
          onCheckedChange={props.onCheckedChange}
          className="border-2"
        />
        <Label htmlFor={props.id}>{props.label}</Label>
      </div>
    </>
  );
}

export default ToggleSwitch;
