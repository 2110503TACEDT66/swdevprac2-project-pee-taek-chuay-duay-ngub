import { Company } from "@/mock_data/mocks";

export async function getCompany(companyId: string): Promise<Company> {
    const company = await fetch(`/api/company/${companyId}`);
    const companyData = await company.json() as {
        success: boolean;
        data: Company;
    }
    return companyData.data as Company;
}

// export async function getUser(userId: string): Promise<Job> {
//     const user = await fetch(`/api/user/${userId}`);
//     const userData = await user.json() as {
//         success: boolean;
//         data: Job;
//     }
//     return userData.data as Job;
// }