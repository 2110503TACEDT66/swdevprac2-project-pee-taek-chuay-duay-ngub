import { User, Interview, mockUser, mockCompany, mockInterview, Company } from "@/mock_data/mocks";

type Prop = {
  company: Company;
};

export default function CompanyProfile({ company }: Prop) {
  const interview: Interview[] = mockInterview.filter((interview) => interview.company === company._id);

  return (
    <div className="flex shadow-xl w-[80vw] min-h-[80vh] mx-auto rounded-[10px] overflow-hidden">
      <div className="p-[1.5rem] bg-primary w-[45%] text-white text-[1.2rem]">
        <div className="flex gap-[1rem] items-center">
          <div className="w-[74px] h-[74px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <div className="text-white text-[1.5rem]">{company.name}</div>
            <div className="text-white text-[1rem]">Company</div>
          </div>
        </div>
        <div className="mt-[2rem] mx-auto h-[2px] bg-white"></div>
        <div className="mt-[2rem]">Company Description</div>
        <div>{company.description}</div>
        <div className="mt-[2rem]">Company Website</div>
        <div>{company.website}</div>
        <div className="mt-[2rem]">Company Address</div>
        <div>{company.address}</div>
        <div className="mt-[2rem]">Telephone Number</div>
        <div>{company.telephoneNumber}</div>
      </div>
      <div>
        {
          interview.map((interview: Interview) => {
            const user = mockUser.find((user) => user._id === interview.user);
            return (
              <div>
                <div>
                  {interview.date}
                </div>
                {user?.name}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
