import React from "react";
import Logo from "./assets/logo.fa0358462da782a08a707593680a37b8.svg";

const Header = () => {
  return (
    <header className="flex items-center p-4 ">
      <img src={Logo} alt="Logo" className="w-16 h-16" />
      <h1 className="text-xl font-bold ml-4">My App</h1>
    </header>
  );
};

export default Header;
