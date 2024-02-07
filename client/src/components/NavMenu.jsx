import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function NavMenu(props) {
  return (
    <NavigationMenu className="absolute top-16 scale-[75%] rounded-3xl border-[2px] border-[#9b96a7] bg-gradient-to-b from-nav_top to-nav_bot px-2 py-1 font-medium backdrop-blur-sm min-[540px]:scale-100">
      <NavigationMenuList className="gap-2 text-lg">
        <NavigationMenuItem
          className={`px-5 py-2 transition delay-0 duration-500 hover:text-text ${props.location == "/" ? "rounded-3xl bg-gradient-radial from-gray-500 text-text" : " text-slate-300 hover:drop-shadow-glow"}`}
        >
          <Link to="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={`px-5 py-2 transition delay-0 duration-500 hover:text-text ${props.location == "/changelog" ? "rounded-3xl bg-gradient-radial from-gray-500 text-text" : " text-slate-300 hover:drop-shadow-glow "}`}
        >
          <Link to="/changelog">Changelog</Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={`px-5 py-2 transition delay-0 duration-500 hover:text-text ${props.location == "/faq" ? "rounded-3xl bg-gradient-radial from-gray-500 text-text" : " text-slate-300 hover:drop-shadow-glow "}`}
        >
          <Link to="/faq">FAQ</Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={`px-5 py-2 transition delay-0 duration-500 hover:text-text ${props.location == "/socials" ? "rounded-3xl bg-gradient-radial from-gray-500 text-text" : " text-slate-300 hover:drop-shadow-glow "}`}
        >
          <Link to="/socials">Socials</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
