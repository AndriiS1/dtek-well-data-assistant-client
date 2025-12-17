import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <nav className="bg-black text-white w-full py-4 px-6 flex  items-center gap-8">
        <Link
          to="/"
          className="hover:text-gray-400 transition-colors text-6xl text-yellow-400 font-bold"
        >
          DTEK
        </Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
