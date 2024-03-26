import { Company } from "@/mock_data/mocks";
import { User } from "next-auth";

export async function getCompany(companyId: string): Promise<Company> {
    const company = await fetch(`/api/company/${companyId}`);
    const companyData = await company.json() as {
        success: boolean;
        data: Company;
    }
    return companyData.data as Company;
}

interface Get_User extends Omit<User, 'id'> {
    _id: string;
}

export async function getUser(userId: string): Promise<User> {
    const user = await fetch(`/api/user/${userId}`);
    const userData = await user.json() as {
        success: boolean;
        data: Get_User
    }

    return {
        id: userData.data._id,
        email: userData.data.email,
        name: userData.data.name,
        role: userData.data.email,
        company: userData.data.company,
        telephoneNumber: userData.data.telephoneNumber,
        image: userData.data.image,
    }
}