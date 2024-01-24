'use server';
export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/user/chatbotSteps/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      return new Response(
        JSON.stringify({
          message: 'Api Response:',
          data: data,
        }),
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
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
