import React, { useState } from "react";

const UserSkillExperience = ({data}) => {
    return (
        <div className="w-full pt-9 border-2 overflow-hidden mt-8 py-12 text-[#1E1E1E80] rounded-3xl ">
            <h3 className="w-full border-b-2 pl-28 max-md-xs:pl-4 ">SKILLS & EXPERTISE</h3>
            <div className="flex flex-col items-start gap-4 mt-4 ">
                {data?.skills?.map((item,index) => (
                    <div key={index} className="pl-28 max-md-xs:pl-4 flex items-center">
                        <h2 className="min-w-[120px] max-md-xs:min-w-[100px] ">{item?.name}</h2>
                        <div className="w-[200px] max-md-xs:w-[160px] border-2 overflow-hidden rounded-full h-5 relative">
                            <div
                                className="h-full bg-[#79B058]"
                                style={{ width: `${item?.level}%` }} // Correct way to set dynamic width
                            ></div>
                        </div>
                        <h2 className="min-w-[120px] text-end">{`${item.level}%`}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSkillExperience;
