import React from "react";
import bannerImg from "../../../assets/resources/img/pyq-banner 1.png";
import toast from "react-hot-toast";

const PyqCard = ({collegeName,courseName,sem,session,year,questionLink,id}) => {

  const handleDownload = async () => {
    try {
      toast.success("click");

      const datavalue = JSON.parse(localStorage.getItem("user"));
      const accessToken = datavalue?.accessToken;
      const response = await fetch(
        `http://localhost:3000/collegebuddy/api/v1/pyq/downloadpyq/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "POST",
        }
      );


      if (response.status == 401) {
        navigate("/login");
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const a = document.createElement("a");
      a.href = data.data;
      a.download = `${ collegeName}-${sem}th - ${year} pyq.pdf`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("ebook download error", error);
    }
  };



  return (
    <div className="w-[417px] max-lg-xs:w-[340px] p-4 overflow-hidden flex flex-col gap-4 bg-white rounded-xl ">
      <img
        className="w-full h-[125px] object-cover rounded-xl border-2"
        src={bannerImg}
        alt="college banner"
      />
      <h1 id="heaingPyqCard" className="text-[1.3vw] font-normal max-lg-xs:text-[2.3vw] ">
        Babasaheb Bhimrao Ambedkar Bihar University (BRABU)
      </h1>
      <div className="flex flex-wrap gap-2">
        <h3 id="pyqcardcontent" className="pyqcardcontent w-[48%] h-8 border-2 border-dashed pl-3 text-[1vw]  flex items-center justify-start max-lg-xs:text-[1.7vw] max-md-xs:text-[2.6vw] ">
          Course : <span>{courseName}</span>
        </h3>
        <h3  id="pyqcardcontent1" className= " pyqcardcontent w-[48%] h-8 border-2 border-dashed pl-3 3 text-[1vw]   flex items-center justify-start   max-lg-xs:text-[1.7vw] ">
          Semester : <span>{sem}th</span>
        </h3>
        <h3  id="pyqcardcontent2" className=" pyqcardcontent w-[48%] h-8 border-2 border-dashed pl-3 3 text-[1vw]  flex items-center justify-start   max-lg-xs:text-[1.7vw] ">
          Session : <span>2022-2025</span>
        </h3>
        <h3  id="pyqcardcontent3" className=" pyqcardcontent w-[48%] h-8 border-2 border-dashed pl-3  3 text-[1vw]   flex items-center justify-start  max-lg-xs:text-[1.7vw] ">
          Year : <span>{year}</span>
        </h3>
      </div>

      <div className="flex items-center justify-between w-full">
        <button onClick={handleDownload} className=" w-[48%] bg-[#79B058] text-white py-2 flex items-center justify-center rounded-xl ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 16.004V17C4 17.7956 4.31607 18.5587 4.87868 19.1213C5.44129 19.6839 6.20435 20 7 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V16M12 4.5V15.5M12 15.5L15.5 12M12 15.5L8.5 12"
              stroke="#ffff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h3>Download</h3>
        </button>
        <button className=" w-[48%]  border-2 py-2 flex items-center justify-center rounded-xl ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.94 18.339L7.51 20.887C7.26537 21.0785 6.9732 21.1997 6.66487 21.2376C6.35654 21.2756 6.0437 21.2288 5.75995 21.1023C5.4762 20.9759 5.23225 20.7745 5.05432 20.5199C4.87638 20.2652 4.77118 19.9669 4.75 19.657V6.34999C4.7678 5.85966 4.88203 5.37764 5.08617 4.93147C5.29031 4.4853 5.58037 4.08372 5.93976 3.74968C6.29915 3.41565 6.72083 3.15569 7.18072 2.98468C7.6406 2.81366 8.12968 2.73493 8.62 2.75299H15.38C16.3699 2.71786 17.3333 3.07685 18.0588 3.7512C18.7844 4.42554 19.2128 5.36017 19.25 6.34999V19.659C19.2293 19.9692 19.1244 20.2678 18.9465 20.5227C18.7686 20.7777 18.5245 20.9792 18.2406 21.1057C17.9566 21.2321 17.6435 21.2787 17.335 21.2403C17.0265 21.202 16.7344 21.0801 16.49 20.888L13.06 18.34C12.7521 18.1156 12.381 17.9948 12 17.9948C11.619 17.9948 11.2479 18.1146 10.94 18.339Z"
              stroke="#1E1E1E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h3>Add to saved</h3>
        </button>
      </div>
    </div>
  );
};

export default PyqCard;
