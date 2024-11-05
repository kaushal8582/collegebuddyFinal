import React from "react";
import courseBanner from "../../../assets/resources/img/image 10.png";
import levelFirst from "../../../assets/College Buddy Website/level-iconICONS.svg";
import clock from "../../../assets/College Buddy Website/clock-iconICONS.svg";
import monitor from "../../../assets/College Buddy Website/monitor-iconICONS.svg";

const Courses = ({ img, heading, desc, time, mentor, level,redirectLink }) => {
  return (
    <a href={redirectLink} target="_blank" >
      <div className="p-[15px] min-w-[340px] max-w-[340px] max-md-xs:min-w-[70vw] h-[244px] rounded-xl border overflow-hidden ">
        <img className="rounded-xl h-[124px] w-[308px] " src={img} alt="courseBanner" />
        <h2 className="text-[20px]">{heading}</h2>
        <p className="text-[12px] text-[#1E1E1E80]">{desc}</p>
        <div className="flex items-center h-8 justify-between border-dashed border-2 w-full rounded-lg p-2">
          <div className="flex  items-center justify-center gap-1">
            <img className="h-[18px]" src={levelFirst} alt="courselevel" />
            <h3 className="text-[12px] text-[#1E1E1EBF] ">{level}</h3>
          </div>
          <div className="flex  items-center justify-center gap-1">
            <img className="h-[18px]" src={clock} alt="clock icon" />
            <h3 className="text-[12px]  text-[#1E1E1EBF]">{time}</h3>
          </div>
          <div className="flex  items-center justify-center gap-1">
            <img className="h-[18px]" src={monitor} alt="clock icon" />
            <h3 className="text-[12px]  text-[#1E1E1EBF]">{mentor}</h3>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Courses;
