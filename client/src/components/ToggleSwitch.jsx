import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function ToggleSwitch(props) {
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <Switch
          id={props.id}
          checked={props.checked}
          onCheckedChange={props.onCheckedChange}
          className="rounded-[14px] border-2 border-stone-50 border-text transition-all delay-0 duration-200 ease-out  data-[state=checked]:bg-[#5c4392] "
        />
        <Label
          className="cursor-pointer bg-gradient-to-b from-text to-text_fade bg-clip-text text-center text-lg font-semibold text-transparent"
          htmlFor={props.id}
        >
          {props.label}
        </Label>
      </div>
    </>
  );
}

export default ToggleSwitch;
