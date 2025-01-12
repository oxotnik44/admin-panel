import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};
