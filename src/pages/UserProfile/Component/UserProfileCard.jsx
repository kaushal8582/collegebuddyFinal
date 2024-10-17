import React, { useEffect, useState } from "react";
import profilePic from "../../../assets/resources/img/kaushal img2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../Helper";

const UserProfileCard = ({ data }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  // Initial setup to set like count based on the `data` from the backend
  useEffect(() => {
    if (data?.likes?.length) {
      setLikeCount(data.likes.length);
      const localstorageData = JSON.parse(localStorage.getItem("user"));
      if (localstorageData && data.likes.includes(localstorageData?.data?._id)) {  
        setIsLiked(true);  // Set the like state based on whether the user has liked the profile
      }
    }
  }, [data]);

  const handleLike = async () => {
    const localstorageData = JSON.parse(localStorage.getItem("user"));
    if (!localstorageData) {
      navigate("/login");
      return;
    }

    if (localstorageData.expireTime && Date.now() > localstorageData.expireTime) {
      navigate("/login");
      return;
    }

    // Optimistic UI Update: Temporarily toggle isLiked and adjust the count
    setIsLiked(!isLiked);
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);

    try {
      const accessToken = localstorageData?.accessToken;
      const response = await fetch(`${BASE_URL}/collegebuddy/api/v1/profile/toggleprofilelike/${data._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ userId: localstorageData?.userId }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLikeCount(responseData.data);  // Assuming response contains the new like count
        setIsLiked(responseData.message=="Profile liked" ? true:false);  // Update the liked status based on backend response
      } 

    } catch (error) {
      console.error(error);
      // Revert optimistic UI update in case of error
      setIsLiked(isLiked);
      setLikeCount(prevCount => isLiked ? prevCount + 1 : prevCount - 1);
    }
  };


  return (
    <div className="w-full border-2 rounded-3xl p-[50px] max-md-xs:p-[30px]">
      <div className="flex max-md-xs:flex-col items-center justify-center max-md-xs:items-start gap-8">
        <div
          className={`h-[137px]  p-[5px] bg-[#efa83e] w-[137px] rounded-full border-2   relative `}
        >
          <img
            className="w-full h-full object-cover rounded-full"
            src={data?.img}
            alt=""
          />
          <img
            src={graduatioCap}
            alt=""
            className="absolute top-[00%]  right-[0%] scale-[2.3]"
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-[2vw] max-md-xs:text-[6vw] font-semibold text-[#1E1E1EBF]">
            {data?.userId?.name}
          </h1>
          <div className="flex items-center justify-start gap-2 text-[#1E1E1E80] ">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 21C3.45 21 2.97933 20.8043 2.588 20.413C2.19667 20.0217 2.00067 19.5507 2 19V8C2 7.45 2.196 6.97933 2.588 6.588C2.98 6.19667 3.45067 6.00067 4 6H8V4C8 3.45 8.196 2.97933 8.588 2.588C8.98 2.19667 9.45067 2.00067 10 2H14C14.55 2 15.021 2.196 15.413 2.588C15.805 2.98 16.0007 3.45067 16 4V6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V19C22 19.55 21.8043 20.021 21.413 20.413C21.0217 20.805 20.5507 21.0007 20 21H4ZM10 6H14V4H10V6Z"
                fill="#1E1E1E80"
              />
            </svg>

            <p>{data?.about}</p>
          </div>
          <p className="border-2 rounded-full px-3 text-[16px]  max-sm-xs:text-[12px] text-[#1E1E1EBF] ">
            @{data?.username}
          </p>
          <div className="flex items-center justify-start gap-3 text-[#1E1E1EBF] ">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 0.5C8.79021 0.5 10.5071 1.21116 11.773 2.47703C13.0388 3.7429 13.75 5.45979 13.75 7.25C13.75 9.5555 12.493 11.4425 11.1685 12.7963C10.5068 13.4653 9.78469 14.0719 9.0115 14.6083L8.692 14.8258L8.542 14.9255L8.25925 15.1055L8.00725 15.2593L7.69525 15.4408C7.48348 15.5616 7.24384 15.6252 7 15.6252C6.75616 15.6252 6.51652 15.5616 6.30475 15.4408L5.99275 15.2593L5.60275 15.0192L5.45875 14.9255L5.15125 14.7208C4.31712 14.1564 3.54018 13.5118 2.8315 12.7963C1.507 11.4418 0.25 9.5555 0.25 7.25C0.25 5.45979 0.961159 3.7429 2.22703 2.47703C3.4929 1.21116 5.20979 0.5 7 0.5ZM7 5C6.70453 5 6.41194 5.0582 6.13896 5.17127C5.86598 5.28434 5.61794 5.45008 5.40901 5.65901C5.20008 5.86794 5.03434 6.11598 4.92127 6.38896C4.8082 6.66194 4.75 6.95453 4.75 7.25C4.75 7.54547 4.8082 7.83806 4.92127 8.11104C5.03434 8.38402 5.20008 8.63206 5.40901 8.84099C5.61794 9.04992 5.86598 9.21566 6.13896 9.32873C6.41194 9.4418 6.70453 9.5 7 9.5C7.59674 9.5 8.16903 9.26295 8.59099 8.84099C9.01295 8.41903 9.25 7.84674 9.25 7.25C9.25 6.65326 9.01295 6.08097 8.59099 5.65901C8.16903 5.23705 7.59674 5 7 5Z"
                fill="#1E1E1EBF"
                fill-opacity="0.5"
              />
            </svg>

            <p>{data?.city}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center mt-8">
        <div className=" w-[454px] h-[100px] flex border-2 border-dashed rounded-full max-md-xs:rounded-3xl">
          <div className="w-1/2 h-full flex flex-col items-center justify-center border-r-2 border-dotted">
            <svg
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 38.431L31.62 30.051C33.6338 27.6334 34.638 24.5325 34.4237 21.3934C34.2094 18.2543 32.7932 15.3187 30.4696 13.1972C28.146 11.0757 25.0939 9.93168 21.9483 10.0032C18.8027 10.0746 15.8058 11.3561 13.5809 13.5809C11.3561 15.8058 10.0746 18.8027 10.0032 21.9483C9.93168 25.0939 11.0757 28.146 13.1972 30.4696C15.3187 32.7932 18.2543 34.2094 21.3934 34.4237C24.5325 34.638 27.6334 33.6338 30.051 31.62L38.431 40L40 38.431ZM12.259 22.2457C12.259 20.2705 12.8447 18.3397 13.942 16.6974C15.0394 15.0551 16.5991 13.775 18.424 13.0192C20.2488 12.2633 22.2568 12.0655 24.1941 12.4509C26.1313 12.8362 27.9108 13.7873 29.3075 15.184C30.7041 16.5807 31.6553 18.3602 32.0406 20.2974C32.426 22.2347 32.2282 24.2427 31.4723 26.0675C30.7164 27.8924 29.4364 29.4521 27.7941 30.5494C26.1518 31.6468 24.2209 32.2325 22.2457 32.2325C19.598 32.2296 17.0595 31.1765 15.1873 29.3042C13.315 27.432 12.2619 24.8935 12.259 22.2457Z"
                fill="#1E1E1E"
              />
            </svg>

            <h4> {data?.views} Views</h4>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <svg
              className="cursor-pointer"
              onClick={handleLike}
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.0675 15.3293C21.5035 12.6573 17.1857 12.6191 14.3846 15.3558C14.3757 15.3645 14.3667 15.373 14.3576 15.3814C11.64 17.8706 11.5998 22.0366 14.3846 24.7573L14.3919 24.7645L24.9061 35.2204L35.6154 24.7573C35.6242 24.7487 35.6333 24.7401 35.6424 24.7318C38.36 22.2426 38.4002 18.0766 35.6154 15.3558C32.8293 12.6338 28.4902 12.6338 25.7041 15.3558C25.484 15.5708 25.1875 15.6889 24.8803 15.684C24.5731 15.679 24.2806 15.5514 24.0675 15.3293ZM24.9198 12.9772C21.392 10.1058 16.1844 10.379 12.7876 13.6852C9.05204 17.1207 9.09529 22.8168 12.7705 26.4113C12.7718 26.4126 12.773 26.4138 12.7743 26.415L24.0865 37.6645C24.5335 38.109 25.2532 38.1122 25.7041 37.6717L37.2128 26.4276C40.9492 22.9908 40.9045 17.2924 37.2257 13.6981C33.8086 10.3596 28.5955 10.1193 24.9198 12.9772Z"
                fill={isLiked ? "red" : "#1E1E1E"}
                fill-opacity="1"
              />
            </svg>

            <h4>{likeCount || 0} Likes</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
