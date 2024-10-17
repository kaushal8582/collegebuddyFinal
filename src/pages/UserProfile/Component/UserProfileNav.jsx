import React, { useContext, useEffect, useState } from "react";
import BackIcon from "../../../assets/College Buddy Website/profile-iconICONS.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../../components/context/myContext";

const UserProfileNav = ({
  editPage,
  handelUploadData,
  updateProfile,
  onlyView,
  data,
}) => {
  const [createdProfile, setCreatedProfile] = useState(false);
  const context = useContext(myContext);
  const { profileData } = context;

  const navigate = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setCreatedProfile(data?.data?.createdProfile);
  }, []);

  const handelClick = () => {
    if (createdProfile) {
      updateProfile();
    } else {
      handelUploadData();
    }
  };

  const handleShare = async () => {
    const shareUrl = `https://collegebuddytesting.netlify.app/profile/@${
      onlyView ? data.username : profileData.username
    }?p=${onlyView?data.password:profileData.password}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my Profile!`,
          text: `Check out the profile of ${
            onlyView ? data?.userId?.name : profileData?.userId?.name
          } on CollegeBuddy!`,
          url: shareUrl,
        });
        console.log("Profile shared successfully");
      } catch (error) {
        console.error("Error sharing profile:", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser.");
      navigator.clipboard.writeText(shareUrl);
      alert("Profile URL copied to clipboard!");
    }
  };


  const BackBtn = ()=>{

    if(onlyView){
      navigate("/login")
      return;
    }
      navigate("/dashboard")
    
  }

  // const [editPage, setEditPage] = useState(false);
  return (
    <div className="w-full h-[88px] max-md-xs:h-[70px] bg-[#ffffff] rounded-full border-2 overflow-hidden flex items-center justify-between p-5 max-sm-xs:p-2">
      <div className="flex items-center gap-5 max-sm-xs:gap-2 ">
        <div onClick={BackBtn} className="grid cursor-pointer place-items-center w-12 h-12 max-md-xs:w-8 max-md-xs:h-8   rounded-full border-2">
          <img src={BackIcon} alt="" />
        </div>
        <h1 className="text-[1.7vw] text-[#1E1E1E80] font-bold  max-md-xs:text-[3.3vw]  ">
          {onlyView
            ? data?.userId?.name
            : editPage
            ? "Edit Profile"
            : "My Profile"}
        </h1>
      </div>
      {!editPage && (
        <div className="flex gap-1">
          <button
            onClick={handleShare}
            className="bg-[#79B058] flex items-center gap-2 px-4 py-2 text-[#fff] rounded-3xl "
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12C9 12.663 8.73661 13.2989 8.26777 13.7678C7.79893 14.2366 7.16304 14.5 6.5 14.5C5.83696 14.5 5.20107 14.2366 4.73223 13.7678C4.26339 13.2989 4 12.663 4 12C4 11.337 4.26339 10.7011 4.73223 10.2322C5.20107 9.76339 5.83696 9.5 6.5 9.5C7.16304 9.5 7.79893 9.76339 8.26777 10.2322C8.73661 10.7011 9 11.337 9 12Z"
                stroke="#fff"
                stroke-width="1.5"
              />
              <path
                d="M14 6.5L9 10M14 17.5L9 14"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M19 18.5C19 19.163 18.7366 19.7989 18.2678 20.2678C17.7989 20.7366 17.163 21 16.5 21C15.837 21 15.2011 20.7366 14.7322 20.2678C14.2634 19.7989 14 19.163 14 18.5C14 17.837 14.2634 17.2011 14.7322 16.7322C15.2011 16.2634 15.837 16 16.5 16C17.163 16 17.7989 16.2634 18.2678 16.7322C18.7366 17.2011 19 17.837 19 18.5ZM19 5.5C19 6.16304 18.7366 6.79893 18.2678 7.26777C17.7989 7.73661 17.163 8 16.5 8C15.837 8 15.2011 7.73661 14.7322 7.26777C14.2634 6.79893 14 6.16304 14 5.5C14 4.83696 14.2634 4.20107 14.7322 3.73223C15.2011 3.26339 15.837 3 16.5 3C17.163 3 17.7989 3.26339 18.2678 3.73223C18.7366 4.20107 19 4.83696 19 5.5Z"
                stroke="#fff"
                stroke-width="1.5"
              />
            </svg>

            <h3 className="max-md-xs:text-[14px]">Share</h3>
          </button>
          {!onlyView && (
            <Link to={"/editprofile"}>
              <button className="border-2  flex items-center gap-2 px-4 py-2 text-black rounded-3xl ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.475 5.40801L18.592 7.52501M17.836 3.54301L12.109 9.27001C11.8122 9.56485 11.6102 9.94162 11.529 10.352L11 13L13.648 12.47C14.058 12.388 14.434 12.187 14.73 11.891L20.457 6.16401C20.6291 5.99191 20.7656 5.7876 20.8588 5.56275C20.9519 5.33789 20.9998 5.09689 20.9998 4.85351C20.9998 4.61013 20.9519 4.36913 20.8588 4.14427C20.7656 3.91942 20.6291 3.71511 20.457 3.54301C20.2849 3.37091 20.0806 3.2344 19.8557 3.14126C19.6309 3.04812 19.3899 3.00018 19.1465 3.00018C18.9031 3.00018 18.6621 3.04812 18.4373 3.14126C18.2124 3.2344 18.0081 3.37091 17.836 3.54301Z"
                    stroke="#1E1E1E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 15V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H9"
                    stroke="#1E1E1E"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h3 className="max-md-xs:text-[14px]">
                  {createdProfile ? "Update" : "Edit"}
                </h3>
              </button>
            </Link>
          )}
        </div>
      )}

      {editPage && (
        <div className="flex items-center gap-3 max-sm-xs:gap-1">
          <button className="border-2 text-black flex items-center gap-2 px-4 py-2  rounded-3xl ">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.78032 2.72001C6.92077 2.86064 6.99966 3.05126 6.99966 3.25001C6.99966 3.44876 6.92077 3.63939 6.78032 3.78001L4.56032 6.00001H13.2503C14.7831 6.00001 16.2815 6.45454 17.556 7.30612C18.8305 8.1577 19.8238 9.36809 20.4104 10.7842C20.997 12.2003 21.1504 13.7586 20.8514 15.262C20.5524 16.7653 19.8143 18.1462 18.7304 19.2301C17.6465 20.3139 16.2656 21.0521 14.7623 21.3511C13.2589 21.6501 11.7006 21.4967 10.2845 20.9101C8.86839 20.3235 7.65801 19.3302 6.80643 18.0557C5.95485 16.7812 5.50032 15.2828 5.50032 13.75C5.50032 13.5511 5.57933 13.3603 5.71999 13.2197C5.86064 13.079 6.0514 13 6.25032 13C6.44923 13 6.63999 13.079 6.78065 13.2197C6.9213 13.3603 7.00032 13.5511 7.00032 13.75C7.00032 14.9861 7.36687 16.1945 8.05363 17.2223C8.74039 18.2501 9.71651 19.0512 10.8585 19.5243C12.0006 19.9973 13.2572 20.1211 14.4696 19.8799C15.682 19.6388 16.7957 19.0435 17.6697 18.1694C18.5438 17.2954 19.1391 16.1817 19.3802 14.9693C19.6214 13.7569 19.4976 12.5003 19.0246 11.3582C18.5515 10.2162 17.7504 9.24009 16.7226 8.55333C15.6948 7.86657 14.4865 7.50001 13.2503 7.50001H4.56032L6.78032 9.72001C6.854 9.78867 6.91311 9.87147 6.9541 9.96347C6.99509 10.0555 7.01713 10.1548 7.01891 10.2555C7.02068 10.3562 7.00216 10.4562 6.96444 10.5496C6.92672 10.643 6.87057 10.7278 6.79936 10.799C6.72814 10.8703 6.6433 10.9264 6.54991 10.9641C6.45653 11.0019 6.3565 11.0204 6.25579 11.0186C6.15509 11.0168 6.05578 10.9948 5.96378 10.9538C5.87178 10.9128 5.78898 10.8537 5.72032 10.78L2.22032 7.28001C2.07987 7.13939 2.00098 6.94876 2.00098 6.75001C2.00098 6.55126 2.07987 6.36064 2.22032 6.22001L5.72032 2.72001C5.86094 2.57956 6.05157 2.50067 6.25032 2.50067C6.44907 2.50067 6.63969 2.57956 6.78032 2.72001Z"
                fill="#1E1E1E"
              />
            </svg>

            <h3 className="max-md-xs:text-[14px]">Reset </h3>
          </button>
          <button
            onClick={handelClick}
            className="bg-[#79B058] flex items-center gap-2 px-4 py-2 text-[#fff] rounded-3xl "
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.25 21V16.235C16.2497 16.026 16.2083 15.8192 16.128 15.6262C16.0477 15.4333 15.9302 15.2581 15.7822 15.1106C15.6341 14.9631 15.4585 14.8462 15.2652 14.7667C15.072 14.6872 14.865 14.6465 14.656 14.647H9.344C9.13503 14.6465 8.92801 14.6872 8.73477 14.7667C8.54153 14.8462 8.36586 14.9631 8.21782 15.1106C8.06978 15.2581 7.95226 15.4333 7.87199 15.6262C7.79171 15.8192 7.75026 16.026 7.75 16.235V21M16.25 3.28501V5.64701C16.2497 5.85598 16.2083 6.06285 16.128 6.25579C16.0477 6.44873 15.9302 6.62395 15.7822 6.77143C15.6341 6.91892 15.4585 7.03577 15.2652 7.11532C15.072 7.19486 14.865 7.23554 14.656 7.23501H9.344C9.13503 7.23554 8.92801 7.19486 8.73477 7.11532C8.54153 7.03577 8.36586 6.91892 8.21782 6.77143C8.06978 6.62395 7.95226 6.44873 7.87199 6.25579C7.79171 6.06285 7.75026 5.85598 7.75 5.64701V3.00001M16.25 3.28501C15.8353 3.09719 15.3853 3.00003 14.93 3.00001H7.75M16.25 3.28501C16.594 3.44101 16.911 3.65901 17.184 3.93001L19.566 6.30501C19.8618 6.59933 20.0965 6.94915 20.2568 7.3344C20.4171 7.71965 20.4997 8.13275 20.5 8.55001V17.822C20.4997 18.24 20.4171 18.6539 20.2567 19.0399C20.0963 19.426 19.8614 19.7766 19.5654 20.0718C19.2694 20.367 18.9181 20.6009 18.5316 20.7601C18.1451 20.9194 17.731 21.0009 17.313 21H6.688C6.26998 21.0011 5.85585 20.9197 5.4693 20.7605C5.08276 20.6014 4.73139 20.3676 4.43529 20.0725C4.13919 19.7774 3.90417 19.4269 3.74369 19.0409C3.5832 18.6549 3.50039 18.241 3.5 17.823V6.17601C3.50052 5.75807 3.58343 5.34433 3.74397 4.95846C3.90452 4.57258 4.13956 4.22214 4.43564 3.92716C4.73173 3.63219 5.08306 3.39848 5.46953 3.23939C5.85601 3.0803 6.27006 2.99896 6.688 3.00001H7.75"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <h3 className="max-md-xs:text-[14px]">
              {createdProfile ? "Update" : "Save"}{" "}
            </h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileNav;
