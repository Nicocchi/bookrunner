import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Root() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/book/viewer" ? <Navbar /> : null}

      <main style={{ height: "calc(100% - 76px)", paddingTop: "30px" }}>
        <Outlet />
      </main>
    </>
  );
}
