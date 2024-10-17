import React from "react";
import VideoCard from "../component/VideoCard";
import { useContext } from "react";
import myContext from "../../../components/context/myContext";
import VideoCardComponent from "../../../Dashboard/Component/VideoCardComponent/VideoCardComponent";

const VideoPage = () => {
  const context = useContext(myContext);
  const { getAllVideo } = context;

  return (
    <div className="w-full min-h-screen pt-[120px] px-[100px] bg-white flex items-start justify-center gap-5 flex-wrap">
      {getAllVideo?.length > 0 ? (
        getAllVideo.map((item) => (
         <VideoCardComponent key={item._id} heading={item.title} url={item.videoLink} />
        ))
      ) : (
        <h1>Not have any video, sorry 🤔🤩🤗</h1>
      )}
    </div>
  );
};

export default VideoPage;
