import React from "react";
import profilePic from "../../../assets/College Buddy Website/Artboard 1 2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";

const ProfilePic = ({ height, width, profileData }) => {
  return (
    <div
      className={`h-[37px] max-md-xs:h-[33px] max-md-xs:w-[33px] p-[2px]   ${
        profileData?.userId?.name ? "bg-[#efa83e]" : "bg-[#79B058]"
      } w-[37px]  rounded-full border-2   relative `}
    >
      <img
        className="w-full h-full object-cover rounded-full"
        src={profileData?.img || profilePic}
        alt=""
      />
      {profileData?.userId?.name && (
        <img
          src={graduatioCap}
          alt=""
          className="absolute top-[-30%] scale-90 right-[-30%]"
        />
      )}
    </div>
  );
};

export default ProfilePic;
