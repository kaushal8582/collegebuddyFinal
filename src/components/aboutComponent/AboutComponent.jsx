import React, { useState } from 'react';
import '../../cssss/utility.css';
import '../../cssss/AboutComponent.css';
import youtubeImg from "../../assets/resources/img/YOUTUBE WINDOW.png";
import "../../cssss/Responsive.css";

const AboutComponent = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="about" className="flex flex-col items-center justify-center bg-gray-100 w-full py-24">
      <h1 className="text-64px font-thin text-center">
        Who we <span className="text-green-500 font-normal">are</span> and what we <span className="text-green-500 font-normal">do?</span>
      </h1>

      <div className={`video-wrapper ${isVideoPlaying ? 'video-playing' : ''}`}>
        {isVideoPlaying ? (
          <iframe 
            src="https://www.youtube.com/embed/7IOIjb0fPvM?si=2-XVAOaq9NtC8rlc&autoplay=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="responsive-iframe"
          ></iframe>
        ) : (
          <div className="relative cursor-pointer" onClick={handlePlayVideo}>
            <img src={youtubeImg} alt="YouTube Thumbnail" className="video-thumbnail" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://yourdomain.com/play-button-icon.png" // Replace with your play button icon path
                alt="Play Button" 
                className="w-16 h-16 opacity-80"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutComponent;
