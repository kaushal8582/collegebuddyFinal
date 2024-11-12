import React, { useContext } from "react";
import bookImg from "../../../assets/College Buddy Website/Frame 190.svg";
import { BASE_URL } from "../../../../Helper";
import toast from "react-hot-toast";
import myContext from "../../../components/context/myContext";
import { useNavigate } from "react-router-dom";

const EbookCard = ({ title, url, img, id }) => {
  const context = useContext(myContext);
  const { savedData } = context;

  const navigate = useNavigate()

  const handelEbookSaved = async (id) => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const userId = datavalue?.data._id;
    let obj = {
      title,
      url,
      img,
      id,
    };

    savedData(userId, id, "E-Book", obj);
  };


 
  const handleDownload = async () => {
    try {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      const accessToken = datavalue?.accessToken;
  
      const response = await fetch(`${BASE_URL}/collegebuddy/api/v1/ebooks/ebookdownload/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
  
      if (response.status == 401) {
        navigate("/login");
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Assuming response contains a JSON with the file URL
      const data = await response.json();
      console.log(data.data);
  
      // Create a temporary anchor element with target="_blank" for new tab download
      const a = document.createElement('a');
      a.href = data.data;
      a.target = '_blank'; // Open in new tab
      a.download = 'ebook.pdf';  // Optional: specify a filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
    } catch (error) {
      console.log("ebook download error", error);
    }
  }
  



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
        Price <br /> <span className="text-[20px] text-[#1E1E1E]">Free</span>
      </h3>
      <div className="flex items-center justify-between mt-2">
        <a  onClick={handleDownload} target="_blank" className="w-[48%]" ><button className="bg-[#79B058] w-full text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline">
          Download
        </button></a>
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

export default EbookCard;
