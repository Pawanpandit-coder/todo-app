import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";
import Logout from "./Logout";
import { LoginContext } from "../context/LoginContext";

function Navbar() {
  const { isLoggedIn } = useContext(LoginContext);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const userData = JSON.parse(localStorage.getItem("data"));

  return (
    <header className="px-4 py-1 relative">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="text-2xl font-black">Todal</div>
        <div className="flex justify-center items-center gap-8">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </div>
        <div className="flex justify-center items-center">
          {isLoggedIn && <span>{userData.name}</span>}
          {isLoggedIn ? (
            <MdAccountCircle
              className="text-4xl"
              onClick={() => setShowAccountInfo(!showAccountInfo)}
            />
          ) : (
            <Link
              to={"/login"}
              className="border rounded-full px-2 py-1 font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {showAccountInfo && <Logout />}
    </header>
  );
}

export default Navbar;
