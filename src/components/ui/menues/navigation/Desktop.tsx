import type { NavigationalData } from "@/types/navigation";
import { NavLink } from "react-router";

export function NavBarDesktop({ links }: { links: NavigationalData[] }) {
  return (
    <nav>
      {links.map((item) => (
        <NavLink
          key={item.label}
          to={item.href}
          className={({ isActive }) =>
            `text-white p-4 ${isActive ? "text-yellow-400 underline" : ""}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
