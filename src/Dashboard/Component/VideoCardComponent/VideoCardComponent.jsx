import React from "react";
import savedIcon from "../../../assets/College Buddy Website/saved-iconICONS.svg";
import logo from "../../../assets/resources/svgs/college-buddy-logo-01.svg";

const VideoCardComponent = ({ heading ,url}) => {
  function getYouTubeID(url) {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }
    const urlParams = parsedUrl.searchParams;
    return urlParams.get("v");
  }

  const id = getYouTubeID(url);

  return (
    <div>
      <div className=" ">
        <div className="card w-[417px] p-4 rounded-2xl bg-white ">
          <iframe
            className="rounded-xl w-full max-md-xs:w-[350px] max-xs:w-[300px]  "
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameborder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

          <div className="mt-3 flex items-start justify-between ">
            <div className="min-w-8 h-8 rounded-full flex items-center justify-center  border">
              <img className="h-[80%] " src={logo} alt="logo" />
            </div>
            <h1 className="mx-5 text-[20px] font-[600] text-[#1e1e1ebc] leading-6">
              {heading}
            </h1>
            <div className="min-w-8 flex items-center cursor-pointer justify-center h-8 rounded-full  border">
              <img src={savedIcon} alt="" className="h-[60%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardComponent;
