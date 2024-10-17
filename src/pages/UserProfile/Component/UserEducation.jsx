import React from "react";

const UserEducation = ({data}) => {
  

  return (
    <div className="w-full pt-9 border-2 overflow-hidden mt-8 py-12 text-[#1E1E1E80] rounded-3xl ">
      <h3 className="w-full border-b-2 pl-28 max-md-xs:pl-4">EDUCATION</h3>
      <div className="pl-24 max-md-xs:pl-4" >
      <table className="min-w-[80%] table-auto border-collapse  ">
        <tbody  >
          {data?.education?.map((item, index) => (
            <tr key={index} className="">
              <td className=" p-1">{item?.year}</td>
              <td className=" p-1">{item?.degree}</td>
              <td className=" p-1">{item?.subject}</td>
              <td className=" p-4">{item?.marks} %</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserEducation;
