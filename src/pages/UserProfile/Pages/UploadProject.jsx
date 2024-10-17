import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import myContext from "../../../components/context/myContext";
import { BASE_URL } from "../../../../Helper";
import Loader from "../../../components/Loader/Loader";

const UploadProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.img;
  const file = location.state?.file;
  const [profileId, setProfileId] = useState(null);
  const context = useContext(myContext);
  const { profileData, loader, setLoader } = context;

  useEffect(() => {
    setProfileId(profileData?._id);
  }, []);

  // Project details state
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    desc: "",
    liveLink: "",
    codeRepoLink: "",
    image: file || null,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleShare = async () => {
    let formData = new FormData();

    formData.append("profileId", profileId);

    if (!projectDetails.title) {
      return toast.error("Title is required");
    }
    formData.append("title", projectDetails.title);
    if (!projectDetails.desc) {
      return toast.error("Description is required");
    }
    formData.append("desc", projectDetails.desc);
    if (!projectDetails.image) {
      return toast.error("Image is required is required");
    }
    formData.append("projectImg", projectDetails.image);
    formData.append("livelink", projectDetails.liveLink || "");
    formData.append("githublink", projectDetails.codeRepoLink || "");

    try {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      const accessToken = datavalue?.accessToken;

      setLoader(true);

      const response = await fetch(
        `${BASE_URL}/collegebuddy/api/v1/profile/uploadproject`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Project upload successfully ");
        setProjectDetails({
          title: "",
          desc: "",
          liveLink: "",
          codeRepoLink: "",
          image: image || null,
        });

        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("upload failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full bg-white p-10 max-sm-xs:p-3 min-h-screen grid relative place-items-center">

      <div className="w-[400px] max-sm-xs:w-full  bg-white border p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-5">
            <Link to={"/profile"}>
              <div className="w-9 h-9 rounded-full border-2 grid place-items-center cursor-pointer">
                <svg
                  width="18"
                  height="12"
                  viewBox="0 0 18 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 6L1.28571 6M1.28571 6L6.28571 11M1.28571 6L6.28571 1"
                    stroke="#8E8E8E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
            <h3>Create new project</h3>
          </div>
          <button
            onClick={handleShare}
            className="border-2 rounded-2xl px-4 py-1 cursor-pointer"
          >
            Share
          </button>
        </div>

        <img
          className="w-full h-[300px] max-sm-xs:h-[250px]"
          src={image}
          alt="Project"
        />

        <input
          name="title"
          value={projectDetails.title}
          onChange={handleChange}
          type="text"
          placeholder="Enter Project Title..."
          className="mt-5 w-full h-11 outline-none border-2 border-dashed rounded-lg pl-3"
        />

        <textarea
          name="desc"
          value={projectDetails.desc}
          onChange={handleChange}
          placeholder="Enter project description .."
          rows={4}
          className="w-full mt-4 outline-none border-2 border-dashed pl-3 rounded-lg"
        />

        <input
          name="codeRepoLink"
          value={projectDetails.codeRepoLink}
          onChange={handleChange}
          type="url"
          placeholder="Paste your project repo link ...."
          className="mt-5 w-full h-11 outline-none border-2 border-dashed rounded-lg pl-3"
        />

        <input
          name="liveLink"
          value={projectDetails.liveLink}
          onChange={handleChange}
          type="url"
          placeholder="Paste your project live link ...."
          className="mt-5 w-full h-11 outline-none border-2 border-dashed rounded-lg pl-3"
        />
      </div>
    </div>
  );
};

export default UploadProject;
