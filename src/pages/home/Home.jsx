import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import AboutComponent from "../../components/aboutComponent/AboutComponent";
import OurCoursesComponent from "../../components/ourCourse/OurCoursesComponent.jsx";
import OurResourceComponent from "../../components/OurResource/OurResourceComponent.jsx";
import ConsultancyComponent from "../../components/consultancy/ConsultancyComponent .jsx";
import FeedbackSection from "../../components/Feedbacks/FeedbackSection.jsx";

const Home = () => {

  

  return (
    <Layout>
      <HeroSection />
      <AboutComponent />
      <OurCoursesComponent />
      <FeedbackSection />
      <OurResourceComponent />
      <ConsultancyComponent />
    </Layout>
  );
};

export default Home;
