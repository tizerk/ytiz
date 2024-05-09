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
          className={`rounded-[14px] border-2 border-stone-50 border-text transition-all delay-0 duration-200 ease-out ${props.colorTheme === "violet" ? "data-[state=checked]:bg-violet-700" : props.colorTheme === "blue" ? "data-[state=checked]:bg-blue-700 " : props.colorTheme === "green" ? "data-[state=checked]:bg-green-700" : props.colorTheme === "rose" ? "data-[state=checked]:bg-rose-700" : "data-[state=checked]:bg-orange-700"}`}
        />
        <Label
          className="cursor-pointer bg-text bg-clip-text text-center text-lg font-semibold text-transparent"
          htmlFor={props.id}
        >
          {props.label}
        </Label>
      </div>
    </>
  );
}

export default ToggleSwitch;
