import type { NextPage } from "next";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";

const Navbar: NextPage = () => {
  const session = useSession();

  return (
    <nav className="bg-black md:px-16 md:flex md:justify-between text-center">
      <div className="flex justify-around">
        <NavItem text="home" href="" /> <NavItem text="vote" href="vote" />
      </div>

      {/* Hidden on mobile */}
      <div className="hidden md:flex">
        {session.status === "authenticated" && (
          <NavItem text="profile" href="profile" />
        )}
        <NavItem auth />
      </div>
    </nav>
  );
};

export default Navbar;
