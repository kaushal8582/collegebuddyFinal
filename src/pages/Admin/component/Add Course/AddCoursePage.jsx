import React, { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../../../components/context/myContext";
import { BASE_URL } from "../../../../../Helper";
import toast from "react-hot-toast";

const AddCoursePage = () => {
  const context = useContext(myContext);
  const { allCourseName } = context;

  const handelDeleteCourseName = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/collegebuddy/api/v1/course/deletecoursename/${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        toast.success("Delete course Name Succeffully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-white shadow-lg p-3 ">
      <div className="flex justify-end p-5">
        <Link to={"/addcoursename"}>
          <button className="button p-3 ">Add Course</button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        {allCourseName.map((course) => (
          <div
            key={course._id}
            className="flex w-full justify-between items-center bg-white shadow-md rounded-lg p-4"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {course.name}
            </h2>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={() => handelDeleteCourseName(course._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCoursePage;
