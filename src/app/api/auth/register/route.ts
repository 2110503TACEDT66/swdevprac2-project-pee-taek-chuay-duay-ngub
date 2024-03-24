import { env } from "@/env";
import { RegisterUserResponse } from "@/types/routing";
import { callInternAPI, InternApiRoutes } from "@/utils/routing";

interface ClientRequestInput {
    name: string;
    telephone: string;
    email: string;
    password: string;
}

export async function POST(request: Request): Promise<Response> {
    try {
        const body: ClientRequestInput = await request.json()
        const inputs = {
            name: body.name,
            telephoneNumber: body.telephone,
            email: body.email,
            password: body.password
        }
        console.log('User Registration:', inputs)
        // verify that the request body is correct, and not extended
        const result = await callInternAPI(
            InternApiRoutes.PostRegisterUser,
            'POST',
            inputs
        )
        console.log('Result:', result)
        return new Response(JSON.stringify({ message: 'Success' }), {
            headers: {
                'Content-Type': 'application/json',
            },
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