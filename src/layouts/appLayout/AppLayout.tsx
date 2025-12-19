import { setTokenFetcher } from "@/api/clients";
import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenFetcher(() =>
      getToken({ template: import.meta.env.VITE_TOKEN_TEMPLATE })
    );
  }, [getToken]);

  return (
    <>
      <nav className="bg-black text-white w-full py-4 px-6 flex items-center justify-between">
        <Link
          to="/"
          className="hover:text-gray-400 transition-colors text-6xl text-yellow-400 font-bold"
        >
          DTEK
        </Link>
        <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
          <button className="hover:text-yellow-400 transition-colors cursor-pointer uppercase text-sm font-medium">
            вийти
          </button>
        </SignOutButton>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
