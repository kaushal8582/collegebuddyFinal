import React, { useState } from "react";
import profilePic from "../../../assets/resources/img/kaushal img2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";
import projectImg from "../../../assets/resources/img/Frame 126.png"

const UserAllProjects = ({img,name,title,desc,livelink,githublink,profileImg,onlyView}) => {

  const [showPop,setShowPop] = useState(false)

  const handelPopUP = ()=>{
    if(onlyView){
      setShowPop(!showPop)
    }
  }

  


  return (
    <div className="w-full pt-9 border-2 overflow-hidden flex max-md-xs:gap-8 max-md-xs:flex-col justify-between mt-8 p-5 text-[#1E1E1E80] rounded-3xl ">
      <div className="w-[48%] max-md-xs:w-full max-md-xs:h-[270px] h-[315px] border-2 rounded-2xl overflow-hidden">
        <img className="w-full h-full object-cover" src={img} alt="" />
      </div>
      <div className="w-[48%] max-md-xs:w-full h-[315px]  rounded-2xl flex flex-col gap-3 justify-between items-start ">
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-between  border-b-2">
            <div className="flex items-center gap-2">
              <div
                className={`h-[37px] max-md-xs:h-[33px] max-md-xs:w-[33px] p-[2px] bg-[#efa83e] w-[37px] rounded-full border-2   relative `}
              >
                <img
                  className="w-full rounded-full h-full object-cover"
                  src={profileImg}
                  alt=""
                />
                <img
                  src={graduatioCap}
                  alt=""
                  className="absolute top-[-30%] scale-90 right-[-30%]"
                />
              </div>
              <div>
                <h2 className="text-black text-[16px]">{name}</h2>
                <p className="text-[12px]">29-aug-2022</p>
              </div>
            </div>

            {  showPop && <div  className ="w-[150px]  border-2 " >
              <button className ="border-b-2 w-full" >Edit</button>
              <button className ="border-b-2 w-full" >Share</button>
              <button className =" w-full text-red-600 " >Delete</button>
            </div>}

            <div onClick={handelPopUP} className="flex items-center justify-center gap-[2px] cursor-pointer ">
              <span className="bg-black w-1 h-1 rounded-full"></span>
              <span className="bg-black w-1 h-1 rounded-full"></span>
              <span className="bg-black w-1 h-1 rounded-full"></span>
            </div>
          </div>
          <h1 className="text-[20px] font-semibold">
            {title}
          </h1>
          <p className="text-[13px]">
           {desc}
          </p>
        </div>
        <div className="flex gap-4 text-[#1E1E1EBF]">
          <a href={livelink}>
          <button className="flex items-center justify-center gap-2 px-4 py-1 rounded-full border-2">
            Preview{" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.70373 16.0935L14.6021 8.1951H7.70075C7.14921 8.1951 6.69666 7.74255 6.69666 7.19101C6.69653 7.06004 6.72222 6.93033 6.77228 6.80931C6.82234 6.68828 6.89577 6.57832 6.98838 6.48571C7.08099 6.3931 7.19095 6.31966 7.31198 6.26961C7.433 6.21955 7.56271 6.19385 7.69368 6.19399H17.0133C17.1443 6.19385 17.274 6.21955 17.3951 6.26961C17.5161 6.31966 17.626 6.3931 17.7186 6.48571C17.8113 6.57832 17.8847 6.68828 17.9347 6.80931C17.9848 6.93033 18.0105 7.06004 18.0104 7.19101V16.5107C18.0104 16.6416 17.9846 16.7713 17.9345 16.8922C17.8844 17.0132 17.8109 17.1231 17.7183 17.2157C17.6258 17.3083 17.5159 17.3817 17.3949 17.4318C17.2739 17.4819 17.1443 17.5077 17.0133 17.5077C16.8824 17.5077 16.7528 17.4819 16.6318 17.4318C16.5108 17.3817 16.4009 17.3083 16.3083 17.2157C16.2158 17.1231 16.1423 17.0132 16.0922 16.8922C16.0421 16.7713 16.0163 16.6416 16.0163 16.5107L16.0163 9.60931L8.11795 17.5077C7.72904 17.8966 7.09264 17.8966 6.70373 17.5077C6.31482 17.1188 6.31482 16.4824 6.70373 16.0935Z"
                fill="#1E1E1EBF"
              />
            </svg>
          </button>
          </a>
          <a href={githublink}><button className="flex items-center justify-center gap-2 px-4 py-1 rounded-full border-2">
            View Source
          </button></a>
        </div>
      </div>
    </div>
  );
};

export default UserAllProjects;
