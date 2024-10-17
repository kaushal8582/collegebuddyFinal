import React, { useState } from "react";
import BackIcon from "../../assets/College Buddy Website/profile-iconICONS.svg";
import doubleTick from "../../assets/College Buddy Website/charm_tick-double.svg";
import { useNavigate } from "react-router-dom";
import LikesNotificationComponent from "../Component/NotificationComponent/LikesNotificationComponent";
import EventNotification from "../Component/NotificationComponent/EventNotification";

const Notification = () => {
  const navigate = useNavigate();
  const [active,setActive]= useState('New')

  const BackBtn = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="w-full h-[80px] max-md-xs:h-[70px] bg-[#ffffff]  border-b-2 border-[#1E1E1E40] overflow-hidden flex items-center justify-between p-5 max-sm-xs:p-2">
        <div className="flex items-center gap-5 max-sm-xs:gap-2 ">
          <div
            onClick={BackBtn}
            className="grid cursor-pointer place-items-center w-12 h-12 max-md-xs:w-8 max-md-xs:h-8   rounded-full border-2"
          >
            <img src={BackIcon} alt="" />
          </div>
          <h1 className="text-[1.7vw] text-[#1E1E1E80] font-bold  max-md-xs:text-[6vw]  ">
            Notification
          </h1>
        </div>

        <button className="border-2 px-4 py-2 max-md-xs:text-[13px] rounded-full flex items-center justify-center gap-1 text-[#1E1E1EBF] " >
        <img src={doubleTick} alt="" />
         <h2>Mark all as read</h2>
        </button>
      </div>

      <div className="w-full h-[51px] flex items-center justify-start pl-4 gap-2 bg-white" >
        <button onClick={()=> setActive("New")} className={`border-2 p-1 px-5 rounded-full text-[#1E1E1E80] ${active=="New"?"bg-[#79B05833] border-[#1E5000] text-[#1E5000]":""} `} > New</button>
        <button onClick={()=> setActive("Likes")} className={`border-2 p-1 px-5 rounded-full text-[#1E1E1E80] ${active=="Likes"?"bg-[#79B05833] border-[#1E5000] text-[#1E5000]":""} `} > Likes</button>
        <button onClick={()=> setActive("Event")} className={`border-2 p-1 px-5 rounded-full text-[#1E1E1E80] ${active=="Event"?"bg-[#79B05833] border-[#1E5000] text-[#1E5000]":""} `} > Event</button>
        <button onClick={()=> setActive("All")} className={`border-2 p-1 px-5 rounded-full text-[#1E1E1E80] ${active=="All"?"bg-[#79B05833] border-[#1E5000] text-[#1E5000]":""} `} > All</button>
      </div>


    <div className="p-5 flex flex-col gap-3">

      <LikesNotificationComponent/>
      <EventNotification/>

    </div>

    </div>
  );
};

export default Notification;
