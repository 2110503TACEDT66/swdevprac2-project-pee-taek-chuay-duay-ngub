'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt,faPencil,faSave } from "@fortawesome/free-solid-svg-icons";
import { User, Interview, mockUser, mockCompany, mockInterview, Company } from "@/mock_data/mocks";
import { useState } from "react";
type Prop = {
  company: Company;
};

export default function CompanyProfile({ company }: Prop) {
  const interview: Interview[] = mockInterview.filter((interview) => interview.company === company._id);
  const [interviews, setInterviews] = useState<Interview[]>(mockInterview);
  
  // Function to update interview date
  const updateInterviewDate = (interviewId: string, newDate: string) => {
    const updatedInterviews = interviews.map((interview) => {
      if (interview._id === interviewId) {
        return { ...interview, date: newDate };
      }
      return interview;
    });
    setInterviews(updatedInterviews);
  };
  return (
    <div className="pt-[60px] mx-4">
      <div className="flex shadow-xl max-w-2xl min-h-[70vh] mx-auto rounded-[10px] overflow-hidden">
        <div className="p-[1.5rem] bg-primary w-[45%] text-white text-[1.2rem] sm:text-[0.8rem]"> {/* Smaller text on small screens */}
          <div className="flex gap-[1rem] items-center">
            <div className="w-[74px] h-[74px] rounded-full bg-gray-300"></div>
            <div className="flex flex-col">
              <div className="text-white text-[1.5rem]">{company.name}</div>
              <div className="text-white text-[1rem]">Company</div>
            </div>
          </div>
          <div className="mt-[2rem] mx-auto h-[2px] bg-white"></div>
          <div className="mt-[2rem] font-bold">Description</div>
          <div className="text-[18px]">{company.description}</div>
          <div className="mt-[2rem] font-bold">Website</div>
          <div className="text-[18px]">{company.website}</div>
          <div className="mt-[2rem] font-bold">Address</div>
          <div className="text-[18px]">{company.address}</div>
          <div className="mt-[2rem] font-bold">Telephone Number</div>
          <div className="text-[18px]">{company.telephoneNumber}</div>
        </div>
        <div className="overflow-y-auto h-64 p-5">
  <h1 className="text-[24px] font-bold border-b-2 border-black mb-5 pb-3">รายการจอง</h1>
  {interviews.map((interview: Interview) => {
    const company = mockCompany.find((company) => company._id === interview.company);
    const formattedDate = new Date(interview.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return (
      <div key={interview._id}>
        <div className="font-bold lg:text-[18px] text-[14px] my-2 flex justify-between">
          {/* Company and interview date */}
          <span>
            {company?.name} - 
            {/* Render input field for date */}
            <input
              type="text"
              value={formattedDate}
              onChange={(e) => updateInterviewDate(interview._id, e.target.value)}
              className="border-2 border-gray-300 rounded-md px-2 py-1"
            />
          </span>
          {/* Edit button */}
          <button>
            <FontAwesomeIcon icon={faSave} className="w-[20px] mx-1" style={{ color: 'grey' }} />
          </button>
          {/* Delete button */}
          <button>
            <FontAwesomeIcon icon={faTrashAlt} className="w-[20px] mx-1" style={{ color: 'red' }} />
          </button>
        </div>
      </div>
    );
  })}
</div>

      </div>
    </div>
  );
}
