# 🚜 Rental Tools Feature - User Profile Tab

## Overview
A comprehensive rental tools management system integrated into the farmer user profile. Allows farmers to:
- View tools they've rented (My Rentals)
- List their own tools for rent (My Tools)
- Manage booking requests from other farmers
- Upload media (photos, videos, documents) for their tools
- Track earnings and bookings

## Features

### 1. **My Rentals Tab**
Farmers can view all tools they've rented with detailed information:
- Tool name, category, and owner details
- Rental duration and cost breakdown
- Daily rate and total cost
- Owner location and contact options (call/message)
- Status filtering (All, Active, Completed)
- Extend rental button for active rentals

**Key Components:**
- `MyRentalsList.tsx` - Display list of rented tools with filtering

### 2. **My Tools Tab** 
Display all tools the farmer has listed for rent:
- Tool details with emoji icons for categories
- Tool condition, ratings, and reviews
- Daily and monthly rental rates
- Total earnings from each tool
- Expandable media gallery with photo/video/document support
- Booking count and customer ratings
- Quick actions:
  - Toggle tool active/inactive status
  - Edit tool details
  - Delete tool listing
- Additional notes displayed (e.g., "Includes operator", "Free delivery")

**Key Components:**
- `MyToolsList.tsx` - Tool listings with media gallery
- Media Navigation - Slide through photos, videos, and documents

### 3. **Booking Requests Tab** ⭐ NEW
Manage all booking requests for tools with a pending notification:
- View pending, approved, and rejected requests
- Farmer details: name, location, phone number
- Rental period and cost calculation
- Status indicators with color coding:
  - 🟡 Pending (yellow) - awaiting approval
  - 🟢 Approved (green) - confirmed booking
  - 🔴 Rejected (red) - declined booking
- Quick actions for pending requests:
  - Approve - confirm the booking
  - Reject - decline the booking
- Contact renter via phone or message
- Notification badge on tab when pending requests exist

**Key Components:**
- `BookingRequestsTab.tsx` - Request management with approval workflow
- Confirmation dialogs for approve/reject actions

### 4. **Add Tool Tab**
Multi-step form to list a new tool for rent (3 steps):

**Step 1: Basic Information**
- Tool category selection (Tractor, Harvester, Cultivator, etc.)
- Tool name with helpful placeholder
- Tool condition selection
- **Media Upload** ⭐ (New Feature)
  - Drag & drop upload for photos, videos, documents
  - Support for: JPG, PNG, MP4, PDF, DOC, DOCX
  - Interactive media slider with navigation
  - Remove media files individually
  - Display file count and type indicators

**Step 2: Pricing & Availability**
- Daily rental rate (₹)
- Monthly rental rate (₹)
- Available days selection (Monday-Sunday)
- Minimum rental duration

**Step 3: Additional Details & Review**
- Optional fields: Power (HP), Fuel type, Year of manufacture
- Additional notes (e.g., "Includes operator", "Free delivery", "Must return with fuel")
- Tool summary review before publishing
- One-click publishing

**Key Components:**
- `AddToolForm.tsx` - Multi-step form with media upload

### 5. **Overview Stats**
Quick metrics at the top of the rental tools section:
- **Active Rentals** - Number of tools currently being rented
- **My Tools Listed** - Total tools listed for rent
- **Tools Earning** - Total earnings from all tools (₹)

## API Endpoints

### Get farmer's tools
```
GET /api/farmer/tools
Response: { success: true, data: Tool[] }
```

### Create new tool
```
POST /api/farmer/tools
Body: { name, category, condition, dailyRate, monthlyRate, availability, minRentalDays, power?, fuelType?, year?, notes? }
Response: { success: true, data: Tool, message: string }
```

### Get booking requests
```
GET /api/farmer/booking-requests
Response: { success: true, data: BookingRequest[] }
```

### Approve booking request
```
POST /api/farmer/booking-requests/[id]/approve
Response: { success: true, message: string, data: { id, status: 'approved' } }
```

### Reject booking request
```
POST /api/farmer/booking-requests/[id]/reject
Response: { success: true, message: string, data: { id, status: 'rejected' } }
```

### Get farmer's rentals
```
GET /api/farmer/rentals
Response: { success: true, data: Rental[] }
```

## Data Types

### Tool
```typescript
{
  id: string;
  name: string;
  category: 'tractor' | 'harvester' | 'cultivator' | 'irrigation' | 'sprayer' | 'thresher';
  image: string; // emoji
  condition: 'New' | 'Excellent' | 'Good' | 'Fair';
  dailyRate: number;
  monthlyRate: number;
  status: 'active' | 'inactive';
  bookings: number;
  rating: number;
  reviews: number;
  totalEarnings: number;
  availability: string[];
  minRentalDays: number;
  power?: string; // e.g., "15 HP"
  fuelType?: string;
  year?: number;
  notes?: string;
  media?: MediaFile[]; // Photos, videos, documents
  createdAt?: string;
}
```

### MediaFile
```typescript
{
  type: 'image' | 'video' | 'document';
  url: string;
  name: string;
}
```

### BookingRequest
```typescript
{
  id: string;
  renterName: string;
  renterPhone: string;
  renterLocation: string;
  toolName: string;
  toolCategory: string;
  rentalDuration: { from: string; to: string };
  dailyRate: number;
  totalCost: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}
```

### Rental
```typescript
{
  id: string;
  toolName: string;
  category: string;
  image: string;
  owner: { name: string; location: string; contact: string };
  rentalPeriod: { from: string; to: string };
  dailyRate: number;
  totalCost: number;
  status: 'active' | 'completed' | 'cancelled';
}
```

## UI/UX Highlights

### Farmer-Friendly Design
- **Easy Navigation**: 4-tab interface with clear icons and labels
- **Visual Feedback**: Loading states, success/error toasts, status indicators
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

### Media Gallery
- **Interactive Slider**: Navigate through photos/videos with arrow buttons
- **Thumbnails**: Quick preview and selection of files
- **File Types**: Visual indicators for images, videos, and documents
- **Counter**: Shows current position (e.g., "1 / 3")

### Booking Management
- **Pending Notification**: Red badge on tab when requests need attention
- **One-Click Approval**: Confirm bookings with confirmation dialog
- **Complete Contact Info**: Phone and message options for renters

### Color Scheme (Green Agricultural Theme)
- Primary: Green (#10b981) - for active states and CTAs
- Success: Green variants for earnings and active status
- Warning: Amber for notes and optional information
- Neutral: Gray tones for inactive and secondary content

## Current Implementation Status

### ✅ Completed
- UI components for all sections
- Multi-step form for adding tools
- Media upload with drag-drop support
- Booking requests management with approval workflow
- API endpoints with dummy data
- Responsive design
- Toast notifications
- Loading states and error handling

### 📋 Future Enhancements (To Be Implemented)
- Database integration (Supabase/Neon)
- Actual media file storage (Vercel Blob)
- Real payment integration
- Messaging system between farmers and renters
- Rating and review system
- Search and filtering for tools
- Location-based tool discovery
- Tool edit functionality
- Analytics dashboard with charts
- Notifications system

## File Structure

```
components/
└── farmer/
    └── profile/
        ├── RentalToolsTab.tsx (Main tab component)
        └── rental-tools/
            ├── AddToolForm.tsx (Multi-step form with media upload)
            ├── MyRentalsList.tsx (Rented tools display)
            ├── MyToolsList.tsx (Listed tools with media gallery)
            └── BookingRequestsTab.tsx (Booking management)

app/
└── api/
    └── farmer/
        ├── tools/
        │   ├── route.ts (GET tools, POST new tool)
        │   └── [id]/route.ts (PUT/DELETE tool)
        ├── rentals/
        │   └── route.ts (GET farmer's rentals)
        └── booking-requests/
            ├── route.ts (GET booking requests)
            └── [id]/
                ├── approve/route.ts (POST approve)
                └── reject/route.ts (POST reject)
```

## Environment Variables
Currently using dummy data. No environment variables required until database integration.

## Testing
### Manual Testing
1. Navigate to farmer profile
2. Click "Rental Tools" or equivalent tab
3. Explore each sub-tab:
   - My Rentals - view rented tools
   - My Tools - view listed tools with media gallery
   - Booking Requests - approve/reject sample requests
   - Add Tool - go through multi-step form with media upload

### Sample Dummy Data
- 2 sample tools (Mini Rotavator, Drip Irrigation Kit)
- 3 sample booking requests (1 pending, 1 approved, 1 pending)
- 2 sample rentals

## Notes for Developers

### Integrating Database
When implementing database storage:
1. Create tables: `tools`, `media`, `bookings`, `rentals`
2. Implement authentication/authorization checks
3. Replace mock data in API routes with database queries
4. Add media upload to Vercel Blob or similar service
5. Add image optimization (next/image)

### Form Validation
Current validation covers:
- Required fields detection
- Numeric validation for rates
- Form progression (can only proceed with valid steps)

### State Management
Uses React hooks (useState) for local component state. Consider Redux/Zustand if adding more complex features.

## Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

---

**Last Updated**: April 2024
**Version**: 1.0
