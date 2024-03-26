export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // 'a', 'b', or 'c'
    console.log('GET Company by ID:', slug)

    return new Response(JSON.stringify({}), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 200,
        statusText: 'OK',
    })
}