import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { User, Interview, mockUser, mockCompany, mockInterview, Company } from "@/mock_data/mocks";

type Prop = {
  company: Company;
};

export default function CompanyProfile({ company }: Prop) {
  const interview: Interview[] = mockInterview.filter((interview) => interview.company === company._id);

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
          <h1 className="text-[24px] font-bold border-b-2 border-black mb-5 pb-3">Interviews</h1>
          {
            interview.map((interview: Interview) => {
              const user = mockUser.find((user) => user._id === interview.user);
              return (
                <div>
                  <div className="font-bold lg:text-[18px] text-[14px] my-2 flex justify-between items-center">
                    {user?.name} - {interview.date} 
                    <button>
                      <FontAwesomeIcon icon={faTrashAlt} className="w-[20px] mx-1" style={{ color: "red" }} width={20} />
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
