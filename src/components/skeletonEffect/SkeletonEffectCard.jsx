import React from 'react'
import "./SkeletonEffect.css"

const SkeletonEffectCard = () => {
  return (
    <div className='w-full absolute top-0 left-0 z-30 h-screen bg-white p-4 overflow-hidden flex gap-3 flex-col ' >
        <div className='w-full h-[65vh]  flex justify-between  ' >
            <div className='w-[65%] h-full  flex flex-col items-center justify-between ' >
                <div className='ad-card relative w-full h-[48%] bg-[#4e4e4e7e]'></div>
                <div className=' ad-card relative w-full h-[48%] bg-[#4e4e4e7f]'></div>
            </div>
            <div className='bg-[#4e4e4e7f] ad-card relative w-[30%] h-full  ' ></div>
        </div>
        <div className=' ad-card relative w-full h-[15vw] bg-[#4e4e4e7f]' ></div>
    </div>
  )
}

export default SkeletonEffectCard