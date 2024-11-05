import React from 'react'
import cardImg from "../../../assets/College Buddy Website/Chill Vibes.png"

const ShowAd = () => {
  return (
    <div className='w-full h-[243px]  rounded-2xl overflow-hidden relative bg-white grid place-items-center' >
        {/* <h1>PLACE FOR AN AUTOMATIC 
        AD IMAGE CARAOUSEL</h1> */}

          <img className='w-full h-full object-cover' rel='preload' src={cardImg} alt="banner img" />


    </div>
  )
}

export default ShowAd