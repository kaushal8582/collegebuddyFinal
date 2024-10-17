import React, { useContext, useEffect, useState } from "react";
import Verify from "../Verify & Add/Verify";
import ShowAd from "../ShowAd/ShowAd";
import Courses from "../Courses/Courses";
import Profile from "../Profile/Profile";
import myContext from "../../../components/context/myContext";
import courseBannerPython from "../../../assets/resources/img/image 10.png"
import courseBannerWebDev from "../../../assets/resources/img/Frame 84.png"
import courseBannerReact from "../../../assets/resources/img/react img.png"

const DashboardCom = ({ localData }) => {
  const context = useContext(myContext);
  const { profileData } = context;


  const dataArray =[
    {
      heading:"Python for beginners",
      desc:"In this course, we will learn everything about Python, from basics to advanced. So if you are a complete beginner, we..",
      duration:"13h",
      mentor:"Harshit Singh",
      img:courseBannerPython,
      level:"Beginner",
      linkRedirect:"https://wa.me/+919801907094?text=I+want+to+start+learn+Python+For+begineers"
    },
    {
      heading:"Web Development",
      desc:"In this course, we will learn everything about Web technology, from basics to advanced. So if you are a co...",
      duration:"30h",
      mentor:"Adarsh Singh",
      img:courseBannerWebDev,
      level:"Beginner",
      linkRedirect:"https://wa.me/+919801907094?text=I+want+to+start+learn+Web+Development"
    },
    {
      heading:"React (Frontend)",
      desc:"In this course, we will learn everything about Python, from basics to advanced. So if you are a complete beginner, we..",
      duration:"24h",
      mentor:"Kaushal Kumar",
      img:courseBannerReact,
      level:"Beginner",
      linkRedirect:"https://wa.me/+919801907094?text=I+want+to+start+learn+React"
    },
    {
      heading:"React (Frontend)",
      desc:"In this course, we will learn everything about Python, from basics to advanced. So if you are a complete beginner, we..",
      duration:"24h",
      mentor:"Kaushal Kumar",
      img:courseBannerReact,
      level:"Beginner",
      linkRedirect:"https://wa.me/+919801907094?text=I+want+to+start+learn+React"
    },
  ]

  return (
    <div className="w-full min-h-screen bg-gray-200 pl-[98px] max-lg-xs:pl-6 gap-8 flex flex-col overflow-hidden  p-[30px] ">
      <div className="w-full justify-between flex gap-8 max-lg-xs:flex-col ">
        <div className="w-[65%] max-lg-xs:w-full h-full flex flex-col max-lg-xs:flex-col-reverse gap-7  ">
          <Verify data={profileData} />
          <ShowAd />
        </div>
        <Profile data={profileData} localData={localData} />
      </div>
      <div className="w-full bg-white rounded-xl h-[354px] overflow-hidden ">
        <div className="flex w-full items-center justify-between p-5  border-b-2 border-dashed ">
          <h2 className="text-[24px] font-semibold max-md-xs:text-[3.3vw] ">
            Recommended for you
          </h2>
          <a href="https://wa.me/+919801907094?text=I+want+to+start+learning">
            <button className="border-2 rounded-lg px-3 py-2 max-md-xs:text-[3vw] ">
              Explore All Courses
            </button>
          </a>
        </div>
        <div className="w-full we flex items-center justify-start gap-4 ml-3 mt-3 overflow-hidden overflow-x-auto scrollbar-hide">
          {dataArray.map((item,index)=>(
            <Courses redirectLink={item.linkRedirect} desc={item.desc} heading={item.heading} img={item.img} level={item.level} mentor={item.mentor} time={item.duration} key={index} />

          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCom;
