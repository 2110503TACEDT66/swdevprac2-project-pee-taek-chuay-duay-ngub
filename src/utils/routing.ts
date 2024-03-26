import { env } from "@/env";
import { Company, Interview, RegisterUserRequest, RegisterUserResponse } from "@/types/routing";

// Enum for API endpoints
export enum InternApiRoutes {
    GetCompanies = "/companies",
    CreateCompany = "/companies",
    GetInterviews = "/interviews",
    BookInterview = "/interviews",
    PostRegisterUser = "/auth/register",
    PostLoginUser = "/auth/login",
    // by ID
    GetCompanyById = "/companies/{id}",
    UpdateCompanyById = "/companies/{id}",
    DeleteCompanyById = "/companies/{id}",
    GetInterviewById = "/interviews/{id}",
    UpdateInterviewById = "/interviews/{id}",
    DeleteInterviewById = "/interviews/{id}",
}

type Methods = "GET" | "POST" | "PUT" | "DELETE";

// Function overloads
// Implement more overloads as necessary
export function callInternAPI<T = Company>(api: InternApiRoutes.CreateCompany, method: Methods, body: any): Promise<T>;
export function callInternAPI<T = Company[]>(api: InternApiRoutes.GetCompanies, method: Methods, body?: any): Promise<T>;
export function callInternAPI<T = Interview[]>(api: InternApiRoutes.GetInterviews, method: Methods, body?: any): Promise<T>;
export function callInternAPI<T = RegisterUserResponse>(api: InternApiRoutes.PostRegisterUser, method: Methods, body: any): Promise<T>;
export function callInternAPI<T = Interview>(api: InternApiRoutes.BookInterview, method: Methods, body: any): Promise<T>;
export function callInternAPI<T = RegisterUserResponse>(api: InternApiRoutes.PostLoginUser, method: Methods, body: any): Promise<T>;
// Generic implementation
export async function callInternAPI<T>(api: InternApiRoutes|string, method: Methods, body?: [string: string]): Promise<T> {
    // Replace dynamic path segments here if needed, e.g., replace {id} with actual ID
    const url = `${env.INTERN_PORTAL_BACKEND_URL}${api}`;

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.INTERN_PORTAL_BACKEND_API_KEY}`
    };


    // replace body.headers with the headers object
    let fetchbody = {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    } as RequestInit;

    console.log('API Call:', url, {
        method: method,
        body: JSON.stringify(body),
    });

    const res = await fetch(url, fetchbody);
    if (res.ok) {
        return res.json();
    } else {
        // contrust error message
        const error = {
            status: res.status,
            statusText: res.statusText,
            url: res.url,
            body: await res.text(),
        };
        console.error(`Error ${error.status}: ${error.statusText} at ${error.url} - ${error.body}`);
        throw new Error(
            `Error ${error.status}: ${error.statusText} - ${error.body}`
        );
    }
}
// By Id Caller
export function callInternAPIById<T = Company>(api: InternApiRoutes.GetCompanyById, method: "GET", id: string): Promise<T>;
export function callInternAPIById<T = Interview>(api: InternApiRoutes.GetInterviewById, method: "GET", id: string): Promise<T>;
export function callInternAPIById<T = Company>(api: InternApiRoutes.UpdateCompanyById, method: "PUT", id: string, body: any): Promise<T>;
export function callInternAPIById<T = Company>(api: InternApiRoutes.DeleteCompanyById, method: "DELETE", id: string): Promise<T>;
export function callInternAPIById<T = Interview>(api: InternApiRoutes.UpdateInterviewById, method: "PUT", id: string, body: any): Promise<T>;
export function callInternAPIById<T = Interview>(api: InternApiRoutes.DeleteInterviewById, method: "DELETE", id: string): Promise<T>;

export async function callInternAPIById<T>(api: InternApiRoutes, method: Methods, id?: any, body?: any): Promise<T> {
    const url = `${env.INTERN_PORTAL_BACKEND_URL}${api}`.replace("{id}", id);
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.INTERN_PORTAL_BACKEND_API_KEY}`
    }
    let fetchbody = {
        method: method,
        headers: headers,
    } as RequestInit;

    console.log('API Call:', url, {
        method: method,
    });

    const res = await fetch(url, fetchbody);
    if (!res.ok) {
        // contrust error message
        const error = {
            status: res.status,
            statusText: res.statusText,
            url: res.url,
            body: await res.text(),
        };
        console.error(`Error ${error.status}: ${error.statusText} at ${error.url} - ${error.body}`);
        throw new Error(
            `Error ${error.status}: ${error.statusText} - ${error.body}`
        );
    }
    return res.json();
}