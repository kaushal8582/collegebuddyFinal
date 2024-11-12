import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate  } from "react-router-dom";
import logo from "../../assets/resources/img/college-buddy-logo-02.svg";
import hamburgerIcon from "../../assets/resources/svgs/hamburger_icon.svg";
import NavbarMenu from "../Navigation/NavbarMenu";
import { useContext } from "react";
import myContext from "../context/myContext";

const Nav = () => {
  const contex = useContext(myContext);
  const { isAdmin, setIsAdmin, isLogin, setIsLogin } = contex;

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState("kau");

  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handelChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(value); 
    }
  };

  return (
    <div>
      <nav className="fixed nav top-0 left-0 w-full h-24 bg-white border-b border-[#c7c7c7] bg-opacity-70 backdrop-blur-lg backdrop-saturate-180 z-50 items-center flex justify-between xl:px-24 max-md-xs:px-3">
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              alt="College Buddy Logo"
              className="w-32 h-32 sm:h-32"
            />
          </Link>
        </div>
        <div
          id="rightNav"
          className="flex md:items-center justify-center gap-9 lg:flex"
        >
          <Link to={"/"}>
            <li className="list-none text-xl cursor-pointer relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400  rounded-md transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </li>
          </Link>
          <select
            onChange={handelChange}
            defaultValue={""}
            className="text-[20px] bg-transparent"
          >
            <option value={""}>Study Material</option>
            <option value={"/pyq"}>PYQs</option>
            <option value={"/ebooks"}>E-Books</option>
            <option value={"/video"}>Videos</option>
            {/* <option value={"/notes"}>Notes</option> */}
          </select>

          {
            <Link to={"/team"}>
              <li className="list-none text-xl cursor-pointer relative group">
                Team
                <span className="absolute w-0 h-0.5 bg-gray-400 bottom-0 left-0 rounded-md transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </li>
            </Link>
          }

          {/* <select onChange={handelChange} defaultValue={""} className="text-[20px] bg-transparent" >
            <option value={""}  >Course</option>
            
          </select> */}

          {isAdmin == true ? (
            <Link to={"/admindashboard"}>
              <li className="list-none text-xl cursor-pointer relative group">
                Admin
                <span className="absolute w-0 h-0.5 bg-gray-400 bottom-0 left-0 rounded-md transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </li>
            </Link>
          ) : (
            ""
          )}

          {isLogin == false ? (
            <Link to="/login">
              <li className="sign hoverbtn button flex items-center justify-center w-32 h-12 bg-[#79B058] text-white rounded-md cursor-pointer">
                Sign in
              </li>
            </Link>
          ) : (
            <Link to="/Dashboard">
              <li className="sign hoverbtn button flex items-center justify-center w-32 h-12 bg-[#79B058] text-white rounded-md cursor-pointer">
                Dashboard
              </li>
            </Link>
          )}
        </div>
        <div className="hidden hamburger">
          <img
            src={hamburgerIcon}
            alt="Menu"
            className="h-10 object-cover cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </nav>

      {/* Conditionally Render NavbarMenu */}
      {menuOpen && <NavbarMenu closeMenu={toggleMenu} />}
    </div>
  );
};

export default Nav;
