import React, { useContext, useEffect, useState } from "react";
import profilePic from "../../../assets/College Buddy Website/Artboard 1 2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";
import viewProfileVector from "../../../assets/College Buddy Website/Vector.svg";
import shareIcon from "../../../assets/College Buddy Website/share-iconICONS.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../../components/context/myContext";

const Profile = ({data,localData}) => {
  const navigate = useNavigate()
  const context = useContext(myContext);
  const {handleShare} = context;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [activeDays, setActiveDays] = useState([]); // Example of active days
  const[dailyActive,setDailyActive]  = useState()

  let today = new Date().getDay(); // Sunday - 0, Monday - 1, etc.

  useEffect(() => {
    const LocalStorageData = JSON.parse(localStorage.getItem("user"));
    const daily = LocalStorageData?.data?.dailyStrike || 0;
    setDailyActive(daily);

    // Create a copy of today for manipulation
    let tempToday = today;
    let arr = [];

    if (daily === 1) {
      arr = [today]; // Only today is active
    } else {
      for (let i = 0; i < daily; i++) {
        arr.push(tempToday);
        tempToday--;
        if (tempToday < 0) {
          tempToday = 6; // Loop back to Sunday if underflow
        }
      }
      console.log(arr);
      
    }

    setActiveDays(arr);
  }, [today]);


  const   handelShareProfile = ()=>{
    if(data?.userId?.name){
      handleShare(data?.username,data?.userId?.name,data?.password)
    }else{
      navigate("/editprofile")
    }
  }

  const handelViewProfil = ()=>{
    if(data?.userId?.name){
      navigate("/profile")
    }else{
      navigate("/editprofile")
    }
  }


  return (
    <div className=" w-[400px] max-lg-xs:w-full bg-white rounded-2xl p-[30px] max-sm-xs:p-5 gap-[15px] flex flex-col">
      <div id="profile"  className=" flex w-full   max-lg-xs:flex-row flex-col max-md-xs:flex-col gap-3 ">
        <div className="flex w-full items-center justify-start gap-10 ">
          <div
            className={`h-[100px] max-sm-xs:min-w-[100px] max-sm-xs:min-h-[80px] p-[5px]  ${data?.userId?.name ? "bg-[#efa83e]":"bg-[#79B058]"} w-[100px] rounded-full border-2   relative `}
          >
            <img
              className="w-full h-full object-cover rounded-full "
              src={ data?.img || profilePic}
              alt=""
            />
            { data?.userId?.name && <img
              src={graduatioCap}
              alt=""
              className="absolute top-[-10%] h-9 right-[-10%]"
            />}
          </div>
          <div>
            <h2 className="text-[24px] ">{data?.userId?.name || localData?.name}</h2>
            <p className="border-2 rounded-full px-3 text-[16px] max-sm-xs:text-[12px]">
              @{ data?.username || "collegebuddy"}
            </p>
          </div>
        </div>
        <div className="w-full h-[100px] flex border-2 border-dashed rounded-2xl">
          <div className="w-1/2 h-full flex flex-col items-center justify-center border-r-2 border-dotted">
            <h1 className="text-[25px] font-semibold">{data?.views || 0}</h1>
            <h4>Profile Views</h4>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <h1 className="text-[25px] font-semibold">{data?.likes?.length || 0}</h1>
            <h4>Profile Likes</h4>
          </div>
        </div>
      </div>
      <div className="h-[142px] w-full rounded-2xl border-2 border-dashed flex items-center justify-center flex-col ">
        <div className="flex flex-col items-center font-sans">
          <div className="text-3xl font-bold">{dailyActive}</div>
          <h3>Daily Active Streak</h3>
          <div className="flex justify-between w-full px-1">
            {days.map((day, index) => (
              <div className="flex flex-col items-center">
                <div
                  key={index}
                  className={`w-6 ml-3 h-6 flex items-center justify-center rounded-lg border ${
                    activeDays.includes(index)
                      ? "bg-green-500"
                      : "border-gray-300"
                  } ${index === today ? "border-2 border-blue-500" : ""}`}
                >
                  {}
                </div>
                <div>{day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-between">
       
       <button onClick={handelViewProfil} className="w-[47%] h-[48px]  bg-[#1E1E1E] flex items-center justify-center gap-3 text-white rounded-xl ">
          <img className="h-4" src={viewProfileVector} alt="" />
          <h3>View Profile</h3>
        </button>
        <button onClick={handelShareProfile} className="w-[47%] h-[48px] border-2 flex items-center justify-center gap-3 text-gray-700 rounded-xl ">
          <img className="h-4" src={shareIcon} alt="" />
          <h3>Share Profile</h3>
        </button>
      </div>
    </div>
  );
};

export default Profile;
