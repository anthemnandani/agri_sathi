import { NextResponse } from 'next/server';

const mockReports = [
  {
    id: '1',
    communityId: '1',
    messageId: 'msg-1',
    reportedBy: 'user-2',
    reason: 'spam',
    description: 'Multiple repeated messages about unrelated products',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    communityId: '1',
    reportedUserId: 'user-5',
    reportedBy: 'user-3',
    reason: 'abusive',
    description: 'Abusive language and threats towards other members',
    status: 'pending',
    createdAt: new Date(Date.now() - 7200000),
  },
  {
    id: '3',
    communityId: '1',
    messageId: 'msg-3',
    reportedBy: 'user-4',
    reason: 'fake_info',
    description: 'Sharing false information about pesticide usage',
    status: 'reviewed',
    createdAt: new Date(Date.now() - 86400000),
  },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const reason = searchParams.get('reason');

  let reports = mockReports.filter(r => r.communityId === communityId);

  if (status) {
    reports = reports.filter(r => r.status === status);
  }

  if (reason) {
    reports = reports.filter(r => r.reason === reason);
  }

  return NextResponse.json({
    success: true,
    data: reports,
    stats: {
      pending: mockReports.filter(r => r.status === 'pending').length,
      reviewed: mockReports.filter(r => r.status === 'reviewed').length,
      resolved: mockReports.filter(r => r.status === 'resolved').length,
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const communityId = params.id;

  const newReport = {
    id: Date.now().toString(),
    communityId,
    ...body,
    status: 'pending',
    createdAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    data: newReport,
    message: 'Report submitted successfully. Our team will review it soon.',
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { reportId, action, resolution } = body;

  const result = {
    reportId,
    action,
    status: action === 'resolve' ? 'resolved' : 'reviewed',
    resolution,
    resolvedAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    data: result,
    message: 'Report action completed',
  });
}
