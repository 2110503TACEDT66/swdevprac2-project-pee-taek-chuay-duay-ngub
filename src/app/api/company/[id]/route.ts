import { callInternAPI, callInternAPIById, InternApiRoutes } from "@/utils/routing"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {

        const id = params.id // 'a', 'b', or 'c'
        console.log('GET Company by ID:', id)

        const response = await callInternAPIById(
            InternApiRoutes.GetCompanyById,
            'GET',
            id
        )
        console.log('Company:', response)
        return Response.json(response ?? { error: 'Company not found' })
    } catch (error:any) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}


