import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  text?: string;
  href?: string;
  auth?: boolean;
}

const NavItem: NextPage<Props> = ({ text, href, auth }) => {
  const session = useSession();

  if (auth && session.status === "loading") return <></>;

  return (
    <div className="p-3 text-sm md:text-md w-full">
      {!auth ? (
        <a
          className="block px-3 md:px-5 py-4 rounded-xl hover:bg-gray-700 cursor-pointer duration-100 text-white"
          href={`/${href}`}
        >
          {text}
        </a>
      ) : (
        <span
          onClick={
            session.status === "authenticated"
              ? () => signOut()
              : () => signIn()
          }
          className="block px-3 md:px-5 py-4 rounded-xl hover:bg-gray-700 cursor-pointer duration-100 text-white whitespace-nowrap"
        >
          <span className="text-nowrap">
            {session.status === "authenticated" ? "sign out" : "sign in"}
          </span>
        </span>
      )}
    </div>
  );
};

export default NavItem;
