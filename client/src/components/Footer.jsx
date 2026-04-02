// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className=" text-gray-300 p-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">Todal</h2>
          <p className="text-sm text-gray-400">
            Stay organized, stay productive 🚀
          </p>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Todal App. All rights reserved.
        </div>
        

      </div>
    </footer>
  );
}

export default Footer;