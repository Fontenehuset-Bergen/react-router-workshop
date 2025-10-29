import { SiteLogo } from "@/components/ui/images/siteLogo";
import { NavBarDesktop } from "@/components/ui/menues/navigation/Desktop";
import navData from "@/data/navigation/links.json";

export function Header() {
  return (
    <header className="z-10 fixed top-0 w-full py-2 bg-gradient-to-br from-orange-500 to-purple-700 shadow-xl shadow-stone-800">
      <span className="container flex justify-between mx-auto">
        <SiteLogo isInverted/>
        <NavBarDesktop links={navData} />
      </span>
    </header>
  );
}
