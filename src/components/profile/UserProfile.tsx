'use client'
import { useState } from 'react';
import { User, Interview, mockInterview, mockCompany } from "@/mock_data/mocks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencil,faSave } from "@fortawesome/free-solid-svg-icons";

type Prop = {
  user: User;
};

export default function UserProfile({ user }: Prop) {
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
        <div className="p-[1.5rem] bg-primary w-[45%] text-white text-[1.2rem]">
          {/* User details rendering */}
          <div className="flex gap-[1rem] items-center">
          <div className="w-[74px] h-[74px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <div className="text-white text-[1.5rem]">{user.name}</div>
            <div className="text-white text-[1rem]">{user.role}</div>
          </div>
        </div>
        <div className="mt-[2rem] mx-auto h-[2px] bg-white"></div>
        <div className="mt-[2rem] font-bold">Email</div>
        <div>{user.email}</div>
        <div className="mt-[2rem] font-bold">Telephone Number</div>
        <div>{user.telephoneNumber}</div>
        </div>
        <div className="overflow-y-auto h-64 p-5">
          <h1 className="text-[24px] font-bold border-b-2 border-black mb-5 pb-3">รายการจอง</h1>
          {interviews.map((interview: Interview) => {
            const company = mockCompany.find((company) => company._id === interview.company);
            return (
              <div key={interview._id}>
                <div className="font-bold lg:text-[18px] text-[14px] my-2 flex justify-between">
                  {/* Company and interview date */}
                  <span>
                    {company?.name} - 
                    {/* Render input field for date */}
                    <input
                      type="text"
                      value={interview.date}
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
