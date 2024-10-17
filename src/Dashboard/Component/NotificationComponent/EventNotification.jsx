import React from 'react'
import eventImg from "../../../assets/College Buddy Website/carbon_event.svg";


const EventNotification = () => {
  return (
    <div className="w-full  bg-white rounded-2xl flex items-center justify-between p-5">
      <div className="flex items-center justify-center gap-4" >
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <div
          className={`h-[37px] max-md-xs:h-[33px] max-md-xs:w-[33px] p-[2px]   
             "bg-[#efa83e]" : "bg-[#79B058]"
          } w-[37px]  rounded-full border-2   relative `}
        >
          <img
            className="w-full h-full object-cover rounded-full"
            src={eventImg}
            alt=""
          />
        </div>
        <div >
          <h2 className="text-[#1E1E1E80] max-md-xs:text-[13px] max-md-xs:w-30" >Join us for live <span className='text-[#1E1E1EBF]' >Web Development</span> bootcamp event on 10 Dec 2024 </h2>
          <h3 className="text-[#1E1E1E80] text-[12px]" > 2 days ago</h3>
        </div>
      </div>
      <div>
        <button className=" max-md-xs:text-[16px] border border-[#1E1E1E40] text-[#1E1E1E80] text-wrap px-4 py-2 rounded-full" >Register Now</button>
      </div>
    </div>
  )
}

export default EventNotification