import React, { useContext, useEffect, useState } from "react";
import myContext from "../../components/context/myContext";
import Loader from "../../components/Loader/Loader";
import EbookCard from "../Component/Ebook/EbookCard";
import bookImg from "../../assets/College Buddy Website/Frame 190.svg";

const EbookPage = () => {
  const context = useContext(myContext);
  const { loader,allEbook } = context;
  const [activeButton, setActiveButton] = useState("all");
  const [filterData, setFilterData] = useState([]);

  const buttons = [
    "all",
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "SQL",
    "Web projects",
    "Java",
    "C++",
    "DBMS"
  ];

  let EbookData = [
    {
      title: "JavaScript Handbook From Basics to Advanced",
      img: "",
      categories: "JavaScript",
      url: "www.google.com",
    },
    {
      title: "JavaScript",
      img: "",
      categories: "JavaScript",
      url: "www.google.com",
    },
    {
      title: "HTMl or Css Books",
      img: "",
      categories: "HTML",
      url: "www.google.com",
    },
    {
      title: "HTML Books",
      img: "",
      categories: "HTML",
      url: "www.google.com",
    },
    {
      title: "Python Books",
      img: "",
      categories: "Python",
      url: "www.google.com",
    },
    {
      title: "C++",
      img: "",
      categories: "C++",
      url: "www.google.com",
    },
  ];

  const handleClick = (button) => {
    if (button == "all") {
      setFilterData(EbookData);
    } else {
      let filtData = allEbook.filter((data) => data?.description == button);      
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
          <div className="absolute w-[500px] h-[500px] rounded-full border-4 border-orange-400"></div>
          <div className="text-center">
            <h3 className="text-[32px] text-[#1E1E1E] ">Welcome to</h3>
            <h1 className="text-[60px] font-bold text-[#79B058] max-md-xs:text-[37px] leading-[70px] max-md-xs:leading-[55px] ">
              College Buddy <br /> E-BookStore
            </h1>
            <p className="text-[20px] text-[#1E1E1EBF] ">
              Books to excel in tech and acedemics
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-start max-md-xs:justify-center gap-4 flex-wrap">
          {filterData.length > 0
            ? filterData.map((ebook, index) => (
                <EbookCard
                  key={index}
                  img={ebook.thumbnail}
                  title={ebook.title}
                  url={ebook.ebookLink}
                  id={ebook._id}
                />
              ))
            : allEbook.map((ebook, index) => (
                <EbookCard
                  key={index}
                  img={ebook.thumbnail}
                  title={ebook.title}
                  url={ebook.ebookLink}
                  id={ebook._id}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default EbookPage;
