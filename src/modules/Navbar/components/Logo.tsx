import React from "react";
import logo from "src/assets/logo.png";

const Logo: React.FC = () => (
  <div className="flex items-center mb-4">
    <img src={logo} alt="Logo" className="mr-2 h-12 w-12" />
    <h1 className="text-3xl font-bold">robobread</h1>
  </div>
);

export default Logo;
