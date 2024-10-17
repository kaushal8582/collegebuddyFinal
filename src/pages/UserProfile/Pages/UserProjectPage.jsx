import React, { useContext, useState } from "react";
import UserAllProjects from "../Component/UserAllProjects";
import UploadProject from "./UploadProject";
import { useNavigate } from "react-router-dom";
import myContext from "../../../components/context/myContext";

const UserProjectPage = ({onlyView,pData}) => {
  const context = useContext(myContext);
  const { profileData } = context;

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handelImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Navigate after setting the image
      navigate("/uploadproject", { state: { img: imageUrl, file: file } });
    }
  };

  return (
    <>
      <div className="w-full relative">
        {!onlyView && <>
          <div className="w-full pt-9 border-2 overflow-hidden relative mt-8 p-5 text-[#1E1E1E80] rounded-3xl ">
          <label
            htmlFor="inputimg"
            className="border-2 border-dashed w-full h-full flex p-7 rounded-3xl cursor-pointer flex-col items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15L17.9 11.9C17.5237 11.5312 17.017 11.3258 16.4901 11.3284C15.9632 11.331 15.4586 11.5415 15.086 11.914L6 21"
                stroke="#1E1E1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 19.5L17 16.5M17 16.5L20 19.5M17 16.5V22"
                stroke="#1E1E1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z"
                stroke="#1E1E1E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h2>Drag a cover image to create a new project</h2>
            <input
              className=" hidden "
              id="inputimg"
              type="file"
              onChange={handelImageUpload}
              accept="image/*"
            />
          </label>
        </div>
        </>}

        <div>
  {/* If onlyView is true, show pData projects, else show profileData projects */}
  {onlyView 
    ? (pData?.projects?.length > 0 
      ? pData.projects.map((project, index) => {
          return (
            <div key={index}>
              <UserAllProjects
                desc={project.projectDesc}
                githublink={project.projectGithubLink}
                img={project.projectImg}
                livelink={project.projectLiveLink}
                name={pData.userId?.name} 
                title={project.projectTitle}
                profileImg={pData.img} 
              />
            </div>
          );
        })
      : <p>No projects to show.</p>) // Handle case when no projects in pData
    : (profileData?.projects?.length > 0 
      ? profileData.projects.map((project, index) => {
          return (
            <div key={index}>
              <UserAllProjects
                onlyView={onlyView}
                desc={project.projectDesc}
                githublink={project.projectGithubLink}
                img={project.projectImg}
                livelink={project.projectLiveLink}
                name={profileData.userId?.name}
                title={project.projectTitle}
                profileImg={profileData.img}
              />
            </div>
          );
        })
      : <p>No projects to show.</p> // Handle case when no projects in profileData
    )
  }
</div>

      </div>
    </>
  );
};

export default UserProjectPage;
