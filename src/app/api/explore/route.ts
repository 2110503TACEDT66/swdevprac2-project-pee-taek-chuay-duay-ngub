import { env } from "@/env";
import { RegisterUserResponse } from "@/types/routing";
import { callInternAPI, InternApiRoutes } from "@/utils/routing";

interface ClientRequestInput {
    name: string;
    telephoneNumber: string;
    email: string;
    password: string;
}

export async function GET(request: Request): Promise<Response> {
    try {
        console.log('GET Companies')
        const result = await callInternAPI(
            InternApiRoutes.GetCompanies,
            'GET',
        )
        return new Response(JSON.stringify(result), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
            statusText: 'OK',
        })
    }
    catch (e) {
        // unsuccessful registration status, log error
        const error = e as Error
        console.error('Error:', error)
        return new Response(JSON.stringify({ message: error.message }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 400,
            statusText: 'Bad Request',
        })
    }
}
