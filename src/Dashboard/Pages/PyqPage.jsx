import React, { useContext, useEffect, useState } from "react";
import PyqCard from "../Component/PyqCard/PyqCard";
import myContext from "../../components/context/myContext";
import { BASE_URL } from "../../../Helper";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const PyqPage = () => {
  const context = useContext(myContext);
  const { allPyq, allUniversityname, allCourseName, loader, setLoader } =
    context;

  const [findedPyq, setFindedPyq] = useState([]);

  const [pyqData, setPyqData] = useState({
    university: "",
    year: "",
    courseName: "",
    semester: "",
  });

  const onChangePyqSearchData = (e) => {
    let { name, value } = e.target;
    setPyqData({ ...pyqData, [name]: value });
  };

  const handelSearch = async () => {
    try {
      setLoader(true);
      if (
        !pyqData.courseName &&
        !pyqData.semester &&
        !pyqData.university &&
        !pyqData.year
      ) {
        toast.error("Minimum one field required");
        return;
      }
      const response = await fetch(
        `${BASE_URL}/collegebuddy/api/v1/pyq/findpyq`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            universityName: pyqData.university,
            semester: pyqData.semester,
            courseName: pyqData.courseName,
            year: pyqData.year,
          }),
        }
      );

      if (response.status == 400) {
        return toast.error("Question not found");
      }

      const data = await response.json();
      console.log(data.data);
      setFindedPyq(data.data);

      toast.success("Questio find successfully");
    } catch (error) {
      toast.error("Pyq find error");
      console.log(error);
      return;
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="pl-[100px] max-lg-xs:pl-6 p-8 h-[1080px] overflow-y-auto bg-gray-300 ">
      {loader && (
        <div className="w-full h-full bg-[#bdbdbd5f] top-0 left-0  absolute flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="w-full min-h-[186px] bg-white rounded-2xl p-7 flex flex-col gap-5 ">
        <div className="flex items-center justify-start gap-4 flex-wrap ">
          <select
            className="w-[290px] h-12 border-2 outline-none rounded-xl"
            name="university"
            id=""
            value={pyqData.university}
            onChange={onChangePyqSearchData}
          >
            <option value="">University</option>
            {allUniversityname.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
          <select
            className="w-[290px] h-12 border-2 outline-none rounded-xl"
            name="courseName"
            id=""
            value={pyqData.courseName}
            onChange={onChangePyqSearchData}
          >
            <option value="null">Course</option>
            {allCourseName.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
          <select
            className="w-[290px] h-12 border-2 outline-none rounded-xl"
            name="semester"
            id=""
            value={pyqData.semester}
            onChange={onChangePyqSearchData}
          >
            <option value="">Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>
          <select
            className="w-[290px] h-12 border-2 outline-none rounded-xl"
            name="year"
            id=""
            value={pyqData.year}
            onChange={onChangePyqSearchData}
          >
            <option value="">Year</option>
            {[...Array(41)].map((_, index) => {
              const year = 2010 + index;
              return (
                <option key={index} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handelSearch}
            className="bg-[#79B058] text-white px-5 py-2 rounded-xl"
          >
            Search
          </button>
          <button className="border-2 px-5 py-2 rounded-xl">Clear</button>
        </div>
      </div>
      <div className=" w-full p-8 max-lg-xs:p-1 mt-8 flex flex-wrap gap-7 max-lg-xs:gap-3">
        {findedPyq.length <= 0
          ? allPyq.map((pyq, index) => {
              return (
                <div>
                  <PyqCard
                    key={index}
                    courseName={pyq.courseName}
                    collegeName={pyq.universityName}
                    sem={pyq.semester}
                    id={pyq._id}
                    year={pyq.year}
                    questionLink={pyq.questionLink}
                  />
                </div>
              );
            })
          : findedPyq.map((pyq, index) => {
              return (
                <div>
                  <PyqCard
                    key={index}
                    courseName={pyq.courseName}
                    collegeName={pyq.universityName}
                    sem={pyq.semester}
                    id={pyq._id}
                    year={pyq.year}
                    questionLink={pyq.questionLink}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PyqPage;
