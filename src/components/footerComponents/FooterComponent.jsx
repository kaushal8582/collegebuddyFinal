import React from "react";
import discordSvg from "../../assets/resources/svgs/discord_logo.svg";
import instagramSvg from "../../assets/resources/svgs/instagram_logo.svg";
import linkdinSvg from "../../assets/resources/svgs/linkdin_logo.svg";
import xSvg from "../../assets/resources/svgs/x_logo.svg";
import youtubeSvg from "../../assets/resources/svgs/youtube_logo.svg";
import collegeBuddyLogo from "../../assets/resources/svgs/college-buddy-logo-01.svg";
import "../../cssss/utility.css";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <section id="footer" className="w-full h-[550px] p-[50px_80px] bg-white">
      <div className="footer-content w-full h-[400px] border-b-2 border-t-2 border-black pt-[50px] flex justify-between items-start">
        <div className="fsec1 flex flex-col justify-start items-start gap-[25px]">
          <img src={collegeBuddyLogo} alt="" className="h-[70px]" />
          <p>Let’s connect with our socials</p>
          <div className="social-links flex items-center justify-center gap-[10px]">
            <a href="https://discord.com/invite/BJzjcN5Awt" target="_blank">
              {" "}
              <img
                src={discordSvg}
                alt="discord"
                className="w-[40px] h-[40px]"
              />{" "}
            </a>
            <a
              href="https://www.instagram.com/collegebuddy.in/"
              target="_blank"
            >
              <img
                src={instagramSvg}
                alt="instagram"
                className="w-[40px] h-[40px]"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/college-buddy-in/"
              target="_blank"
            >
              <img
                src={linkdinSvg}
                alt="linkdin"
                className="w-[40px] h-[40px]"
              />
            </a>
            <a href="https://x.com/CollegeBuddy_in" target="_blank">
              <img src={xSvg} alt="x" className="w-[40px] h-[40px]" />
            </a>
            <a href="https://www.youtube.com/@college-buddy" target="_blank">
              <img
                src={youtubeSvg}
                alt="youtube"
                className="w-[40px] h-[40px]"
              />
            </a>
          </div>
        </div>
        <div className="fsec2 flex flex-col justify-start items-start gap-[25px]">
          <h2 className="uppercase font-semibold">Company</h2>
          <ol className="flex flex-col justify-start items-start gap-[25px]">
            <li className="relative cursor-pointer capitalize">About us</li>
            <Link to={"/team"}>
              <li className="relative cursor-pointer capitalize">our team</li>
            </Link>
            <li className="relative cursor-pointer capitalize">
              privacy policy
            </li>
            <li className="relative cursor-pointer capitalize">
              terms & conditions
            </li>
          </ol>
        </div>
        <div className="fsec3 flex flex-col justify-start items-start gap-[25px]">
          <h2 className="uppercase font-semibold">community</h2>
          <ol className="flex flex-col justify-start items-start gap-[25px]">
            <a
              href="https://chat.whatsapp.com/LpmIxWmdZR5JHxeNMGCgTc"
              target="_blank"
            >
              <li className="relative cursor-pointer capitalize">WhatsApp</li>
            </a>

            <a href="https://discord.com/invite/BJzjcN5Awt">
              <li className="relative cursor-pointer capitalize">discord</li>
            </a>
          </ol>
        </div>
        <div className="fsec4 flex flex-col justify-start items-start gap-[25px]">
          <h2 className="uppercase font-semibold">get in touch</h2>
          <ol className="flex flex-col justify-start items-start gap-[25px]">
            <a href="tel:+919801907094"> <li className="relative cursor-pointer capitalize">+91 98019 07094</li></a>
            <a href="tel:+917061506562"><li className="relative cursor-pointer capitalize">
              +91 70615 06562
            </li></a>
            <a href="mailto:collegebuddy.in@gmail.com"><li className="relative cursor-pointer lowercase">
              collegebuddy.in@gmail.com
            </li></a>
            <li className="relative cursor-pointer capitalize">
              Hajipur, Vaishali (Bihar), 844102
            </li>
          </ol>
        </div>
      </div>
      <h3 className="mt-[50px] text-center text-[16px] text-gray-500">
        © 2024 COLLEGE BUDDY. All rights reserved.
      </h3>
    </section>
  );
};

export default FooterComponent;
