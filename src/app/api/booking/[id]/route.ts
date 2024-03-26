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

interface BookingUpdateRequest {
    bookTime: Date
}

export async function PUT(
    request: Request,
    { params, body }: { params: { id: string }, body: Record<string, any> }
) {
    try {
        const id = params.id
        const body = await request.json() as BookingUpdateRequest
        console.log('PUT booking by ID:', id)
        const response = await callInternAPIById(
            InternApiRoutes.UpdateInterviewById,
            'PUT',
            id,
            {
                date: body.bookTime
            }
        )
        console.log('Booking:', response)
        return Response.json(response ?? { error: 'Booking not found' })
    } catch (error:any) {
        return Response.json({ error: error.message }, { status: 500 })
    }
}