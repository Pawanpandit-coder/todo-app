// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className=" text-gray-300 mt-10 fixed bottom-0 left-0 right-0">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">Todal</h2>
          <p className="text-sm text-gray-400">
            Stay organized, stay productive 🚀
          </p>
        </div>

        {/* Center */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Todo App. All rights reserved.
        </div>

        {/* Right */}
        {/* <div className="flex gap-4">
          <a href="#" className="hover:text-sky-400 transition">
            Privacy
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            Terms
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            Contact
          </a>
        </div> */}

      </div>
    </footer>
  );
}

export default Footer;