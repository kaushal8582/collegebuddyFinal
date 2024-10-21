import React from 'react'
import bookImg from "../../../assets/College Buddy Website/Frame 190.svg"

const EbookCard = ({title,url,img}) => {
  return (
    <div className="w-[350px] p-4 bg-white rounded-[15px] overflow-hidden shadow-lg">
      <img
        className="w-[275px] m-auto h-[275px] object-cover"
        src={img}
        alt="Book Cover"
      />
      <div className=" pt-4">
        <div className="font-bold text-[#1E1E1E]  text-[16px] leading-[20px] text-xl mb-2">{title}</div>
      </div>
      <h3 className='text-[#1E1E1EBF] text-[12px]' >Price <br/> <span className='text-[20px] text-[#1E1E1E]' >Free</span></h3>
      <div className="flex items-center justify-between mt-2">
        <button className="bg-[#79B058]  text-white font-bold py-2 px-4 w-[48%] rounded focus:outline-none focus:shadow-outline">
          Download
        </button>
        <button className="border  text-[#1E1E1EBF] border-[#1E1E1E40] font-bold py-2 px-4 w-[48%]  rounded focus:outline-none focus:shadow-outline ml-4">
          Add to Saved
        </button>
      </div>
    </div>
  )
}

export default EbookCard



