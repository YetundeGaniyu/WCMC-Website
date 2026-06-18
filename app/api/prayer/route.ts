import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, prayer } = body;

    if (!prayer) {
      return NextResponse.json({ error: 'Prayer request is required' }, { status: 400 });
    }

    // TODO: Implement prayer request storage (e.g., email to prayer team, database, etc.)
    console.log('Prayer request received:', { name, prayer });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing prayer request:', error);
    return NextResponse.json({ error: 'Failed to process prayer request' }, { status: 500 });
  }
}
