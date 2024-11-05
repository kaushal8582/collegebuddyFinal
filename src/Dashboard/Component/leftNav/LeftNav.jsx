import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/resources/img/college-buddy-logo-02.svg";
import seclogo from "../../../assets/resources/svgs/college-buddy-logo-01.svg";
import dashboard from "../../../assets/College Buddy Website/DASHBOARD ICONICONS.svg";
import noteesIcon from "../../../assets/College Buddy Website/notes-iconICONS.svg";
import savedIcon from "../../../assets/College Buddy Website/saved-iconICONS.svg";
import pyqIcon from "../../../assets/College Buddy Website/pyq-iconICONS.svg";
import Ebook from "../../../assets/College Buddy Website/ebook-iconICONS.svg";
import youtubeVideo from "../../../assets/College Buddy Website/videos-iconICONS.svg";
import liveVideo from "../../../assets/College Buddy Website/video-iconICONS.svg";
import courseIcon from "../../../assets/College Buddy Website/COURSES ICONICONS.svg";
import logoutIcon from "../../../assets/College Buddy Website/LOGOUT ICONICONS.svg";
import helpIcon from "../../../assets/College Buddy Website/help-and-support-iconICONS.svg";
import arrow from "../../../assets/College Buddy Website/arrow-down-iconICONS.svg";
import navbarOpenICon from "../../../assets/College Buddy Website/navbar-iconICONS.svg";
import { BASE_URL } from "../../../../Helper";
import { useNavigate } from "react-router-dom";
import myContext from "../../../components/context/myContext";

const LeftNav = ({ opneLeftNav, closeLeftNavFun, setCurrPage }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { isLogin, setIsLogin,setLoader } = context;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleItemClick = async (item) => {
    if (item == "logout") {
      try {
        setLoader(true)
        const datavalue = JSON.parse(localStorage.getItem("user"));
        const accessToken = datavalue?.accessToken;

        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/users/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          localStorage.removeItem("user");
          setIsLogin(false);
          navigate("/");
          return;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false)
        setActiveItem(item);
        return;
      }
    }

    setActiveItem(item);
    setCurrPage(item);
  };

  useEffect(() => {
    setIsCollapsed(false);
  }, []);

  const menuItems = [
    { name: "dashboard", icon: dashboard, label: "Dashboard" },
    { name: "saved", icon: savedIcon, label: "Saved Materials" },
    { name: "pyqs", icon: pyqIcon, label: "PYQs" },
    { name: "ebooks", icon: Ebook, label: "E-Books" },
    { name: "videos", icon: youtubeVideo, label: "Videos" },
    { name: "notes", icon: noteesIcon, label: "Notes" },
    // { name: "courses", icon: courseIcon, label: "Courses" },
    // { name: "live", icon: liveVideo, label: "Live Classes" },
    // { name: "help", icon: helpIcon, label: "Help & Support" },
    {
      name: "logout",
      icon: logoutIcon,
      label: "Log out",
      textColor: "text-[#FF0000]",
    },
  ];

  return (
    <div
      className={`h-screen z-40 max-lg-xs:w-[267px]  ${
        isCollapsed ? "w-[68px]" : "w-[227px]"
      } bg-white fixed top-0 ${
        opneLeftNav ? "left-[0%]" : "left-[-100%]"
      } left-0  flex z-20 flex-col justify-between pb-11  p-[10px] transition-all duration-300`}
    >
      <div
        className={`cursor-pointer max-lg-xs:hidden w-6 h-[100px] bg-[#d7d7d7d0] absolute top-[50%] z-[-1] ${
          isCollapsed ? "right-[-25px]" : "right-[-8%]"
        } grid place-items-center rounded-r-xl`}
        onClick={toggleCollapse}
      >
        <img
          className={`transition-transform duration-300 ${
            isCollapsed ? "-rotate-90" : "rotate-90"
          }`}
          src={arrow}
          alt="arrow"
        />
      </div>


      <div className=" flex flex-col  h-screen justify-between">

      

      <div className={`w-full flex   flex-col `}>
        <div
          className={`grid place-items-center max-lg-xs:hidden  w-full min-h-[120px] `}
        >
          <img
            className={`h-[50px]  transition-display duration-300 ${
              isCollapsed ? "hidden" : "visible"
            }`}
            src={logo}
            alt="Logo"
          />
          <img
            className={`h-[50px] transition-display  duration-300  ${
              isCollapsed ? "visible" : "hidden"
            }`}
            src={seclogo}
            alt="Secondary Logo"
          />
        </div>
        <div className="w-full hidden max-lg-xs:flex items-center justify-between py-6">
          <img
            className={`h-[50px] transition-display visible duration-300  `}
            src={seclogo}
            alt="Secondary Logo"
          />
          <img
            className="h-9 cursor-pointer"
            onClick={closeLeftNavFun}
            src={navbarOpenICon}
            alt=""
          />
        </div>
        {menuItems.slice(0, 6).map((item) => (
          <div
            key={item.name}
            onClick={() => handleItemClick(item.name)}
            className={`mt-3 flex items-center justify-start gap-4 rounded-xl p-3 h-12 w-full cursor-pointer 
              ${
                activeItem === item.name
                  ? "bg-[#79B058] text-[#1E5000]"
                  : "bg-white text-black"
              }`}
          >
            <img
              src={item.icon}
              className={`${
                activeItem === item.name ? "filter-color-[#1E5000]" : ""
              }`}
              alt={`${item.label} Icon`}
            />
            {!isCollapsed && (
              <h2
                className={`text-[20px] ${
                  activeItem === item.name ? "text-[#1E5000]" : ""
                }`}
              >
                {item.label}
              </h2>
            )}
          </div>
        ))}
      </div>

      <div>
        {menuItems.slice(6).map((item) => (
          <div
            key={item.name}
            onClick={() => handleItemClick(item.name)}
            className={`mt-3 flex items-center justify-start gap-4 rounded-xl ${item.name=="logout"?"bg-red-500":""} p-3 h-12 w-full cursor-pointer 
              ${
                activeItem === item.name
                  ? "bg-[#79B058] text-[#1E5000]"
                  : "bg-white text-black"
              } 
              ${item.textColor ? item.textColor : ""}`}
          >
            <img
              src={item.icon}
              className={`${
                activeItem === item.name ? "filter-color-[#1E5000]" : ""
              }`}
              alt={`${item.label} Icon`}
            />
            {!isCollapsed && (
              <h2
                className={`text-[20px] ${item.name=="logout"?"text-red-500":""} ${
                  activeItem === item.name ? "text-[#1E5000]" : ""
                }`}
              >
                {item.label}
              </h2>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default LeftNav;
