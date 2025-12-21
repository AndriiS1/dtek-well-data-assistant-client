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
    <div className="flex flex-col h-screen overflow-hidden">
      <nav className="bg-black text-white w-full py-4 px-6 flex items-center justify-between shrink-0">
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-gray-400 transition-colors text-6xl text-yellow-400 font-bold"
          >
            DTEK
          </Link>
          <Link
            to="/insights"
            className="hover:text-yellow-400 transition-colors cursor-pointer text-sm font-medium"
          >
            Інсайти
          </Link>
        </div>
        <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
          <button className="hover:text-yellow-400 transition-colors cursor-pointer text-sm font-medium">
            Вийти
          </button>
        </SignOutButton>
      </nav>

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
