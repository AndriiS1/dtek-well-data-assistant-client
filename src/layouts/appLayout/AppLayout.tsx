import { setTokenFetcher } from "@/api/clients";
import { SignOutButton, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const AppLayout = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenFetcher(() =>
      getToken({ template: import.meta.env.VITE_TOKEN_TEMPLATE })
    );
  }, [getToken]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <nav className="bg-white border-b border-gray-200 w-full py-3 px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex gap-10 items-center h-full">
          <Link to="/" className="flex items-center">
            <img
              src="/Dtek-logo.png"
              alt="DTEK Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center h-full gap-1">
            <NavLink
              to="/"
              className={({ isActive }) => `
                relative px-4 py-2 text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "text-blue-600 after:absolute after:-bottom-3.25 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                }
              `}
            >
              Асети
            </NavLink>
          </div>
          <div className="flex items-center h-full gap-1">
            <NavLink
              to="/insights"
              className={({ isActive }) => `
                relative px-4 py-2 text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "text-blue-600 after:absolute after:-bottom-3.25 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                }
              `}
            >
              Інсайти
            </NavLink>
          </div>
        </div>

        <SignOutButton signOutOptions={{ redirectUrl: "/" }}>
          <button className="text-gray-500 hover:text-rose-600 transition-colors cursor-pointer text-sm font-semibold px-4 py-2 rounded-md hover:bg-rose-50">
            Вийти
          </button>
        </SignOutButton>
      </nav>

      <main className="flex-1 overflow-hidden bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
