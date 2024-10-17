import React from "react";

const UserWorkExperience = ({data}) => {
  return (
    <div className="w-full pt-9 border-2 overflow-hidden mt-8 py-12 text-[#1E1E1E80] rounded-3xl ">
      <h3 className="w-full border-b-2 pl-28 max-md-xs:pl-4 ">WORK EXPERIENCE</h3>
      <div className="flex flex-col items-start gap-3 w-full mt-3 " >
        {data?.experiences?.map((items,index)=>(
          <div key={index} className="pl-28 max-md-xs:pl-4 flex items-start w-full">
          <div className="w-[60%]">
            <h2>{items?.company}</h2>
            <li> {items?.role}</li>
          </div>
          <h2>{items?.year}-{items?.endDate}</h2>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default UserWorkExperience;
