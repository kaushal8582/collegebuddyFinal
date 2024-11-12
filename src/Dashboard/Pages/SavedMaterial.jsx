import React, { useContext, useEffect, useState } from "react";
import PyqCard from "../Component/PyqCard/PyqCard";
import myContext from "../../components/context/myContext";
import VideoCardComponent from "../Component/VideoCardComponent/VideoCardComponent";
import EbookCard from "../Component/Ebook/EbookCard";
import NotesCard from "../Component/NotesCard/NotesCard";

const SavedMaterial = () => {
  const context = useContext(myContext);
  const { getAllSavedContent, savedDataValue } = context;

  const [activeButton, setActiveButton] = useState("PYQ");

  const buttons = ["PYQ", "E-Books", "Videos", "Notes"];

  const handleClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const userId = datavalue?.data._id;
    getAllSavedContent(userId);
  }, []);

  useEffect(()=>{
    console.log(savedDataValue);
    
  },[])



  return (
    <div>
      <div className="bg-white w-full h-[51px] pl-[100px] max-lg-xs:pl-6 flex items-center justify-start gap-3 overflow-x-auto">
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

      {activeButton == "PYQ" ? (
        <div className="pl-[100px] mt-5 max-md-xs:pl-2 flex gap-4 items-center justify-start  max-md-xs:justify-center flex-wrap">
          {savedDataValue
            .filter((item) => item.itemType == "PYQ")
            .map((item, index) => (
              <PyqCard
                key={index}
                year={item.itemDetails.year}
                collegeName={item.itemDetails.universityName}
                courseName={item.itemDetails.courseName}
                questionLink={item.itemDetails.questionLink}
                sem={item.itemDetails.semester}
                img ={item.itemDetails.img}
              />
            ))}
        </div>
      ) : (
        ""
      )}

      {activeButton == "Videos" ? (
        <div className="pl-[100px] mt-5 max-md-xs:pl-2 flex gap-4 items-center justify-start  max-md-xs:justify-center flex-wrap">
          {savedDataValue
            .filter((item) => item.itemType == "VIDEO")
            .map((item, index) => (
              <VideoCardComponent
                key={index}
                heading={item.itemDetails.heading}
                url={item.itemDetails.url}
                videoId={item.itemDetails.id}
              />
            ))}
        </div>
      ) : (
        ""
      )}

      {activeButton == "E-Books" ? (
        <div className="pl-[100px] mt-5 max-md-xs:pl-2 flex gap-4 items-center justify-start  max-md-xs:justify-center flex-wrap">
          {savedDataValue
            .filter((item) => item.itemType == "E-Book")
            .map((item, index) => (
              <EbookCard
                key={index}
                id={item.itemDetails.id}
                img={item.itemDetails.img}
                title={item.itemDetails.title}
                url={item.itemDetails.url}
              />
            ))}
        </div>
      ) : (
        ""
      )}

      {activeButton == "Notes" ? (
        <div className="pl-[100px] mt-5 max-md-xs:pl-2 flex gap-4 items-center justify-start  max-md-xs:justify-center flex-wrap">
          {savedDataValue
            .filter((item) => item.itemType == "NOTES")
            .map((item, index) => (
              <NotesCard
                categories={item.itemDetails.categories}
                key={index}
                id={item.itemDetails.id}
                img={item.itemDetails.img}
                title={item.itemDetails.title}
                url={item.itemDetails.url}
              />
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SavedMaterial;
