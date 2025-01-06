import type { NextPage } from "next";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";

const TopNav: NextPage = () => {
  const session = useSession();

  // Only on mobile
  return (
    <nav className="bg-black text-center md:hidden">
      <div className="flex justify-between">
        {session.status === "authenticated" && (
          <NavItem text="profile" href="profile" />
        )}
        <NavItem auth />
      </div>
    </nav>
  );
};

export default TopNav;
