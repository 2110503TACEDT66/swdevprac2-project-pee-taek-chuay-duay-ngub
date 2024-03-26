import { callInternAPI, InternApiRoutes } from "@/utils/routing";
import { getServerSession } from "next-auth";

interface ClientRequestInput {
    companyId: string;
    bookTime: Date;
}

export async function POST(request: Request) : Promise<Response> {
    // check if have session
    const session = await getServerSession();
    if (!session) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 401,
            statusText: 'Unauthorized',
        })
    }
    try {
        const clientRequest = await request.json() as ClientRequestInput
        const result = await callInternAPI(
            InternApiRoutes.BookInterview,
            'POST',
            {
                company: clientRequest.companyId,
                user: session.user.id,
                date: clientRequest.bookTime,
            },
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