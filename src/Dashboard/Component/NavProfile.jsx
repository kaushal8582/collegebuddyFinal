import React, { useContext } from "react";
import notification from "../../assets/resources/svgs/notifi.svg";
import ProfilePic from "./ProfilePicComponent/ProfilePic";
import myContext from "../../components/context/myContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const NavProfile = ({ localData }) => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { profileData } = context;

  const handelViewProfil = () => {
    if (profileData?.userId?.name) {
      navigate("/profile");
    } else {
      navigate("/editprofile");
    }
  };
  const handelNotificaionClick = () => {
    navigate("/notification");
  };
  return (
    <div className=" flex items-center cursor-pointer justify-center gap-8 max-md-xs:gap-1 h-[48px] rounded-full">
      <div
        onClick={handelNotificaionClick}
        className="h-[48px] w-[48px] max-md-xs:w-[35px] max-md-xs:h-[35px] rounded-full grid place-items-center border-2"
      >
        <img src={notification} alt="notification section" />
      </div>
      <div
        onClick={handelViewProfil}
        className="h-full border-2 flex items-center justify-center px-3 gap-3 max-md-xs:px-1 max-md-xs:py-1 rounded-full"
      >
        {/* <div className='h-[37px] p-[2px] bg-[#efa83e] w-[37px] rounded-full border-2 relative ' >
                <img src={profilePic} alt="" />
                <img src={graduatioCap} alt=""  className='absolute top-[-30%] scale-90 right-[-30%]' />
            </div> */}
        <ProfilePic height={"37px"} width={"37px"} profileData={profileData} />
        <h3 className="font-semibold">
          {profileData?.userId?.name || localData?.name}
        </h3>
      </div>
    </div>
  );
};

export default NavProfile;
