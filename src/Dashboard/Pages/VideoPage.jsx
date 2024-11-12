import  { useContext } from "react";
import myContext from "../../components/context/myContext";

import VideoCardComponent from "../Component/VideoCardComponent/VideoCardComponent";

const VideoPage = () => {
  // const [activeButton, setActiveButton] = useState("all");
  const context = useContext(myContext);
  const { getAllVideo } = context;

  // useEffect(()=>{
  //   console.log(getAllVideo);
  // },[])

  // const buttons = [
  //   "all",
  //   "HTML",
  //   "CSS",
  //   "JavaScript",
  //   "Python",
  //   "Web projects",
  //   "Java",
  //   "C++",
  // ];

  // const handleClick = (button) => {
  //   setActiveButton(button);
  // };

  return (
    <div className="" >
      {/* <div className="bg-white border-b border-t border-gray-400 w-full h-[51px]  pl-[100px] max-lg-xs:pl-6 flex items-center  justify-start gap-3 overflow-x-auto">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`border-2 p-1 px-5 rounded-3xl  text-nowrap ${
              activeButton === button
                ? "bg-[#79B05833] text-[#1E5000] border-[#1E5000]"
                : ""
            }`}
            onClick={() => handleClick(button)}
          >
            {button}
          </button>
        ))}
      </div> */}

        <div className="flex gap-3 max-md-xs:pl-0 pl-[100px] pt-[30px] flex-wrap" >
        {getAllVideo?.length > 0 ? (
        getAllVideo.map((item) => (
          <VideoCardComponent heading={item.title} url={item.videoLink} videoId={item._id}  key={item._id} />
        ))
      ) : (
        <h1>Not have any video, sorry 🤔🤩🤗</h1>
      )}
        </div>
    
    </div>
  );
};

export default VideoPage;
