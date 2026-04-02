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
    <header className=" relative p-5">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="text-2xl font-black">Todal</div>
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
              className="border rounded-full px-3 py-1 font-semibold"
            >
              Sign-in
            </Link>
          )}
        </div>
      </div>
      {showAccountInfo && <Logout />}
    </header>
  );
}

export default Navbar;
