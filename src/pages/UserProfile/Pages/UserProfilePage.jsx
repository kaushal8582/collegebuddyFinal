import React, { useContext, useEffect, useState } from "react";
import UserProfileNav from "../Component/UserProfileNav";
import UserProfileCard from "../Component/UserProfileCard";
import UserDetailsPage from "./UserDetailsPage";
import UserProjectPage from "./UserProjectPage";
import myContext from "../../../components/context/myContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../Helper";

const UserProfilePage = ({findUser}) => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { fetchProfileData, profileData, setProfileData } = context;
  const { username } = useParams();
  const [error, setError] = useState(false); // To handle the error state
  const [pData, setPData] = useState();
  const location = useLocation();
  

  useEffect(() => {
    const getUserProfileData = async () => {
      if (findUser) {
        if (username.charAt(0) !== "@") {
          setError(true);
          console.log("User not found");
          return;
        }

       
        const queryParams = new URLSearchParams(location.search);
        const pValue = queryParams.get('p');
        let usernameValue = username.slice(1);
        try {
          const response = await fetch(`${BASE_URL}/collegebuddy/api/v1/profile/getprofiledataforeveryone/${usernameValue}`, {
            headers:{
              "Content-Type": "application/json",
            },
            method: "POST",
            body:JSON.stringify({password:pValue})
          });

          const data = await response.json();

          if (response.status === 200) {
            
            setPData(data.data);
            setError(false); // Reset the error state on successful fetch
          } else {
            setError(true); // If the status is not 200, show error
          }
        } catch (error) {
          setError(true); // Catch and set the error state
          console.log(error);
        }
      }
    };
    getUserProfileData();
  }, [findUser, username]);

  const [userSection, setUserSection] = useState("details");
  const [editPage, setEditPage] = useState(false);

  useEffect(() => {
    async function fast() {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      if ( !datavalue) {
        navigate("/login");
      }

      setEditPage(false);
      if (!findUser && datavalue?.data?.createdProfile) {
        await fetchProfileData();
      }
    }

    if(!findUser){
      fast();
    }

  }, []);


  useEffect(()=>{   
    const localData = JSON.parse(localStorage.getItem("user"));
    if(localData?.data?.createdProfile==false)
    {
      navigate("/editprofile")
    }
  },[])

  return (
    <div className="w-full min-h-screen bg-white p-5 pb-10">
      {error ? (
        <div className="w-full h-screen flex justify-center items-center">
          {/* Error message when profile is not found */}
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Profile Not Found!</strong>
            <span className="block sm:inline"> Sorry, we couldn't find the profile you're looking for.</span>
          </div>
        </div>
      ) : (
        <>
          <UserProfileNav editPage={editPage} onlyView={findUser} data={pData} />
          <div className="w-full h-full flex flex-col items-center mt-5">
            <div className="w-[691px] max-md-xs:w-full">
              <UserProfileCard data={findUser ? pData : profileData} />
              <div className="flex items-center justify-center h-[75px]  border-b-2 gap-10">
                <div className="w-1/2 grid place-items-center h-full">
                  <button
                    onClick={() => setUserSection("details")}
                    className={`${userSection === "details" && "border-b-4"} border-[#79B058] h-[75px] w-40`}
                  >
                    Details
                  </button>
                </div>
                <div className="w-1/2 grid place-items-center">
                  <button
                    onClick={() => setUserSection("projects")}
                    className={`${userSection === "projects" && "border-b-4"} border-[#79B058] h-[75px] w-40`}
                  >
                    Projects
                  </button>
                </div>
              </div>

              {userSection === "details" && <UserDetailsPage onlyView={findUser} pData={pData} />}
              {userSection === "projects" && <UserProjectPage onlyView={findUser} pData={pData} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
