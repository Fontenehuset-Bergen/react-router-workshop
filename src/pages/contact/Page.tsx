import { NavLink, Outlet } from "react-router";

export default function Page() {
  return (
    <main>
      <section>
        <h1>Form submission</h1>
        <p>
          You can click the link bellow to see different ways to deal with forms
        </p>
        <span>
          <NavLink
            to={"/contact/client"}
            className={({ isActive }) =>
              ` ${isActive ? "!underline !text-orange-400" : ""}`
            }
          >
            Clean Client
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              ` ${isActive ? "!underline !text-orange-400" : ""}`
            }
            to={"/contact/fetcher"}
          >
            Client with fetcher
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "!underline !text-orange-400" : ""}`
            }
            to={"/contact/server"}
          >
            Server Action
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              ` ${isActive ? "!underline !text-orange-400" : ""}`
            }
            to={"/contact/validation"}
          >
            Server action with validation
          </NavLink>
        </span>
        <hr />
        <Outlet />
      </section>
    </main>
  );
}
