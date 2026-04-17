import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const communityId = params.id;
  const { action, targetUserId, messageId, settings } = body;

  let message = '';
  let result = {};

  switch (action) {
    case 'remove-member':
      message = 'Member removed from community';
      result = { userId: targetUserId, removed: true };
      break;

    case 'ban-member':
      message = 'Member banned from community';
      result = { userId: targetUserId, banned: true };
      break;

    case 'unban-member':
      message = 'Member unbanned';
      result = { userId: targetUserId, banned: false };
      break;

    case 'delete-message':
      message = 'Message deleted successfully';
      result = { messageId, deleted: true };
      break;

    case 'pin-message':
      message = 'Message pinned';
      result = { messageId, pinned: true };
      break;

    case 'unpin-message':
      message = 'Message unpinned';
      result = { messageId, pinned: false };
      break;

    case 'approve-message':
      message = 'Message approved';
      result = { messageId, approved: true };
      break;

    case 'reject-message':
      message = 'Message rejected';
      result = { messageId, approved: false };
      break;

    case 'set-announcement-mode':
      message = 'Announcement mode ' + (settings.enabled ? 'enabled' : 'disabled');
      result = { announcementMode: settings.enabled };
      break;

    case 'set-slow-mode':
      message = 'Slow mode ' + (settings.enabled ? 'enabled' : 'disabled');
      result = { slowMode: settings.enabled, duration: settings.duration };
      break;

    case 'mute-member':
      message = 'Member muted for ' + settings.duration + ' minutes';
      result = { userId: targetUserId, muted: true, duration: settings.duration };
      break;

    case 'promote-member':
      message = 'Member promoted to ' + settings.newRole;
      result = { userId: targetUserId, role: settings.newRole };
      break;

    case 'demote-member':
      message = 'Member demoted';
      result = { userId: targetUserId, role: 'member' };
      break;

    default:
      return NextResponse.json(
        { success: false, error: 'Unknown action' },
        { status: 400 }
      );
  }

  return NextResponse.json({
    success: true,
    data: result,
    message,
  });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'settings', 'logs', 'stats'

  if (type === 'settings') {
    return NextResponse.json({
      success: true,
      data: {
        communityId,
        announcementMode: false,
        slowMode: false,
        slowModeDuration: 10,
        requirePostApproval: false,
        autoModeration: true,
        maxMessageLength: 5000,
        blockedWords: ['spam', 'scam'],
        allowImages: true,
        allowVoiceNotes: true,
        allowDocuments: true,
      },
    });
  }

  if (type === 'logs') {
    return NextResponse.json({
      success: true,
      data: [
        {
          id: '1',
          action: 'message_deleted',
          performedBy: 'user-1',
          targetId: 'msg-1',
          timestamp: new Date(Date.now() - 3600000),
          reason: 'Spam',
        },
        {
          id: '2',
          action: 'member_removed',
          performedBy: 'user-1',
          targetId: 'user-5',
          timestamp: new Date(Date.now() - 7200000),
          reason: 'Abusive behavior',
        },
      ],
    });
  }

  if (type === 'stats') {
    return NextResponse.json({
      success: true,
      data: {
        communityId,
        totalMembers: 2345,
        activeMembers24h: 234,
        totalMessages: 15623,
        messagesLast24h: 156,
        joinRequestsPending: 5,
        reportsPending: 2,
        avgResponseTime: '2 hours',
      },
    });
  }

  return NextResponse.json({
    success: true,
    data: {
      communityId,
      adminData: 'Settings available',
    },
  });
}
