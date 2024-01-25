// 'use server';
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      marketingRequirement,
      desiredService,
      salesDepAgreement,
    } = body;

    const response = await fetch(
      `${process.env.BACKEND_URL}/user/userResponse/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          marketingRequirement,
          desiredService,
          salesDepAgreement,
        }),
      }
    );

    const contentType = response.headers.get('Content-Type');
    const responseData = await response.text();

    if (response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(responseData);
        return new Response(
          JSON.stringify({
            message: 'Api Response:',
            data: data,
          }),
          { status: 200 }
        );
      } else {
        console.error('Invalid Content-Type:', contentType);
        console.error('Non-JSON Response:', response.status, responseData);
        return new Response(responseData, { status: response.status });
      }
    } else {
      const errorData =
        contentType && contentType.includes('application/json')
          ? JSON.parse(responseData)
          : responseData;

      console.error('Response from API:', response.status, errorData);

      return new Response(JSON.stringify(errorData), {
        status: response.status,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
