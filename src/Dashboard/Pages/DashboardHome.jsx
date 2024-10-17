import React, { useContext, useEffect, useState } from "react";
import HomeTopNav from "../Component/DashboardNavs/HomeTopNav";
import LeftNav from "../Component/leftNav/LeftNav";
import DashboardCom from "../Component/DashboardComponent/DashboardCom";
import SavedMaterial from "./SavedMaterial";
import PyqPage from "../Pages/PyqPage";
import EbookPage from "../Pages/EbookPage";
import VideoPage from "../Pages/VideoPage";
import CoursePage from "../Pages/CoursePage";
import NotesPage from "../Pages/NotesPage";
import LivePage from "../Pages/LiveClassesPage";
import myContext from "../../components/context/myContext";
import CommingSoon from "./CommingSoon";
import Loader from "../../components/Loader/Loader";
import SkeletonEffectCard from "../../components/skeletonEffect/SkeletonEffectCard";

const DashboardHome = () => {
  const context = useContext(myContext);
  const { fetchProfileData, profileData, loader } = context;
  const [LocalStorageData, setLocalStorageData] = useState();

  const [opneLeftNav, setOpenLeftNav] = useState(false);
  const [currPage, setCurrPage] = useState("dashboard");

  const opneLeftNavFun = () => {
    setOpenLeftNav(true);
  };
  const closeLeftNavFun = () => {
    setOpenLeftNav(false);
  };

  useEffect(() => {
    setOpenLeftNav(true);
    const getCall = async () => {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      if (datavalue?.data.createdProfile == true) {
        console.log(datavalue);
        await fetchProfileData();
      } else {
        console.log(datavalue);
        
        setLocalStorageData(datavalue?.data);
      }
    };
    getCall();
  }, []);

  return (
    <div className=" w-full relative h-full ">
      {loader && (
        <div className="w-full h-full bg-[#ffffff] top-0 left-0  z-50 absolute flex items-center justify-center">
          <SkeletonEffectCard/>
        </div>
      )}

      <HomeTopNav
        opneLeftNavFun={opneLeftNavFun}
        currPage={currPage}
        localData={LocalStorageData}
      />
      <LeftNav
        closeLeftNavFun={closeLeftNavFun}
        opneLeftNav={opneLeftNav}
        setCurrPage={setCurrPage}
      />

      {currPage == "dashboard" && <DashboardCom localData={LocalStorageData} />}
      {currPage == "saved" && <SavedMaterial />}
      {currPage == "pyqs" && <PyqPage />}
      {currPage == "ebooks" && <CommingSoon />}
      {currPage == "videos" && <VideoPage />}
      {currPage == "notes" && <CommingSoon />}
      {currPage == "courses" && <CommingSoon />}
      {currPage == "live" && <CommingSoon />}
      {currPage == "help" && <CommingSoon />}
      {/* {currPage=="help" &&   } */}
    </div>
  );
};

export default DashboardHome;
