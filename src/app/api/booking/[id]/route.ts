import { callInternAPIById, InternApiRoutes } from "@/utils/routing"

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id
        console.log('DELETE booking by ID:', id)

        const response = await callInternAPIById(
            InternApiRoutes.DeleteInterviewById,
            'DELETE',
            id
        )
        console.log('Booking:', response)
        return Response.json(response ?? { error: 'Booking not found' })
    } catch (error:any) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}