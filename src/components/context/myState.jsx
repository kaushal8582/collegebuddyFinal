import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../Helper";
import { useNavigate } from "react-router-dom";

const myState = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allEbook, setAllEbook] = useState([]);
  const [allPyq, setAllPyq] = useState([]);
  const [allStudyMaterial, setStudyMaterail] = useState([]);
  const [loader, setLoader] = useState(false);
  const [allUniversityname, setAllUniversityName] = useState([]);
  const [allCourseName, setAllCourseName] = useState([]);
  const [getAllVideo, setAllVideo] = useState();
  const [getAllTeam, setAllTeam] = useState();
  const [profileData,setProfileData] = useState({})

  

  useEffect(() => {
    const getAllEbooks = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/ebooks/getallebooks`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setAllEbook(data.data);
      } catch (error) {
        console.log(error);
        // return toast.error("Not fetched Ebooks");
      } finally {
        setLoader(false);
      }
    };
    getAllEbooks();
  }, []);

  useEffect(() => {
    const getAllTeamMeber = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/team/all-team-member`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setAllTeam(data.data);
      } catch (error) {
        console.log(error);
        // return toast.error("Not fetched Team Member");
      } finally {
        setLoader(false);
      }
    };
    getAllTeamMeber();
  }, []);

  useEffect(() => {
    const getAllUnivesityName = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/college/getallcollegename`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setAllUniversityName(data.data);
      } catch (error) {
        console.log(error);
        // return toast.error("Not fetched UniversityName");
      } finally {
        setLoader(false);
      }
    };
    getAllUnivesityName();
  }, []);

  useEffect(() => {
    const getAllCourseName = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/course/getallcoursename`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setAllCourseName(data.data);
      } catch (error) {
        console.log(error);
        // return toast.error("Not fetched CourseName");
      } finally {
        setLoader(false);
      }
    };
    getAllCourseName();
  }, []);

  useEffect(() => {
    const getAllPyq = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/pyq/getallpyq`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setAllPyq(data.data);
      } catch (error) {
        console.log(error);
        // return toast.error("Not fetched pyq");
      } finally {
        setLoader(false);
      }
    };
    getAllPyq();
  }, []);

  useEffect(() => {
    const getAllStudyMaterial = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/studymaterial/getallstudymaterial`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setStudyMaterail(data.data);
      } catch (error) {
        console.log(error);
        // return toast.error("Not fetched pyq");
      } finally {
        setLoader(false);
      }
    };
    getAllStudyMaterial();
  }, []);

  useEffect(() => {
    const datavalue = JSON.parse(localStorage.getItem("user"));
    const accessToken = datavalue?.accessToken;
    // console.log(accessToken);
    if (!accessToken) {
      // setIsAdmin(false);
      setIsLogin(false);
      return;
    }
    // setIsAdmin(true)
    setIsLogin(true);
  }, []);

  useEffect(() => {
    const getAllVideo = async () => {
      try {
        // setLoader(true);
        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/video/get-all-video`,
          {
            method: "GET",
          }
        );
        const value = await response.json();
        const data = value.data;
        setAllVideo(data);
      } catch (error) {
        // console.log("Fetching all video error ", error);
      } finally {
        setLoader(false);
      }
    };

    getAllVideo();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoader(true)
      const datavalue = JSON.parse(localStorage.getItem("user"));
      const accessToken = datavalue?.accessToken;
      if(!datavalue.data){
        navigate("/login")
      }

      const response = await fetch(`${BASE_URL}/collegebuddy/api/v1/profile/getprofiledetails/${datavalue.data._id}`,{
        method:"GET",
        headers: { 
        Authorization: `Bearer ${accessToken}`,
        }
      })


      if (!response.ok) {
        // Log the status and error message
        const errorMessage = await response.text();
        console.error("Error fetching profile data:", response.status, errorMessage);
        return;
      }

      const data = await response.json()
      setProfileData(data.data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoader(false);
    }
  };

  useEffect(()=>{
    fetchProfileData()
  },[])


  const handleShare = async (username,name,password) => {  
    const shareUrl = `https://collegebuddytesting.netlify.app/profile/@${username}?p=${password}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my Profile!`,
          text: `Check out the profile of ${
           name
          } on CollegeBuddy!`,
          url: shareUrl,
        });
        console.log("Profile shared successfully");
      } catch (error) {
        console.error("Error sharing profile:", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser.");
      navigator.clipboard.writeText(shareUrl);
      alert("Profile URL copied to clipboard!");
    }
  };



  return (
    <myContext.Provider
      value={{
        allEbook,
        allPyq,
        allStudyMaterial,
        isAdmin,
        setIsAdmin,
        isLogin,
        setIsLogin,
        loader,
        setLoader,
        allCourseName,
        allUniversityname,
        getAllVideo,
        getAllTeam,
        setAllTeam,
        fetchProfileData,
        profileData,
        setProfileData,
        handleShare
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default myState;
