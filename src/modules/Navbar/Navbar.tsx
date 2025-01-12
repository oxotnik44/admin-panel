// src/modules/Navbar/components/Navbar.tsx
import React, { useEffect } from "react";
import Logo from "./components/Logo";
import NavLink from "./components/NavLink";
import { useActiveLinkStore } from "./store/useActiveLink";
import { links } from "./data/link";

export const Navbar: React.FC = () => {
  const { activeLink, setActiveLink } = useActiveLinkStore(); // Получаем состояние из Zustand
  useEffect(() => {
    setActiveLink("Аналитика");
  }, []);
  return (
    <div className="bg-gray-800 text-white p-4 h-full">
      <Logo />
      <ul>
        {links.map((link) => (
          <li key={link.name} className="mb-2">
            <NavLink
              name={link.name}
              to={link.to}
              isActive={activeLink === link.name}
              onClick={() => setActiveLink(link.name)} // Обновляем активную ссылку
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
