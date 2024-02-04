import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/faq">FAQ</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/socials">Socials</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/changelog">Changelog</Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavMenu;
