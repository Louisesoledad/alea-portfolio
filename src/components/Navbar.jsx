import logo from "../assets/logo.png"
import { Link, NavLink } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-6 md:px-[10%] lg:px-[15%] py-6 text-white">

        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex gap-8 md:gap-12 items-center text-sm md:text-base font-semibold">

          {/* HOME */}
          <li className="group">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative transition ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </li>

          {/* ABOUT */}
          <li className="group">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative transition ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About Me
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </li>

          {/* WORKS */}
          <li className="group">
            <NavLink
              to="/works"
              className={({ isActive }) =>
                `relative transition ${
                  isActive ? "text-white" : "text-gray-300 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  My Works
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          </li>

          {/* CONTACT BUTTON */}
          <Link
            to="/#contact"
            className="px-5 py-3 text-sm font-semibold rounded-sm bg-primary text-white hover:opacity-90 transition"
          >
            Contact
          </Link>

        </ul>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-50"
        >
          <span
            className={`w-7 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          ></span>

          <span
            className={`w-7 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>

          <span
            className={`w-7 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          ></span>
        </button>

        {/* MOBILE MENU */}
        <div
          className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[60%] bg-[#1f1f1f] border-l border-white/10 backdrop-blur-xl transition-all duration-500 z-40 md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >

          <div className="flex flex-col items-start justify-center h-full px-10 gap-10 text-white text-lg font-semibold">

            {/* HOME */}
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-300"
              }
            >
              Home
            </NavLink>

            {/* ABOUT */}
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-300"
              }
            >
              About Me
            </NavLink>

            {/* WORKS */}
            <NavLink
              to="/works"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-300"
              }
            >
              My Works
            </NavLink>

            {/* CONTACT */}
            <Link
              to="/#contact"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-3 text-sm font-semibold rounded-sm bg-primary text-white hover:opacity-90 transition"
            >
              Contact
            </Link>

          </div>

        </div>

      </nav>
    </header>
  )
}

export default Navbar