'use client'
import Spinner from "@/components/loading/spinner";
import CompanyProfile from "@/components/profile/CompanyProfile";
import UserProfile from "@/components/profile/UserProfile";
import { mockUser, mockCompany, Company } from "@/mock_data/mocks";
import { getCompany } from "@/utils/getStuff";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Home({ params }: { params: { id: string } }) {
  const session = useSession();
  const id = params.id;

  const [company, setCompany] = useState<Company | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setCompany(null);
        return;
      }
      const a_company = await getCompany(id);
      console.log('Company Was now Setted:', a_company);
      setCompany(a_company ?? null);
    };
    fetchData();
  }, [id]);

  if (!session.data?.user) {

    return (
      <div className="bg-white h-[100vh] text-black">
        <div className="flex justify-center items-center h-[100vh]">
          <Spinner />
        </div>
      </div>
    )

  }

  if (session.data?.user?.role != 'admin') {
    return (
      <div className="bg-white h-[100vh] text-black text-center">
        <div>You do not have permission to view this page, goes back to where you came from!</div>
      </div>
    )
  }
  return (
    <div className="bg-white h-[100vh] text-black">
      {company ? (
        <CompanyProfile company={company} />
      ) : (
        // center this shit
        <div className="flex justify-center items-center h-[100vh]">
          <Spinner />
        </div>
      )}
    </div>
  );
}
