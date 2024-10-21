import React, { useContext, useEffect, useState } from "react";
import UserProfileNav from "../../UserProfile/Component/UserProfileNav";

import profilePic from "../../../assets/College Buddy Website/Artboard 1 2.png";
import graduatioCap from "../../../assets/resources/svgs/GRADUATIONCAP.svg";
import cameraIcon from "../../../assets/College Buddy Website/solar_camera-boldICONS.svg";
import { BASE_URL } from "../../../../Helper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import myContext from "../../../components/context/myContext";
import Loader from "../../../components/Loader/Loader";

const EditProfile = () => {
  const [img, setImg] = useState(null);
  const [imgLocalPreview, setImgLocalPreview] = useState(null || profilePic);
  const [editPage, setEditPage] = useState(false);
  const [userBasicDetails, setUSerBasicDetails] = useState({});
  const context = useContext(myContext);
  const { fetchProfileData, profileData, loader, setLoader } = context;
  const [error,setError] = useState({
    name:"",
    bg:"",
    text:"",
    type:""
  });

  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const startingFunction = async () => {
      setEditPage(true);
      setUSerBasicDetails(data.data);

      if (data?.data?.createdProfile) {
        await fetchProfileData();

        setUSerData({
          about: profileData.about,
          username: profileData.username,
          gender: profileData.gender,
          city: profileData.city,
          bio: profileData.bio,
        });

        setImg(null);
        setImgLocalPreview(profileData.img);

        setSkills(profileData.skills || []);
        setLinks(profileData.links || []);
        setEducation(profileData.education || []);
        setExperiences(profileData.experiences || []);
      }
    };
    startingFunction();
  }, []);

  const [userData, setUSerData] = useState({
    about: "",
    username: "",
    gender: "",
    city: "",
    bio: "",
  });

  const handleUserNameChange = async (e) => {
    let value = e.target.value;
    let noSpaceValue = value.replace(/\s+/g, "");
    setUSerData((prevData) => ({
      ...prevData,
      username: noSpaceValue,
    }));

    if(userData.username.length<=2){
      setError({
        name:"UserName minimum 3 Character",
        text:"text-red-500",
        type:"username"
      })
      return
    }

    try {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      const accessToken = datavalue?.accessToken;

      const response = await fetch(`${BASE_URL}/collegebuddy/api/v1/profile/checkusername`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body:JSON.stringify({userName:userData.username})
      });

      if(response.ok){
        console.log("UserName is avilable");
        setError({
          name:"UserName is avilable",
          text:"text-blue-500",
          type:"username"
        })
      }else{
        console.log("Usename is not avilable");
        setError({
          name:"UserName is not avilable",
          text:"text-red-500",
          type:"username"
        })
        
      }


    } catch (error) {
      console.log(error);
    }
  };

  const handelImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImg(file);
      setImgLocalPreview(imgUrl);
    }
  };

  const handelBasicDetailsChange = (e) => {
    setUSerData({ ...userData, [e.target.name]: e.target.value });
  };

  const [skills, setSkills] = useState([
    { name: "Java", level: 50 },
    { name: "Python", level: 60 },
  ]);

  // Function to add a new skill
  const addSkill = () => {
    setSkills([...skills, { name: "", level: 1 }]);
  };

  const removeSkill = (index) => {
    let newSkills = skills.filter((_, i) => i != index);
    console.log(newSkills);

    setSkills(newSkills);
  };

  // Function to handle skill input changes
  const handleSkillChange = (index, event) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index
        ? { ...skill, [event.target.name]: event.target.value }
        : skill
    );
    setSkills(updatedSkills);
  };

  const [links, setLinks] = useState([
    { platform: "Instagram", url: "" },
    { platform: "Portfolio", url: "" },
    { platform: "Github", url: "" },
    { platform: "LinkedIn", url: "" },
  ]);

  // Function to add a new social media link
  const addLink = () => {
    setLinks([...links, { platform: "", url: "" }]);
  };

  const removeLink = (index) => {
    const newLink = links.filter((_, i) => i != index);
    setLinks(newLink);
  };

  // Function to handle link input changes
  const handleLinkChange = (index, event) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [event.target.name]: event.target.value } : link
    );
    console.log(updatedLinks);

    setLinks(updatedLinks);
  };

  const [education, setEducation] = useState([
    { year: "", degree: "Matric", subject: "", marks: "" },
    { year: "", degree: "Inter", subject: "", marks: "" },
    { year: "", degree: "Bachelors", subject: "", marks: "" },
    { year: "", degree: "Masters", subject: "", marks: "" },
  ]);

  // Function to add a new education entry
  const addEducation = () => {
    setEducation([
      ...education,
      { year: "", degree: "", subject: "", marks: "" },
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i != index);
    setEducation(newEducation);
  };

  // Function to handle education input changes
  const handleEducationChange = (index, event) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [event.target.name]: event.target.value } : edu
    );
    setEducation(updatedEducation);
  };

  const [experiences, setExperiences] = useState([
    { company: "", year: "", endDate: "", role: "" },
  ]);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", year: "", endDate: "", role: "" },
    ]);
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = experiences.filter((_, i) => i != index);
    setExperiences(newWorkExperience);
  };

  const handleChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handelUploadData = async () => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const accessToken = datavalue?.accessToken;

    if (
      userData.username === "" ||
      userData.about === "" ||
      userData.gender === "" ||
      userData.city === "" ||
      userData.bio === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // if (
    //   skills.some((skill) => skill.name === "" || skill.level === "") ||
    //   links.some((link) => link.platform === "" || link.url === "") ||
    //   education.some(
    //     (edu) =>
    //       edu.year === "" ||
    //       edu.degree === "" ||
    //       edu.subject === "" ||
    //       edu.marks === ""
    //   ) ||
    //   experiences.some(
    //     (exp) => exp.company === "" || exp.year === "" || exp.role === ""
    //   )
    // ) {
    //   alert("Please fill in all the required fields.");
    //   return;
    // }

    try {
      const response = await fetch(
        `${BASE_URL}/collegebuddy/api/v1/profile/addprofile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            about: userData.about,
            gender: userData.gender,
            username: userData.username,
            city: userData.city,
            bio: userData.bio,
            skills,
            links,
            education,
            experiences,
            userId: userBasicDetails._id,
          }),
        }
      );

      if (response.status == 409) {
        return toast.error("Username already exist");
      }

      if (!response.ok) {
        throw new Error("Data upload failed.");
      }
      if (img) {
        await uploadImgInBackend();
      }

      toast.success("profile created successfully");
      let data = localStorage.getItem("user");
      data = data ? JSON.parse(data) : null;

      if (data && data.data) {
        data.data.createdProfile = true;

        localStorage.setItem("user", JSON.stringify(data));
      }

      navigate("/profile");
      console.log("Data uploaded successfully.");
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const uploadImgInBackend = async () => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const accessToken = datavalue?.accessToken;
    const formData = new FormData();
    formData.append("profileImg", img);
    formData.append("userId", userBasicDetails._id);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(
        `${BASE_URL}/collegebuddy/api/v1/profile/uploadprofileimg`,
        {
          method: "POST",
          body: formData,
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("profile img upload successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async () => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const accessToken = datavalue?.accessToken;

    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}/collegebuddy/api/v1/profile/updateprofile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            about: userData.about,
            gender: userData.gender,
            username: userData.username,
            city: userData.city,
            bio: userData.bio,
            skills,
            links,
            education,
            experiences,
            userId: userBasicDetails._id,
          }),
        }
      );

      if (response.status == 409) {
        return toast.error("Username already exist");
      }

      if (!response.ok) {
        throw new Error("Data upload failed.");
      }
      if (img) {
        await uploadImgInBackend();
      }

      toast.success("profile updated successfully");
      navigate("/profile");
      console.log("Data uploaded successfully.");
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full relative min-h-screen bg-white p-5 pb-10">
      {loader && (
        <div className="w-full h-full bg-[#bdbdbd5f] top-0 left-0  absolute flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="sticky z-50 top-[2%] left-0">
        <UserProfileNav
          editPage={editPage}
          handelUploadData={handelUploadData}
          updateProfile={updateProfile}
        />
      </div>
      <div className="w-full h-full flex flex-col items-center mt-5">
        <div className="w-[691px]  rounded-3xl  flex flex-col gap-5 max-md-xs:w-full ">
          <div className="w-full h-[160px] rounded-3xl grid place-items-center border-dashed border-2 ">
            <label htmlFor="profilepic">
              <div
                className={`h-[100px]  cursor-pointer  max-md-xs:w-[100px] p-[4px] bg-[#efa83e] w-[100px] rounded-full border-2   relative `}
              >
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={imgLocalPreview}
                  alt=""
                />
                <img
                  src={graduatioCap}
                  alt=""
                  className="absolute top-[-10%] scale-[1.5] right-[10%]"
                />
                <div className="absolute bottom-0 right-0   border  rounded-3xl p-1 bg-white">
                  <img src={cameraIcon} alt="" />
                </div>
              </div>
            </label>
            <input
              type="file"
              id="profilepic"
              // accept="image/*"
              className="hidden"
              onChange={handelImageUpload}
            />
          </div>
          <div className="w-full p-3 rounded-2xl border-2 border-dashed grid place-items-center bg-[#79B0581A] text-[#1E5000] ">
            Select all the checkboxes to show your data in your public profile.
          </div>

          <div className="w-full pt-9 border-2 border-dashed overflow-hidden mt-8 py-12 text-[#1E1E1E80] rounded-3xl ">
            <h3 className="w-full border-b-2 border-dashed pl-28 max-md-xs:pl-4 ">
              BASIC DETAILS
            </h3>
            <div className="flex flex-col justify-start gap-3 mt-3">
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">Name</h2>
                <input
                  name="name"
                  value={userBasicDetails.name}
                  // onChange={handelBasicDetailsChange}
                  className="w-64 max-md-xs:w-[60%] max-sm-xs:w-[150px] outline-none border-2 rounded-lg pl-3"
                  type="text"
                  disabled
                />
              </div>
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">About</h2>
                <input
                  value={userData.about}
                  name="about"
                  onChange={handelBasicDetailsChange}
                  className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3"
                  type="text"
                />
              </div>
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">Username</h2>
                <input
                  value={userData.username}
                  name="username"
                  onChange={handleUserNameChange}
                  className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3"
                  type="text"
                />
               
                
              </div>
             {error.type=="username" &&  <p className={`text-center ${error.text} bg-white`} >{error.name}</p>}
              
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">Gender</h2>
                <div className="w-64 max-md-xs:w-[180px] flex items-center gap-4 ">
                  <label className="flex items-center gap-3" htmlFor="male">
                    {" "}
                    Male
                    <input
                      onChange={handelBasicDetailsChange}
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                    />
                  </label>
                  <label className="flex items-center gap-3" htmlFor="female">
                    {" "}
                    Female
                    <input
                      onChange={handelBasicDetailsChange}
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                    />
                  </label>
                </div>
              </div>
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">City</h2>
                <input
                  name="city"
                  value={userData.city}
                  onChange={handelBasicDetailsChange}
                  className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3"
                  type="text"
                />
              </div>
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">Bio</h2>
                <textarea
                  value={userData.bio}
                  name="bio"
                  onChange={handelBasicDetailsChange}
                  className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3"
                  type="text"
                  rows={3}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-9 border-2 border-dashed overflow-hidden mt-8 py-12 text-[#1E1E1E80] rounded-3xl ">
            <h3 className="w-full border-b-2 border-dashed pl-28 max-md-xs:pl-4 ">
              CONTACT DETAILS
            </h3>
            <div className="flex flex-col justify-start gap-3 mt-3">
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">Email</h2>
                <input
                  name="email"
                  value={userBasicDetails.email}
                  // onChange={handelBasicDetailsChange}
                  className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3"
                  type="text"
                  disabled
                />
              </div>
              <div className="pl-24 max-md-xs:pl-4 flex items-center  ">
                <h2 className="w-28 max-md-xs:w-[25%]">Phone No</h2>
                <input
                  // onChange={handelBasicDetailsChange}
                  name="phoneNumber"
                  value={userBasicDetails.phoneNo}
                  className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3"
                  type="number"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-9 border-2 border-dashed overflow-hidden mt-5 py-12 text-[#1E1E1E80] rounded-3xl ">
            <div className="w-full pl-24 max-md-xs:pl-4 flex items-center justify-between pr-28 max-md-xs:pr-4 border-b-2 border-dashed pb-2 ">
              <h3 className="">SKILL & EXPERTISE</h3>
              <div className="flex items-center justify-center ">
                <button
                  className="w-6 h-5 flex items-center justify-center rounded-[4px] border-2 text-[20px] text-black"
                  onClick={addSkill}
                >
                  +
                </button>
                <input
                  className="w-5 ml-4 h-5 rounded-[50px] outline-none "
                  type="checkbox"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start gap-3 mt-3">
              {skills.map((skill, index) => (
                <div
                  className="pl-24 max-md-xs:pl-4 flex items-center"
                  key={index}
                >
                  <input
                    className="w-28 outline-none border-2 rounded-lg pl-3"
                    type="text"
                    name="name"
                    placeholder="Skill Name"
                    value={skill.name}
                    onChange={(event) => handleSkillChange(index, event)}
                  />
                  <input
                    className="w-64 max-md-xs:w-[180px] outline-none border-2 rounded-lg pl-3 ml-4"
                    type="number"
                    name="level"
                    placeholder="Enter your skill 1 to 100."
                    max={100}
                    min={1}
                    value={skill.level}
                    onChange={(event) => handleSkillChange(index, event)}
                  />

                  <svg
                    onClick={() => removeSkill(index)}
                    className="ml-2 cursor-pointer"
                    fill="#ff0000"
                    height="30px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xml:space="preserve"
                    stroke="#ff0000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="5.9399999999999995"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="XMLID_6_">
                        {" "}
                        <g id="XMLID_11_">
                          {" "}
                          <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z" />{" "}
                        </g>{" "}
                        <g id="XMLID_18_">
                          {" "}
                          <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />{" "}
                        </g>{" "}
                        <g id="XMLID_23_">
                          {" "}
                          <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full pt-9 border-2 border-dashed overflow-hidden mt-5 py-12 text-[#1E1E1E80] rounded-3xl">
            <div className="w-full pl-24 max-md-xs:pl-4 flex items-center justify-between max-md-xs:pr-2 border-b-2 border-dashed pb-2">
              <h3 className="">WORK EXPERIENCE</h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="w-[30px] h-[30px] flex items-center justify-center border-2 text-[20px] text-black"
                  onClick={handleAddExperience}
                >
                  +
                </button>

                <svg
                  className="cursor-pointer"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="sort-list-button">
                    <rect width="30" height="30" rx="10" fill="white" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="29"
                      height="29"
                      rx="9.5"
                      stroke="#1E1E1E"
                      strokeOpacity="0.25"
                    />
                    <path
                      id="Vector"
                      d="M11 23V13M11 23L8 20M11 23L14 20M19 7V17M19 7L22 10M19 7L16 10"
                      stroke="#1E1E1E"
                      strokeOpacity="0.75"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>

                <input
                  className="w-5 ml-4 h-5 rounded-[50px] outline-none"
                  type="checkbox"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start gap-3 mt-3 pl-24 max-md-xs:pl-4 pr-24">
              {experiences.map((experience, index) => (
                <div key={index}>
                  <div className="flex gap-2 items-center justify-between">
                    <input
                      className="border-2 pl-3 rounded-lg outline-none w-[170px] max-md-xs:w-[130px] text-[12px] h-[40px]"
                      type="text"
                      placeholder="Company name"
                      value={experience.company}
                      onChange={(e) =>
                        handleChange(index, "company", e.target.value)
                      }
                    />
                    <input
                      className="border-2 pl-3 rounded-lg outline-none w-[150px] max-md-xs:w-[100px] h-[40px] text-[12px]"
                      type="number"
                      min={1900}
                      max={2099}
                      placeholder="Year"
                      value={experience.year}
                      onChange={(e) =>
                        handleChange(index, "year", e.target.value)
                      }
                    />
                    <input
                      className="border-2 pl-3 rounded-lg outline-none w-[120px] max-md-xs:w-[100px] h-[40px] text-[12px]"
                      type="text"
                      placeholder="Ending date"
                      value={experience.endDate}
                      onChange={(e) =>
                        handleChange(index, "endDate", e.target.value)
                      }
                    />

                    <svg
                      onClick={() => removeWorkExperience(index)}
                      className="ml-2 cursor-pointer"
                      fill="#ff0000"
                      height="30px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330"
                      xml:space="preserve"
                      stroke="#ff0000"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke="#CCCCCC"
                        stroke-width="5.9399999999999995"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="XMLID_6_">
                          {" "}
                          <g id="XMLID_11_">
                            {" "}
                            <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z" />{" "}
                          </g>{" "}
                          <g id="XMLID_18_">
                            {" "}
                            <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />{" "}
                          </g>{" "}
                          <g id="XMLID_23_">
                            {" "}
                            <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </div>
                  <div>
                    <input
                      className="border-2 pl-3 rounded-lg outline-none w-full mt-4 h-[40px]"
                      type="text"
                      placeholder="Role"
                      value={experience.role}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full pt-9 border-2 border-dashed overflow-hidden mt-5 py-12 text-[#1E1E1E80] rounded-3xl ">
            <div className="w-full pl-24 max-md-xs:pl-4 max-md-xs:pr-4 flex items-center justify-between pr-28 border-b-2 border-dashed pb-2 ">
              <h3 className="">EDUCATION</h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="w-[30px] h-[30px] flex items-center justify-center border-2 text-[20px] text-black"
                  onClick={addEducation}
                >
                  +
                </button>
                <svg
                  className="cursor-pointer"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="sort-list-button">
                    <rect width="30" height="30" rx="10" fill="white" />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="29"
                      height="29"
                      rx="9.5"
                      stroke="#1E1E1E"
                      stroke-opacity="0.25"
                    />
                    <path
                      id="Vector"
                      d="M11 23V13M11 23L8 20M11 23L14 20M19 7V17M19 7L22 10M19 7L16 10"
                      stroke="#1E1E1E"
                      stroke-opacity="0.75"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
                <input
                  className="w-5 ml-4 h-5 rounded-[50px] outline-none"
                  type="checkbox"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-3 pl-24 max-md-xs:pl-4 max-md-xs:pr-4 pr-24">
              {education.map((edu, index) => (
                <div
                  className="flex items-center justify-between w-full gap-3"
                  key={index}
                >
                  <input
                    className="w-[100px] pl-3 outline-none border-2 rounded-lg max-md-xs:w-[60px]"
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                  <input
                    className="w-[80px] pl-3 outline-none border-2 rounded-lg max-md-xs:w-[80px]"
                    type="text"
                    name="degree"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                  <input
                    className="w-[120px] pl-3 outline-none border-2 rounded-lg max-md-xs:w-[80px]"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={edu.subject}
                    onChange={(event) => handleEducationChange(index, event)}
                  />

                  <input
                    className="w-[80px] pl-3 outline-none border-2 rounded-lg"
                    type="number"
                    name="marks"
                    placeholder=" %"
                    value={edu.marks}
                    onChange={(event) => handleEducationChange(index, event)}
                  />
                  <svg
                    onClick={() => removeEducation(index)}
                    className="ml-2 cursor-pointer"
                    fill="#ff0000"
                    height="30px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xml:space="preserve"
                    stroke="#ff0000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="5.9399999999999995"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="XMLID_6_">
                        {" "}
                        <g id="XMLID_11_">
                          {" "}
                          <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z" />{" "}
                        </g>{" "}
                        <g id="XMLID_18_">
                          {" "}
                          <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />{" "}
                        </g>{" "}
                        <g id="XMLID_23_">
                          {" "}
                          <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full pt-9 border-2 border-dashed overflow-hidden mt-5 py-12 text-[#1E1E1E80] rounded-3xl ">
            <div className="w-full pl-24 max-md-xs:pl-4 max-md-xs:pr-4 flex items-center justify-between pr-28 border-b-2 border-dashed pb-2 ">
              <h3 className="">SOCIAL MEDIA LINKS</h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="w-[30px] h-[30px] flex items-center justify-center border-2 text-[20px] text-black"
                  onClick={addLink}
                >
                  +
                </button>

                <input
                  className="w-5 ml-4 h-5 rounded-[50px] outline-none"
                  type="checkbox"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-3 pl-24 max-md-xs:pl-4 max-md-xs:pr-4 pr-24">
              {links.map((link, index) => (
                <div className="flex items-center justify-between" key={index}>
                  <select
                    onChange={(event) => handleLinkChange(index, event)}
                    className="w-[30%] outline-none border-2 rounded-xl pl-3"
                    value={link.platform}
                    name="platform"
                  >
                    <option value="">Select Socail Media</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Github">Github</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>

                  <input
                    className="w-[70%] outline-none border-2 rounded-xl pl-3"
                    type="url"
                    name="url"
                    placeholder="URL"
                    value={link.url}
                    onChange={(event) => handleLinkChange(index, event)}
                  />
                  <svg
                    onClick={() => removeLink(index)}
                    className="ml-2 cursor-pointer"
                    fill="#ff0000"
                    height="30px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330"
                    xml:space="preserve"
                    stroke="#ff0000"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="5.9399999999999995"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="XMLID_6_">
                        {" "}
                        <g id="XMLID_11_">
                          {" "}
                          <path d="M240,121.076H30V275c0,8.284,6.716,15,15,15h60h37.596c19.246,24.348,49.031,40,82.404,40c57.897,0,105-47.103,105-105 C330,172.195,290.816,128.377,240,121.076z M225,300c-41.355,0-75-33.645-75-75s33.645-75,75-75s75,33.645,75,75 S266.355,300,225,300z" />{" "}
                        </g>{" "}
                        <g id="XMLID_18_">
                          {" "}
                          <path d="M240,90h15c8.284,0,15-6.716,15-15s-6.716-15-15-15h-30h-15V15c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v45H45 H15C6.716,60,0,66.716,0,75s6.716,15,15,15h15H240z M90,30h90v30h-15h-60H90V30z" />{" "}
                        </g>{" "}
                        <g id="XMLID_23_">
                          {" "}
                          <path d="M256.819,193.181c-5.857-5.858-15.355-5.858-21.213,0L225,203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213,0 c-5.858,5.858-5.858,15.355,0,21.213L203.787,225l-10.606,10.606c-5.858,5.858-5.858,15.355,0,21.213 c2.929,2.929,6.768,4.394,10.606,4.394c3.839,0,7.678-1.465,10.607-4.394L225,246.213l10.606,10.606 c2.929,2.929,6.768,4.394,10.607,4.394c3.839,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L246.213,225 l10.606-10.606C262.678,208.535,262.678,199.039,256.819,193.181z" />{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
