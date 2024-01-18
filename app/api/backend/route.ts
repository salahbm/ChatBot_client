import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const method = 'GET';

  try {
    const response = await fetch('');

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
  } catch (error: any) {
    console.error('Naver Search Ad API request error:', error.message);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Internal Server Error: ${error.message}` },
        { status: 500 }
      );
    }

    // If the error is not an instance of Error, return a generic error response
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
