import { NavLink, Outlet } from "react-router";

export default function Page() {
  return (
    <main>
      <section>
        <h1>Form submissions</h1>
        <p>
          Du kan klikke på linkene under for å se de forskjellige måtene å
          håndtere forms på
        </p>
        <span className="flex gap-2 justify-between">
          <NavLink
            to="/contact/client"
            className={({ isActive }) =>
              `${isActive ? "!underline !text-orange-400" : ""}`
            }
          >
            Ren klient
          </NavLink>
          <NavLink
            to="/contact/fetcher"
            className={({ isActive }) =>
              `${isActive ? "!underline !text-orange-400" : ""}`
            }
          >
            Klient med fetcher
          </NavLink>
          <NavLink
            to="/contact/server"
            className={({ isActive }) =>
              `${isActive ? "!underline !text-orange-400" : ""}`
            }
          >
            Server actions
          </NavLink>
          <NavLink
            to="/contact/validation"
            className={({ isActive }) =>
              `${isActive ? "!underline !text-orange-400" : ""}`
            }
          >
            Server actions med validering
          </NavLink>
        </span>
        <hr />
        <Outlet />
      </section>
    </main>
  );
}
