import { NextResponse } from 'next/server';
import { mockMediaItems } from '@/lib/mock-communities-enhanced';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let media = mockMediaItems;

    if (type) {
      media = media.filter((item) => item.type === type);
    }

    return NextResponse.json({
      success: true,
      data: media,
      total: media.length,
      communityId: params.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error fetching media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newMedia = {
      id: `media_${Date.now()}`,
      type: file.type.startsWith('image') ? 'image' : 'document',
      thumbnail: URL.createObjectURL(file),
      url: URL.createObjectURL(file),
      description: description || file.name,
      uploadedBy: 'आप',
      uploadedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newMedia,
      message: 'मीडिया अपलोड किया गया',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error uploading media:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload media' },
      { status: 500 }
    );
  }
}
