import UserProfile from "@/components/profile/UserProfile";
import { mockUser, mockCompany } from "@/mock_data/mocks";

export default function Home({ params }: { params: { id: string } }) {
  const user = mockUser.find((user) => user._id === params.id);
  const company = mockCompany.find((company) => company._id === params.id);

  return (
    <div className="bg-white h-[100vh] text-black">
      {user ? (company ? <CompanyProfile company={company} /> : <UserProfile user={user} />) : <div>No user found.</div>}
    </div>
  );
}
