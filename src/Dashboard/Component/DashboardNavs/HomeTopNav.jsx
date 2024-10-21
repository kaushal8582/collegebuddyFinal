import React, { useContext } from "react";
import NavProfile from "../NavProfile";
import navIConClose from "../../../assets/College Buddy Website/nav-bar-closed-iconICONS.svg";
import searchIcon from "../../../assets/College Buddy Website/search-iconICONS-1.svg";
import CoursePage from "../../Pages/CoursePage";
import NotesPage from "../../Pages/NotesPage";
import VideoPage from "../../Pages/VideoPage";
import EbookPage from "../../Pages/EbookPage";
import LiveClassesPage from "../../Pages/LiveClassesPage";
import myContext from "../../../components/context/myContext";

const HomeTopNav = ({ opneLeftNavFun, currPage,localData }) => {

  const context = useContext(myContext);
  const {profileData} = context;

  return (
    <div className="w-full sticky top-0  left-0 z-40 flex items-center justify-between bg-white h-[100px] max-lg-xs:pl-6  pl-[98px] pr-8 max-md-xs:pr-3">
      <div className="flex gap-3 items-center justify-start">
        <img
          className="cursor-pointer hidden max-lg-xs:flex max-md-xs:h-[8vw]"
          onClick={opneLeftNavFun}
          src={navIConClose}
          alt=""
        />
        {currPage == "dashboard" && (
          <>
            {" "}
            <h1 className="text-[32px] max-md-xs:text-[5vw] font-bold">
              Hii, <span className="text-[#79B058]">{profileData?.userId?.name.split(" ")[0] || localData?.name} 👋</span>{" "}
            </h1>{" "}
          </>
        )}
        {currPage == "saved" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
              Saved Material
            </h1>
          </>
        )}
        {currPage == "pyqs" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
              PYQs
            </h1>
          </>
        )}
        {currPage == "videos" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
            Videos
            </h1>
          </>
        )}
        {currPage == "ebooks" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
            E-books
            </h1>
          </>
        )}
        {currPage == "notes" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
            Notes
            </h1>
          </>
        )}
        {currPage == "courses" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
            Courses
            </h1>
          </>
        )}
        {currPage == "live" && (
          <>
            {" "}
            <h1 className="text-[2vw] text-[#1E1E1E80] font-semibold max-lg-xs:text-[4vw] ">
            Live
            </h1>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-5">
        { (currPage == "saved"  ) && (
          <div className="h-12 border-2 w-[25vw] rounded-full overflow-hidden flex justify-between">
            <input
              className="w-[88%] h-full rounded-full pl-4 outline-none "
              type="search"
              placeholder="Search"
            />
            <div className="w-[12%] grid place-items-center cursor-pointer h-full rounded-full border-2 max-lg-xs:hidden ">
              <img className="h-7" src={searchIcon} alt="" />
            </div>
          </div>
        )}
        <NavProfile localData={localData}/>
      </div>
    </div>
  );
};

export default HomeTopNav;
