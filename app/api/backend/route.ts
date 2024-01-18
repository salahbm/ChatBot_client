import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = req.body;
    console.log(`body:`, body)

    if (body && 'username' in body && 'password' in body) {
      const { username, password } = body;

      const response = await fetch('http://127.0.0.1:8000/user/storeUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        return NextResponse.json({
          message: 'Api Response: ',
          data: JSON.stringify(data),
        });
      } else {
        console.error('Response from API:', response.status);

        return NextResponse.json({ error: 'Error' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
