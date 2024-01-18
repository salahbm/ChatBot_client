export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(`body:`, body);

    if (body && 'email' in body && 'password' in body) {
      const { email, password } = body;

      const response = await fetch('http://127.0.0.1:8000/user/storeUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

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
    } else {
      return new Response(JSON.stringify({ error: 'Invalid Request' }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
