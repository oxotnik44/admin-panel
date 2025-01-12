import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  name: string;
  to: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ name, to, isActive, onClick }) => (
  <Link
    to={to}
    className={`block p-2 rounded transition duration-200 ${
      isActive
        ? "bg-purple-500/5 text-purple-500 font-semibold"
        : "text-white hover:bg-gray-700 hover:text-gray-400"
    }`}
    onClick={onClick}
  >
    {name}
  </Link>
);

export default NavLink;
