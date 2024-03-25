import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

function NavMenu(props) {
  const NavBar = useRef();
  const applyOverlayMask = (e) => {
    const x = e.pageX - NavBar.current.offsetLeft;
    const y = e.pageY - NavBar.current.offsetTop;
    document
      .querySelector("#navmenu")
      .setAttribute("style", `--NavBarX: ${x}px; --NavBarY: ${y}px;`);
  };
  useEffect(() => {
    document.body.addEventListener("pointermove", (e) => {
      applyOverlayMask(e);
    });
  }, []);
  return (
    <NavigationMenu
      id={"navmenu"}
      ref={NavBar}
      className="absolute top-16 scale-[80%] rounded-3xl border-none bg-slate-600 bg-opacity-25 from-input_top to-input_bot px-2 py-1 font-medium backdrop-blur-sm min-[425px]:scale-[90%] min-[540px]:scale-100"
    >
      <div
        style={{
          opacity: "var(--opacity, 0)",
          mask: `
                        radial-gradient(
                          12rem 12rem at var(--NavBarX) var(--NavBarY),
                          #000 1%,
                          transparent 50%
                          )`,
          WebkitMask: `
                          radial-gradient(
                            12rem 12rem at var(--NavBarX) var(--NavBarY),
                        #000 1%,
                        transparent 50%
                        )`,
        }}
        className={`pointer-events-none absolute inset-0 select-none rounded-3xl border-2 ${props.colorTheme === "violet" ? "border-violet-400" : props.colorTheme === "blue" ? "border-blue-400" : props.colorTheme === "green" ? "border-green-400" : props.colorTheme === "rose" ? "border-rose-400" : "border-orange-400"} outline-none`}
      />
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
