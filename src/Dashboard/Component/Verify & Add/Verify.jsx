import React from "react";
import profilePic from "../../../assets/College Buddy Website/Artboard 1 2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";
import { Link } from "react-router-dom";

const Verify = ({data}) => {
  const linkTo = data ? "/profile" : "/editprofile";
  return (
    <div className="w-full h-[243px] bg-[#1E1E1E] rounded-2xl relative ">
      <div className="absolute right-0 bottom-6 scale-[2.2]">
        <svg
          width="368"
          height="135"
          viewBox="0 0 30 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.271 13.4266C27.4981 13.6366 27.6291 13.8259 27.7815 14.0929L27.7016 14.3467C27.0984 14.6042 26.2401 14.4547 25.5914 14.4252C25.2991 14.9204 25.0161 15.4468 24.6726 15.9071C24.3637 16.318 23.9053 16.6971 23.3961 16.7569L23.2566 16.4904C23.3457 15.6288 23.7886 14.9607 24.1924 14.21C20.3439 14.0393 15.5459 13.1563 11.6218 12.6491L4.59484 4.46352C3.99036 3.80653 3.16996 3.02281 2.77946 2.22069C2.6319 1.91578 2.52006 1.59685 2.63919 1.26692L2.91493 1.26383C5.15818 2.46281 10.2032 9.04667 12.3257 11.2864C17.2565 12.2223 22.3236 12.5007 27.2728 13.427L27.271 13.4266Z"
            fill="#EFA83E1A"
          />
          <path
            d="M5.34939 7.11414C7.33955 9.21416 9.16864 11.5573 11.0628 13.7512C14.1563 14.1194 17.2536 14.4549 20.3528 14.7594C19.9498 15.599 19.0691 18.0276 18.3255 18.4635C15.3049 18.5515 11.8945 18.1478 8.89544 17.7261C6.98199 15.7042 5.02655 13.2816 3.52557 10.9317C4.06772 9.62724 4.71345 8.37432 5.34939 7.11414Z"
            fill="#EFA83E1A"
          />
          <path
            d="M17.7419 2.626C20.3732 5.90848 23.2706 9.03287 26.0972 12.1503C21.9198 11.3306 17.5592 10.8055 13.324 10.3764C13.0525 10.3452 12.9144 10.2691 12.7191 10.0888C11.7077 9.1624 10.8228 7.95911 9.91531 6.92547C8.2242 5.01486 6.52372 3.11552 4.81059 1.22503C6.32435 1.51227 7.90056 1.61289 9.43306 1.78337C12.197 2.11373 14.9659 2.3951 17.7398 2.62747L17.7419 2.626Z"
            fill="#EFA83E1A"
          />
        </svg>
      </div>

      <div className="flex w-full h-full justify-between items-center p-[30px] max-sm-xs:p-3">
        <div className="flex flex-col gap-5 justify-start items-start  h-full">
          <div>
            <h1 className="text-[#EFA83E] text-[4vw] max-md-xs:text-[6vw] ">
              Golden Scholar Badge!
            </h1>
            <p className="text-[#ffffff66] text-[24px] max-md-xs:text-[14px] ">
              Unlock it by completing your profile today.
            </p>
          </div>
          <Link  to={linkTo} >
          <button className="bg-[#EFA83E] w-[197px] h-[48px] max-lg-xs:w-[45vw] rounded-xl m-auto text-[16px]">
            Complete your profile
          </button>
          </Link>
        </div>
        <div className=" relative">
          <div
            className={`h-[130px] max-md-xs:h-[100px] p-[5px] bg-[#efa83e] w-[130px] max-md-xs:w-[100px] rounded-full border-2   relative `}
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={ data?.img ||  profilePic}
              alt=""
            />
            <img
              src={graduatioCap}
              alt=""
              className="absolute top-[-10%] h-9 right-[-10%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
