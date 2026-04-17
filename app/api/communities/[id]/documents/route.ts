import { NextResponse } from 'next/server';
import { mockDocuments } from '@/lib/mock-communities-enhanced';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let documents = mockDocuments;

    if (type) {
      documents = documents.filter((doc) => doc.type === type);
    }

    return NextResponse.json({
      success: true,
      data: documents,
      total: documents.length,
      communityId: params.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
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
    const name = formData.get('name') as string;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const fileSizeKB = Math.round(file.size / 1024);
    const newDocument = {
      id: `doc_${Date.now()}`,
      name: name || file.name,
      type: file.type === 'application/pdf' ? 'PDF' : 'Document',
      size: fileSizeKB > 1024 ? `${(fileSizeKB / 1024).toFixed(1)} MB` : `${fileSizeKB} KB`,
      uploadedBy: 'आप',
      uploadedAt: new Date(),
      url: URL.createObjectURL(file),
    };

    return NextResponse.json({
      success: true,
      data: newDocument,
      message: 'दस्तावेज़ अपलोड किया गया',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[API] Error uploading document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}
