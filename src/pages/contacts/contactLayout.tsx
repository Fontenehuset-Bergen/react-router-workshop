import { NavLink, Outlet } from "react-router";
import contactList from "@/data/contacts/details.json"

export default function Layout() {
  return (
    <main>
      <aside>
        <NavLink to={"/contacts/"}>
          <p>Go Back</p>
        </NavLink>
        {contactList.map((contact, index) => (
          <NavLink key={contact.name + index} to={"/contacts/details/" + index}>
            <p>{contact.name}</p>
          </NavLink>
        ))}
      </aside>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
