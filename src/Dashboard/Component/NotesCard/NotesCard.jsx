import { useContext, useEffect } from "react";
import myContext from "../../../components/context/myContext";

const NotesCard = ({ title, img, categories, url, id }) => {
  const context = useContext(myContext);
  const { savedData } = context;

  const handelEbookSaved = (id) => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const userId = datavalue?.data._id;
    let obj = {
      title,
      img,
      categories,
      url,
      id
    };

    savedData(userId, id, "NOTES", obj);
  };

  return (
    <div className="w-[350px] p-4 bg-white rounded-[15px] overflow-hidden shadow-lg">
      <img
        className="w-[275px] m-auto h-[275px] object-cover"
        src={img}
        alt="Book Cover"
      />
      <div className=" pt-4">
        <div className="font-bold text-[#1E1E1E]  text-[16px] leading-[20px] text-xl mb-2">
          {title}
        </div>
      </div>
      <h3 className="text-[#1E1E1EBF] text-[12px]">
        {categories} <br />
      </h3>
      <div className="flex items-center justify-between mt-2">
        <a href={url} className="w-[48%]" target="_blank">
          <button className="bg-[#79B058]  text-white font-bold py-2 px-4 w-[100%] rounded focus:outline-none focus:shadow-outline">
            Download
          </button>
        </a>
        <button
          onClick={() => handelEbookSaved(id)}
          className="border  text-[#1E1E1EBF] border-[#1E1E1E40] font-bold py-2 px-4 w-[48%]  rounded focus:outline-none focus:shadow-outline ml-4"
        >
          Add to Saved
        </button>
      </div>
    </div>
  );
};

export default NotesCard;
