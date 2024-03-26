'use client'
import Spinner from "@/components/loading/spinner";
import CompanyProfile from "@/components/profile/CompanyProfile";
import UserProfile from "@/components/profile/UserProfile";
import { Company } from "@/mock_data/mocks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    telephoneNumber: string;
    role: string;
    company?: string; // company id, if user is a company user
}

export default function Home({ params }: { params: { id: string } }) {
    const session = useSession();
    const [company, setCompany] = useState<Company | undefined>(undefined);
    useEffect(() => {
        if (session.data?.user && session.data.user.role == "company") {
            // fetch company data
            fetch(`/api/company/${session.data.user.company}`)
                .then((res) => res.json())
                .then((data) => {
                    setCompany(data.data as Company);
                })
                .catch((error) => {
                    console.error("Error fetching company data:", error);
                });
        }
    }
        , [session.data?.user]);

    return (
        <div className="bg-white h-[100vh] text-black">
            {session.data?.user ? (
                session.data.user.role == "company" ? (
                    (
                        company ? (
                            <CompanyProfile company={company} />
                        ) : (
                            <Spinner />
                        )
                    )
                ) : (
                    <UserProfile user={
                        {
                            _id: session.data.user.id,
                            name: session.data.user.name,
                            email: session.data.user.email,
                            telephoneNumber: session.data.user.telephoneNumber,
                            role: session.data.user.role,
                            company: undefined
                        }
                    } />
                )
            ) : (
                <div>No user found.</div>
            )}
        </div>
    );
}
