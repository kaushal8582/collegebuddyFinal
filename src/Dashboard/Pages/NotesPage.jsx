import React, { useContext, useEffect, useState } from "react";
import myContext from "../../components/context/myContext";
import Loader from "../../components/Loader/Loader";
import EbookCard from "../Component/Ebook/EbookCard";
import NotesCard from "../Component/NotesCard/NotesCard";

const NotesPage = () => {
  const context = useContext(myContext);
  const { loader, setLoader, allStudyMaterial } = context;

  const [activeButton, setActiveButton] = useState("all");
  const [filterData, setFilterData] = useState([]);

  const buttons = [
    "all",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Web projects",
    "Java",
    "C++",
    "React",
    "Node.js"
  ];

  const handleClick = (button) => {
    if (button == "all") {
      setFilterData(allStudyMaterial);
    } else {
      let filtData = allStudyMaterial.filter(
        (data) => data?.desc == button
      );
      console.log(filtData);

      setFilterData(filtData);
    }
    setActiveButton(button);
  };

  return (
    <div className=" max-lg-xs:pl-0  h-screen overflow-y-auto bg-gray-300 ">
      {loader && (
        <div className="w-full h-full bg-[#bdbdbd5f] top-0 left-0  absolute flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="bg-white border-b border-t border-gray-400 w-full h-[51px]  pl-[100px] max-lg-xs:pl-4 flex items-center  justify-start gap-3 overflow-x-auto">
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
      </div>

      <div className="pl-[100px] max-lg-xs:pl-2 p-5">
        <div className="w-full min-h-[186px] bg-white rounded-2xl overflow-hidden p-7 flex items-center justify-center gap-5 relative">
          <div className="absolute w-[700px] h-[700px] rounded-full border-4 border-orange-400"></div>
          <div className="text-center">
            <h3 className="text-[32px] text-[#1E1E1E] ">Welcome to</h3>
            <h1 className="text-[60px] font-bold text-[#79B058] max-md-xs:text-[37px] leading-[70px] max-md-xs:leading-[55px] ">
              College Buddy <br /> Notes World
            </h1>
            <p className="text-[20px] text-[#1E1E1EBF] ">
              Essential resources to excel in tech and academics
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-start max-md-xs:justify-center gap-4 flex-wrap">
        {filterData.length > 0
            ? filterData.map((ebook, index) => (
              <NotesCard
              key={ebook._id}
              categories={ebook.desc}
              img={ebook.thumbnail}
              title={ebook.title}
              url={ebook.materialLink}
              id={ebook._id}
            />
              ))
            : allStudyMaterial.map((item) => (
              <NotesCard
                key={item._id}
                categories={item.desc}
                img={item.thumbnail}
                title={item.title}
                url={item.materialLink}
                id={item._id}
              />
            ))}
        </div>

        
      </div>
    </div>
  );
};

export default NotesPage;
