import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useContext } from 'react';
import myContext from '../../../components/context/myContext';
import { BASE_URL } from '../../../../Helper';


const SearchPYQ = ({ setFindedPyq }) => {

  const context = useContext(myContext)
  const {allCourseName,allUniversityname} = context


  const [formData, setFormData] = useState({
    universityName: '',
    semester: '',
    courseName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { universityName, semester, courseName } = formData;
      if (!universityName || !semester || !courseName) {
        return toast.error("All fields are required");
      }

      const response = await fetch(`${BASE_URL}/collegebuddy/api/v1/pyq/findpyq`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if(response.status==400){
        return toast.error("Question not found")
      }

      const data = await response.json();
      console.log(data.data);
      setFindedPyq(data.data);

      toast.success("Questio find successfully");

    } catch (error) {
      toast.error("Pyq find error");
      console.log(error);
      return;
    }
  };

  return (
    <div className="pt-[90px] flex items-center justify-center bg-white">
      
    </div>
  );
};

export default SearchPYQ;
