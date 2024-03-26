'use client'
import CompanyProfile from "@/components/profile/CompanyProfile";
import UserProfile from "@/components/profile/UserProfile";
import { useSession } from "next-auth/react";


export default function Home({ params }: { params: { id: string } }) {
    const session = useSession();
    return (
        <div className="bg-white h-[100vh] text-black">
            {session.data?.user ? (
                session.data.user.role == "company" ? (
                    // <CompanyProfile company={session.data.user.id} />
                    <div>Company</div>
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
