import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/wells">Wells</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
