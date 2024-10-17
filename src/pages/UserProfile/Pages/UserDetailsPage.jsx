import React, { useContext, useEffect } from "react";
import UserSkillExperience from "../Component/UserSkillExperience";
import UserWorkExperience from "../Component/UserWorkExperience";
import UserEducation from "../Component/UserEducation";
import UserSocialMediaLInks from "../Component/UserSocialMediaLInks";
import myContext from "../../../components/context/myContext";

const UserDetailsPage = ({ onlyView, pData }) => {
  const context = useContext(myContext);
  const { profileData } = context;

  useEffect(() => {
    console.log(profileData);
  }, []);

  return (
    <div className="w-full pt-3">
      <div className="w-full p-[50px] rounded-3xl border-2">
        <h2 className="text-[2.2vw] text-[#1E1E1EBF] max-md-xs:text-[6vw]">
          “{onlyView?onlyView.bio: profileData.bio}”
        </h2>
      </div>
      {!onlyView && (
        <>
          <div className="w-full pt-9 border-2 overflow-hidden mt-8 py-12 text-[#1E1E1E80] rounded-3xl ">
            <h3 className="w-full border-b-2 pl-28 max-md-xs:pl-4 ">
              Contact Details
            </h3>
            <div className="pl-28 mt-3 flex max-md-xs:pl-4 w-full">
              <h3 className="min-w-[100px]">Email </h3>
              <h3 className="max-md-xs:text-[3.5vw]">
                {profileData?.userId?.email}
              </h3>
            </div>
            <div className="pl-28 max-md-xs:pl-4 flex mt-3  w-full">
              <h3 className="min-w-[100px]">Phone no </h3>
              <h3 className="max-md-xs:text-[3.5vw]">
                {profileData?.userId?.phoneNo}
              </h3>
            </div>
          </div>
        </>
      )}

      {(onlyView && pData?.skills?.length > 0) ||
      (!onlyView && profileData?.skills?.length > 0) ? (
        <UserSkillExperience data={onlyView ? pData : profileData} />
      ) : null}

      {(onlyView && pData?.experiences?.length > 0) ||
      (!onlyView && profileData?.experiences?.length > 0) ? (
        <UserWorkExperience data={onlyView ? pData : profileData} />
      ) : null}
      {(onlyView && pData?.education?.length > 0) ||
      (!onlyView && profileData?.education?.length > 0) ? (
        <UserEducation data={onlyView ? pData : profileData} />
      ) : null}
      {(onlyView && pData?.links?.length > 0) ||
      (!onlyView && profileData?.links?.length > 0) ? (
        <UserSocialMediaLInks data={onlyView ? pData : profileData} />
      ) : null}
    </div>
  );
};

export default UserDetailsPage;
