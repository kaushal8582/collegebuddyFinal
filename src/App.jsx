import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import {isTokenExpired} from "./App.jsx"
import Home from "./pages/home/Home";
import Register from "./pages/rejister/Register";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/pages/AdminDashboard";
import AddEbokForm from "./pages/Admin/component/AddEboks Form/EbookForm";
import AddPYQForm from "./pages/Admin/component/Pyq Form/AddPYQForm";
import AddStudyMaterialForm from "./pages/Admin/component/studyMaterialForm/AddStudyMaterialForm";
import Ebooks from "./pages/Ebooks/Ebooks";
import Pyqquestion from "./pages/PYQ/pages/Pyqquestion";
import ResourcePage from "./pages/studyMaterial/ResourcePage";
import { Toaster } from "react-hot-toast";
import MyState from "./components/context/myState";
import { useContext } from "react";
import myContext from "./components/context/myContext";
import { useState, useEffect } from "react";
import ForgotPassword from "./pages/forgot Password/ForgotPassword";
import AddUniversity from "./pages/Admin/component/Add University/AddUniversity";
import AddCourse from "./pages/Admin/component/Add Course/AddCourse";
import Video from "../src/pages/videos/Video.jsx";
import AddVideoForm from "./pages/Admin/component/Add Video/AddVideoForm.jsx";
import Team from "./pages/OurTeam/pages/Team.jsx";
import { BASE_URL } from "../Helper.jsx";
import AddTeamForm from "./pages/Admin/component/Add Team/component/AddTeamForm.jsx";
import DashboardHome from "./Dashboard/Pages/DashboardHome.jsx";
import UserProfilePage from "./pages/UserProfile/Pages/UserProfilePage.jsx";
import EditProfile from "./pages/EditProfile/pages/EditProfile.jsx";
import UploadProject from "./pages/UserProfile/Pages/UploadProject.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import SkeletonEffectCard from "./components/skeletonEffect/SkeletonEffectCard.jsx";
import Notification from "./Dashboard/Pages/Notification.jsx";

function App() {
  return (
    <div className="w-full min-h-[100vh] bg-gray-200 relative">
      <MyState>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                // <IsTokenExpiredForHomePage>
                  <Home /> 
                // </IsTokenExpiredForHomePage>
              }
            />
            <Route path="/uploadproject" element={<UploadProject />} />

            <Route
              path="/dashboard"
              element={
                <IsTokenExpired>
                  <DashboardHome />
                </IsTokenExpired>
              }
            />
            <Route
              path="/notification"
              element={
                // <IsTokenExpired>
                  <Notification />
                // </IsTokenExpired>
              }
            />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route
              path="/profile/:username"
              element={<UserProfilePage findUser={true} />}
            />

            <Route path="/team" element={<Team />} />
            <Route path="/rejister" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/pyq" element={<Pyqquestion />} />
            <Route path="/video" element={<Video />} />
            <Route path="/study" element={<ResourcePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/*" element={<NotFoundPage />} />

            <Route
              path="/admindashboard"
              element={
                <AdminRouteProtected>
                  <AdminDashboard />
                </AdminRouteProtected>
              }
            />
            <Route
              path="/addebookform"
              element={
                <AdminRouteProtectedSecond>
                  <AddEbokForm />
                </AdminRouteProtectedSecond>
              }
            />
            <Route
              path="/addpyqform"
              element={
                <AdminRouteProtectedSecond>
                  <AddPYQForm />
                </AdminRouteProtectedSecond>
              }
            />
            <Route
              path="/addvideoform"
              element={
                <AdminRouteProtectedSecond>
                  <AddVideoForm />
                </AdminRouteProtectedSecond>
              }
            />
            <Route
              path="/addteamform"
              element={
                <AdminRouteProtectedSecond>
                  <AddTeamForm />
                </AdminRouteProtectedSecond>
              }
            />
            <Route
              path="/adduniversityname"
              element={
                <AdminRouteProtectedSecond>
                  <AddUniversity />
                </AdminRouteProtectedSecond>
              }
            />
            <Route
              path="/addcoursename"
              element={
                <AdminRouteProtectedSecond>
                  <AddCourse />
                </AdminRouteProtectedSecond>
              }
            />
            <Route
              path="/addstudymaterialform"
              element={
                <AdminRouteProtectedSecond>
                  <AddStudyMaterialForm />
                </AdminRouteProtectedSecond>
              }
            />
          </Routes>
        </Router>
      </MyState>
      <Toaster />
    </div>
  );
}

export default App;

export const IsTokenExpired = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const checkLogedInUser = () => {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      if (!datavalue) setIsLogin(false); // No token means expired
      const expirationTime = datavalue?.expireTime;
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        localStorage.removeItem("user"); // Sirf user data remove karo agar token expired ho
        setIsLogin(false);
        return true;
      }
    };
    checkLogedInUser();
  }, []);

  return isLogin ? children : <Navigate to="/login" />;
};

export const IsTokenExpiredForHomePage = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const checkLogedInUser = () => {
      const datavalue = JSON.parse(localStorage.getItem("user"));
      if (!datavalue) setIsLogin(false); // No token means expired


    };
    checkLogedInUser();
  }, []);

  return isLogin ? <Navigate to={"/dashboard"} /> : children;
};

export const AdminRouteProtected = ({ children }) => {
  const context = useContext(myContext);
  const { isAdmin, setIsAdmin, isLogin, setIsLogin } = context;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const datavalue = JSON.parse(localStorage.getItem("user"));
        const accessToken = datavalue?.accessToken;
        if (!accessToken) {
          setIsAuthorized(false);
          setIsAdmin(false);
          return;
        }

        const response = await fetch(
          `${BASE_URL}/collegebuddy/api/v1/users/admin`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            method: "GET",
          }
        );
        const data = await response.json();

        if (response.status === 401) {
          setIsAuthorized(false);
          setIsAdmin(false);
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        setIsAdmin(true);
        setIsAuthorized(!!data);
      } catch (error) {
        console.log("Admin protected error", error);
        // toast.error("Access denied");
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export const AdminRouteProtectedSecond = ({ children }) => {
  const context = useContext(myContext);
  const { isAdmin } = context;
  return isAdmin == true ? children : <Navigate to="/login" />;
};
