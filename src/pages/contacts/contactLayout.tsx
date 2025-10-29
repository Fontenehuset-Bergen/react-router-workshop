import { NavLink, Outlet } from "react-router";
import contactList from "@/data/contacts/details.json"

export default function Layout() {
  return (
    <main className="flex !flex-row gap-6">
      <aside className="flex flex-col gap-2">
        <NavLink to={"/contacts/"} className="text-center">
          <p>Return</p>
        </NavLink>
        {contactList.map((contact, index) => (
          <NavLink key={contact.name + index} to={"/contacts/details/" + index} className="p-2 border rounded-md">
            <p>{contact.name}</p>
          </NavLink>
        ))}
      </aside>
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </main>
  );
}
