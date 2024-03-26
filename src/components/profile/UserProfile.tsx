import { User, Interview, mockUser, mockCompany, mockInterview, Company } from "@/mock_data/mocks";

type Prop = {
  user: User;
};

export default function UserProfile({ user }: Prop) {
  const interview: Interview[] = mockInterview.filter((interview) => interview.user === user._id);

  return (
    <div className="flex shadow-xl max-w-2xl min-h-[80vh] mx-auto rounded-[10px] overflow-hidden">
      <div className="p-[1.5rem] bg-primary w-[45%] text-white text-[1.2rem]">
        <div className="flex gap-[1rem] items-center">
          <div className="w-[74px] h-[74px] rounded-full bg-gray-300"></div>
          <div className="flex flex-col">
            <div className="text-white text-[1.5rem]">{user.name}</div>
            <div className="text-white text-[1rem]">{user.role}</div>
          </div>
        </div>
        <div className="mt-[2rem] mx-auto h-[2px] bg-white"></div>
        <div className="mt-[2rem]">Email</div>
        <div>{user.email}</div>
        <div className="mt-[2rem]">Telephone Number</div>
        <div>{user.telephoneNumber}</div>
      </div>
      <div>
        {
          interview.map((interview: Interview) => {
            const company = mockCompany.find((company) => company._id === interview.company);
            return (
              <div>
                <div>
                  {interview.date}
                </div>
                {company?.name}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
