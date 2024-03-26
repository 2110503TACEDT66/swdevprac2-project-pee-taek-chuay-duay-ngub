import { callInternAPIById, InternApiRoutes } from "@/utils/routing"
export const dynamic = 'force-dynamic';
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id // 'a', 'b', or 'c'
        console.log('GET Company by ID:', id)

        const response = await callInternAPIById(
            InternApiRoutes.GetUserById,
            'GET',
            id
        )
        console.log('User GET:', response)
        return Response.json(response ?? { error: 'User not found' })
    } catch (error:any) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}


