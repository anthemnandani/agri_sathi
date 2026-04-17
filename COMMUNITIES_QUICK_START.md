# Communities Feature - Quick Start Guide

## What's New?

AgriSathi now has a complete **WhatsApp-like community platform** for farmers to:
- Join and create farming communities
- Chat with other farmers in real-time
- Share images, voice notes, and documents
- Get admin controls and moderation tools
- Report spam and inappropriate content

## Key Pages & Routes

### User Features
- **`/farmer/communities`** - Main communities page with search and filters
- **`/farmer/communities/all`** - Browse all communities
- **`/farmer/communities/create`** - Create a new community
- **`/farmer/communities/[id]`** - Join community and chat (WhatsApp-like interface)

### What You Can Do

#### 1. Explore Communities
- Search by name or topic
- Filter by Category (Crop, Location, Problem)
- Filter by Language (Hindi, English, etc.)
- View member count and community details
- Click to view community chat

#### 2. Create a Community
- Name, description, category, language
- Set privacy (Public/Private)
- Add community rules
- Submit for admin approval

#### 3. Chat in Communities
- Send text messages
- Share images
- Attach documents
- See all members
- View pinned important updates
- Reply to messages (structure ready)

#### 4. Admin Controls (for admins only)
- View community statistics
- Enable/disable announcement mode
- Set slow mode to prevent spam
- Require post approval
- Configure auto-moderation
- Manage members (remove, ban, mute)
- View activity logs

#### 5. Report Issues
- Report spam, abusive content, fake information
- Admins can review and resolve reports

## Component Structure

### Main Components
```
CommunityCard                 → Individual community card
CommunitiesList             → List with filters & search
CommunityHeader            → Chat header with settings
CommunityChat              → Main messaging interface
CommunityMembers           → Members sidebar
PinnedMessages             → Important pinned updates
MobileSidebar              → Mobile drawer (responsive)
AdminPanel                 → Admin controls & settings
CreateCommunityForm        → Community creation form
```

### Features by Component

| Component | Features |
|-----------|----------|
| **CommunityChat** | Text/image/voice/document messages, timestamps, user info |
| **CommunityMembers** | Member list, roles (admin/mod/member), search |
| **PinnedMessages** | Important updates, collapsible UI |
| **AdminPanel** | Moderation settings, reported content, member management |
| **CommunitiesList** | Search, category filter, language filter |

## API Endpoints

All endpoints currently return **dummy data**:

```
GET    /api/communities                          - List all
POST   /api/communities                          - Create
GET    /api/communities/[id]                    - Get details
PATCH  /api/communities/[id]                    - Update

GET    /api/communities/[id]/members            - List members
POST   /api/communities/[id]/members            - Join

GET    /api/communities/[id]/messages           - Get messages
POST   /api/communities/[id]/messages           - Send message

GET    /api/communities/[id]/admin              - Get settings/stats/logs
PATCH  /api/communities/[id]/admin              - Admin actions

GET    /api/communities/[id]/reports            - List reports
POST   /api/communities/[id]/reports            - Submit report
PATCH  /api/communities/[id]/reports            - Resolve report
```

## Mobile Optimization

✅ **Fully responsive design**:
- Optimized for phones (primary)
- Tablet friendly
- Desktop with sidebar
- Touch-friendly buttons
- Compact input for mobile
- Hidden action buttons on small screens
- Smart font scaling

## Dummy Data Features

The system comes with **8 pre-populated communities**:
1. Wheat Farmers Network
2. Organic Farming Community
3. Youth Farmers Initiative
4. Equipment & Tools Sharing
5. Dairy Farmers Co-operative
6. Vegetable Growers Guild
7. Rajasthan Farmers Network
8. Crop Disease Management

Each with real members, messages, and activity.

## Testing the Features

### Try These Actions:
1. **Browse**: Go to `/farmer/communities` → Click filters → Search
2. **Join**: Click "Join Community" on any card
3. **Chat**: Click community card → Scroll messages → Type & send
4. **Admin**: (User-1 is admin) → See "Community Settings" in header menu
5. **Create**: Click "Create Community" button
6. **Mobile**: Open in mobile browser or use device toggle

## Next Steps (Database Integration)

When you're ready to connect the database:

1. **Setup Database** tables for:
   - communities
   - community_members
   - community_messages
   - community_reports

2. **Update API routes** to use database instead of dummy data

3. **Enable Real-time** with WebSockets:
   - Live message updates
   - Typing indicators
   - Member presence

4. **Add Storage**:
   - Image uploads (Vercel Blob)
   - Document uploads
   - Voice notes

5. **Authentication**:
   - Connect to user system
   - Role-based access control
   - Session management

## Code Examples

### Fetching Communities
```typescript
const response = await fetch('/api/communities?category=crop&language=Hindi');
const { data: communities } = await response.json();
```

### Sending a Message
```typescript
await fetch('/api/communities/1/messages', {
  method: 'POST',
  body: JSON.stringify({
    senderId: 'user-1',
    content: 'Hello community!',
    type: 'text'
  })
});
```

### Admin Action
```typescript
await fetch('/api/communities/1/admin', {
  method: 'PATCH',
  body: JSON.stringify({
    action: 'set-announcement-mode',
    settings: { enabled: true }
  })
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Messages not showing | Check `/api/communities/[id]/messages` returns data |
| Layout broken on mobile | Verify responsive classes (sm:, lg:) |
| Admin panel empty | User-1 is admin, others see limited options |
| Images not loading | Check image URLs in API responses |

## File Locations

- **Pages**: `/app/farmer/(dashboard)/communities/**`
- **Components**: `/components/farmer/communities/**`
- **APIs**: `/app/api/communities/**`
- **Types**: `/lib/types.ts`
- **Docs**: `/COMMUNITIES_FEATURE.md`

## Performance Tips

- Load messages in batches (currently all messages shown)
- Compress images before upload
- Cache community data for 5 minutes
- Use pagination for member lists (1000+ members)
- Debounce search input by 300ms

## Support

For detailed documentation, see: `/COMMUNITIES_FEATURE.md`

This file covers:
- Feature overview
- API documentation
- Type definitions
- Structure & organization
- Future enhancements
- Database integration guide

---

**Status**: ✅ Complete with dummy data, ready for database integration
**Last Updated**: April 2024
