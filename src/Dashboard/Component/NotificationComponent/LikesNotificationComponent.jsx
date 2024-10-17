import React from "react";
import profilePic from "../../../assets/College Buddy Website/Artboard 1 2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";

const LikesNotificationComponent = () => {
  return (
    <div className="w-full p-5 bg-white rounded-2xl flex items-center justify-between ">
      <div className="flex items-center justify-center gap-4" >
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <div
          className={`h-[37px] max-md-xs:h-[33px] max-md-xs:w-[33px] p-[2px]   
             "bg-[#efa83e]" : "bg-[#79B058]"
          } w-[37px]  rounded-full border-2   relative `}
        >
          <img
            className="w-full h-full object-cover rounded-full"
            src={profilePic}
            alt=""
          />
          { (
            <img
              src={graduatioCap}
              alt=""
              className="absolute top-[-30%] scale-90 right-[-30%]"
            />
          )}
        </div>
        <div>
          <h2 className="text-[#1E1E1EBF]" >Harshit Singh <span className="text-[#1E1E1E80]">liked your profile</span> </h2>
          <h3 className="text-[#1E1E1E80] text-[12px]" > 2 days ago</h3>
        </div>
      </div>
      <div>
        <button className="border border-[#1E1E1E40] text-[#1E1E1E80] px-4 py-2 rounded-full" >View Profile</button>
      </div>
    </div>
  );
};

export default LikesNotificationComponent;
