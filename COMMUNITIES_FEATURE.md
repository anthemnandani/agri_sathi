# AgriSathi Communities Feature

A comprehensive WhatsApp-like group chat and community platform for farmers to connect, share knowledge, and solve agricultural problems together.

## Features Overview

### 1. Community Discovery & Management
- **Browse Communities**: Explore existing communities with filters by:
  - Category (Crop, Location, Problem, Other)
  - Language (Hindi, English, Marathi, Tamil, Telugu, Gujarati, Punjabi)
  - Search by name or topic
- **Create Communities**: Farmers can create new communities with:
  - Community name, description, and rules
  - Category and language selection
  - Privacy control (Public/Private)
  - Admin approval workflow before going live

### 2. Real-time Group Chat
- **WhatsApp-like Interface**:
  - Text messages with real-time updates
  - Image sharing and display
  - Voice note support (backend ready)
  - Document attachments
  - Message timestamps and user info
  - Message reply threads (structure ready)

- **Message Features**:
  - Pinned important updates and announcements
  - Message approval queue (for moderated communities)
  - Delete and edit messages
  - User mentions (structure ready)

### 3. Member Management
- **Member Roles**:
  - Admin: Full control over community
  - Moderator: Content moderation capabilities
  - Member: Regular community participants

- **Member Features**:
  - Browse all community members with join date
  - User profiles and activity tracking
  - Member search functionality
  - Join request approval (for private communities)

### 4. Admin Controls & Moderation
- **Moderation Tools**:
  - **Announcement Mode**: Only admins can post (broadcasts)
  - **Slow Mode**: Rate limiting to prevent spam (configurable interval)
  - **Post Approval**: Require admin approval before messages go live
  - **Auto Moderation**: Automatic flagging of inappropriate content
  - **Message Length Limits**: Configurable max characters per message

- **User Management**:
  - Remove members from community
  - Ban/Unban users
  - Mute members temporarily
  - Promote/Demote roles
  - Activity logs and moderation history

- **Community Settings**:
  - Enable/disable features
  - Configure moderation levels
  - Set community rules
  - View community statistics

### 5. Reporting & Safety
- **Report System**:
  - Report spam, abusive content, fake information
  - Off-topic message reporting
  - Reported content review queue
  - Admin resolution options

- **Content Moderation**:
  - Pending reports dashboard
  - Status tracking (Pending, Reviewed, Resolved)
  - Reason categorization for better analysis

### 6. Mobile-First Design
- **Responsive Layout**:
  - Optimized for mobile phones (primary target)
  - Tablet-friendly interface
  - Desktop experience with sidebar
  - Touch-friendly buttons and interactions

- **Performance**:
  - Low-bandwidth optimized message handling
  - Lazy loading for message history
  - Efficient image compression
  - Minimal data transfer

### 7. Internationalization
- **Multi-language Support**:
  - Hindi, English, Marathi, Tamil, Telugu, Gujarati, Punjabi
  - Language preference per community
  - RTL language support ready

## Project Structure

```
app/
├── farmer/
│   └── (dashboard)/
│       └── communities/
│           ├── page.tsx                 # Main communities listing
│           ├── all/
│           │   └── page.tsx             # Full communities view
│           ├── create/
│           │   └── page.tsx             # Create community form
│           └── [id]/
│               └── page.tsx             # Community detail with chat
│
api/
└── communities/
    ├── route.ts                         # List/Create communities
    ├── [id]/
    │   ├── route.ts                     # Community details
    │   ├── members/
    │   │   └── route.ts                 # Member management
    │   ├── messages/
    │   │   └── route.ts                 # Chat messages
    │   ├── admin/
    │   │   └── route.ts                 # Admin controls & settings
    │   └── reports/
    │       └── route.ts                 # Moderation & reporting
    
components/
└── farmer/
    └── communities/
        ├── CommunitiesList.tsx          # Communities with filters
        ├── CommunityCard.tsx            # Community card component
        ├── CommunityHeader.tsx          # Chat header with info
        ├── CommunityChat.tsx            # Main chat interface
        ├── CommunityMembers.tsx         # Members sidebar
        ├── PinnedMessages.tsx           # Pinned updates section
        ├── MobileSidebar.tsx            # Mobile drawer for sidebar
        ├── AdminPanel.tsx               # Admin controls UI
        ├── CreateCommunityForm.tsx      # Create community form
        └── (other existing components)
```

## API Endpoints

### Communities
- `GET /api/communities` - List communities with filters
- `POST /api/communities` - Create new community
- `GET /api/communities/[id]` - Get community details
- `PATCH /api/communities/[id]` - Update community

### Members
- `GET /api/communities/[id]/members` - List members
- `POST /api/communities/[id]/members` - Join community
- `PATCH /api/communities/[id]/members/[memberId]` - Update member role

### Messages
- `GET /api/communities/[id]/messages` - Get messages with pagination
- `POST /api/communities/[id]/messages` - Send message
- `DELETE /api/communities/[id]/messages/[messageId]` - Delete message

### Admin
- `GET /api/communities/[id]/admin?type=settings|stats|logs` - Admin data
- `PATCH /api/communities/[id]/admin` - Admin actions
  - `action`: remove-member, ban-member, delete-message, pin-message, etc.

### Moderation
- `GET /api/communities/[id]/reports` - List reports
- `POST /api/communities/[id]/reports` - Submit report
- `PATCH /api/communities/[id]/reports` - Resolve report

## Type Definitions

### Community
```typescript
interface Community {
  id: string;
  name: string;
  description: string;
  category: 'crop' | 'location' | 'problem' | 'other';
  language: string;
  status: 'pending' | 'approved' | 'rejected';
  private: boolean;
  members: number;
  createdBy: string;
  createdAt: Date;
  rules?: string;
  moderationLevel: 'strict' | 'moderate' | 'relaxed';
}
```

### CommunityMessage
```typescript
interface CommunityMessage {
  id: string;
  communityId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'voice' | 'document';
  replies: number;
  isPinned: boolean;
  approved: boolean;
  requiresApproval: boolean;
  createdAt: Date;
}
```

### CommunityMember
```typescript
interface CommunityMember {
  id: string;
  communityId: string;
  userId: string;
  user: User;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  isBanned?: boolean;
  muteExpiry?: Date;
}
```

## Current Implementation Status

### ✅ Completed
- Community discovery and listing with filters
- Community creation form with admin approval workflow
- Community detail page with chat interface
- WhatsApp-like message display (text, images, documents)
- Pinned messages functionality
- Member list and management UI
- Admin panel with moderation controls
- Reporting system UI
- Mobile-responsive design
- Comprehensive dummy data APIs
- Type definitions and interfaces

### 🔄 Ready for Database Integration
- All API endpoints have dummy data
- Message history pagination ready
- User session tracking
- Admin action logging

### 📋 Future Enhancements (When DB Connected)
1. **Real-time Updates**:
   - WebSocket integration for live messages
   - Real-time member presence
   - Typing indicators
   - Read receipts

2. **Advanced Features**:
   - Message search and filtering
   - Media gallery view
   - Community analytics
   - User activity heatmaps
   - Backup and archive messages

3. **Notifications**:
   - Push notifications for new messages
   - Email digests
   - In-app notification center
   - Mention notifications

4. **AI Features**:
   - AI-powered content moderation
   - Automated spam detection
   - Smart recommendations
   - Translation support

5. **Performance**:
   - Image compression and optimization
   - Message caching
   - Offline message queue
   - Progressive loading

## Getting Started

### Running the App
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000/farmer/communities` to access the Communities feature.

### Development Notes

1. **Dummy Data**: All APIs return mock data from `/api/communities/*` routes
2. **Authentication**: Currently uses dummy user IDs (user-1, user-2, etc.)
3. **Database**: Ready to connect to Supabase, Neon, or other databases
4. **Real-time**: Structure ready for WebSocket/Firebase integration

### Connecting to Database

When ready, follow these steps:

1. **Setup Database Tables**:
   - communities
   - community_members
   - community_messages
   - community_reports
   - admin_logs

2. **Update API Routes**:
   - Replace dummy data with database queries
   - Implement authentication checks
   - Add proper error handling

3. **Add Real-time Features**:
   - Integrate WebSockets for live chat
   - Setup message subscriptions
   - Add presence tracking

4. **Enable File Storage**:
   - Integrate Vercel Blob for image uploads
   - Setup document storage
   - Implement voice note handling

## Design System

- **Colors**: Green accent (agriculture-themed)
- **Typography**: System fonts with semibold headings
- **Components**: shadcn/ui with custom styling
- **Responsiveness**: Mobile-first approach
- **Icons**: Lucide React icons

## Performance Optimization Tips

1. **Message Pagination**: Load messages in batches of 20
2. **Image Optimization**: Compress images to <500KB
3. **Lazy Loading**: Load member list only when needed
4. **Caching**: Cache community info for 5 minutes
5. **Debouncing**: Debounce search input by 300ms

## Testing Considerations

- Test with slow network (3G simulation)
- Verify mobile layout on iPhone 12 and Android
- Test admin controls with different roles
- Verify message approval workflow
- Test moderation actions

## Troubleshooting

- **Messages not showing**: Check API route and dummy data
- **Mobile layout broken**: Verify responsive classes (sm:, lg:)
- **Images not loading**: Check image URLs in dummy data
- **Admin panel empty**: Verify authentication state

## Future Roadmap

Phase 1 ✅: UI/UX with dummy data
Phase 2: Database integration (pending)
Phase 3: Real-time features with WebSockets
Phase 4: Advanced moderation and analytics
Phase 5: AI-powered features
Phase 6: Mobile app (React Native)

---

**Last Updated**: April 2024
**Status**: Beta - Ready for database integration
