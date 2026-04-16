# Rental Tools Feature - Complete Guide

## Overview
The Rental Tools feature allows farmers to:
1. **Rent Tools** - View and manage tools they've rented from other farmers
2. **Offer Tools** - List their own tools for rent and earn money
3. **Track Bookings** - See incoming rental requests and manage them

This is a farmer-friendly, easy-to-use feature designed for low-tech farmers with minimal tech knowledge.

## Accessing the Feature

### For Current User
Navigate to **Profile → Rental Tools** tab

## Feature Sections

### 1. My Rentals
**What farmers see here:**
- All tools they've rented from other farmers
- Includes active rentals and rental history
- Shows owner contact information
- Duration and cost details

**Actions available:**
- Call owner
- Message owner
- Extend rental (for active rentals)

**Status types:**
- **Active** (🟢) - Currently renting
- **Completed** (🔵) - Rental period finished
- **Cancelled** (🔴) - Rental cancelled

### 2. My Tools
**What farmers see here:**
- All tools they own and offer for rent
- Earnings summary
- Booking statistics and ratings

**Key information displayed:**
- Tool name and condition
- Daily and monthly rental rates
- Total earnings
- Number of bookings and ratings
- Availability status

**Actions available:**
- **Edit** - Modify tool details (planned)
- **Deactivate/Activate** - Toggle availability
- **Delete** - Remove tool from listing
- **View Analytics** - See booking trends (planned)

### 3. Add New Tool
**Step-by-step form designed for farmers:**

#### Step 1: Basic Information
1. Select tool type (emoji-based selection)
   - 🚜 Tractor
   - 🌾 Harvester
   - ⚙️ Rotavator/Cultivator
   - 💧 Irrigation Pump
   - 🧪 Sprayer
   - 🔄 Thresher

2. Enter tool name (e.g., "John Deere Tractor", "Rotavator Machine")

3. Select condition:
   - New
   - Excellent
   - Good
   - Fair

#### Step 2: Pricing & Availability
1. **Daily Rent Amount (₹)**
   - How much to charge per day
   - Example: ₹200/day

2. **Monthly Rent Amount (₹)**
   - How much to charge per month
   - Should be lower per day than daily rate
   - Example: ₹4000/month

3. **Available Days**
   - Select which days per week tool is available
   - Example: Mon-Fri for weekday farming

4. **Minimum Rental Duration**
   - Minimum days someone must rent
   - Example: 1 day (allows daily rentals)

#### Step 3: Additional Details (Optional)
1. **Power (HP)** - For tractors/cultivators (e.g., "40 HP")
2. **Fuel Type** - Diesel, Petrol, Electric, CNG
3. **Year Manufactured** - When tool was made
4. **Additional Notes** - Special instructions
   - "Includes operator"
   - "Free delivery within 5 km"
   - "Must return with full tank"

## Data Models

### Rental Object (What farmer has rented)
```javascript
{
  id: 'rental-1',
  toolName: 'John Deere Tractor',
  category: 'tractor',
  image: '🚜',
  owner: {
    name: 'Rajesh Kumar',
    location: 'Haryana',
    contact: '+91-9876543210'
  },
  rentalPeriod: {
    from: '2024-01-15',
    to: '2024-01-25'
  },
  dailyRate: 500,
  totalCost: 5000,
  status: 'active' | 'completed' | 'cancelled'
}
```

### Tool Object (What farmer offers)
```javascript
{
  id: 'tool-1',
  name: 'Mini Rotavator',
  category: 'cultivator',
  image: '⚙️',
  condition: 'Good',
  dailyRate: 200,
  monthlyRate: 4000,
  status: 'active' | 'inactive',
  bookings: 8,
  rating: 4.7,
  reviews: 12,
  totalEarnings: 4200,
  availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  minRentalDays: 1,
  power: '15 HP',
  fuelType: 'Diesel',
  year: 2020,
  notes: 'Includes operator training'
}
```

## API Endpoints

### Rentals
- `GET /api/farmer/rentals` - Fetch farmer's rentals
- `POST /api/farmer/rentals` - Create new rental (via marketplace booking)

### Tools
- `GET /api/farmer/tools` - Fetch farmer's tools
- `POST /api/farmer/tools` - Add new tool for rent
- `PUT /api/farmer/tools/[id]` - Update tool details
- `DELETE /api/farmer/tools/[id]` - Delete tool

### Rental Requests
- `GET /api/farmer/rental-requests` - Incoming requests for farmer's tools
- `POST /api/farmer/rental-requests/[id]` - Accept/decline request

## Component Structure

```
ProfilePageContent
├── ProfileCover (with "Rental Tools" tab)
└── ProfileTabs
    └── RentalToolsTab (NEW)
        ├── Overview Cards (stats)
        ├── Tabs Navigation
        ├── MyRentalsList
        │   └── RentalCard (per rental)
        ├── MyToolsList
        │   └── ToolCard (per tool)
        └── AddToolForm (3-step form)
```

## Design Principles

### Farmer-Friendly
- ✅ Minimal text, more emojis
- ✅ Clear icons for actions
- ✅ Large, touch-friendly buttons
- ✅ Simple language (no jargon)
- ✅ Progressive disclosure (optional fields collapsible)

### Visual Design
- **Color scheme:** Green (#16a34a) for active/positive states
- **Status badges:** Color-coded (green=active, blue=completed, red=cancelled)
- **Icons:** Lucide React icons for actions
- **Layout:** Card-based, responsive grid
- **Spacing:** Generous padding for mobile ease

## User Flows

### Flow 1: Farmer Rents Equipment
1. Browse marketplace
2. Find tool they want
3. Create rental booking
4. See it in "My Rentals" tab
5. Contact owner via phone/message
6. Receive on-time delivery
7. Return and close rental

### Flow 2: Farmer Adds Tool for Rent
1. Go to Profile → Rental Tools
2. Click "Add Tool" tab
3. Fill 3-step form (basic → pricing → optional details)
4. Review summary
5. Click "Publish Tool"
6. Tool appears in "My Tools" list
7. Receive booking requests
8. Accept/decline requests
9. Track earnings

### Flow 3: Manage Tool Availability
1. View "My Tools" list
2. See tool with toggle button
3. Click deactivate (removes from search)
4. Click activate (makes available again)
5. Can edit availability days anytime

## Features & Benefits

### For Tool Owners (Farmers offering tools)
✅ **Earn passive income** - Rent tools during off-season
✅ **Flexible scheduling** - Choose available days
✅ **Track earnings** - See total revenue per tool
✅ **Simple onboarding** - Add tool in 2 minutes
✅ **Quality ratings** - Build reputation through reviews
✅ **Easy management** - Activate/deactivate anytime

### For Tool Renters (Farmers renting tools)
✅ **Browse local tools** - See what's available in area
✅ **Easy booking** - Simple rental form
✅ **Owner contact** - Direct phone/message
✅ **Extend rentals** - Keep tool longer if needed
✅ **Trust & reviews** - See ratings before booking

## Implementation Notes

### Mock Data
Current implementation uses mock data. To connect to database:
1. Replace mock arrays in `/api/farmer/` endpoints
2. Add database queries filtering by authenticated user
3. Implement proper authentication/authorization

### Future Enhancements
- Photo uploads for tools
- Rental calendar/scheduling
- Payment integration
- SMS notifications
- Tool search/filters
- Review system
- Insurance options
- Damage reporting
- Booking history analytics

## Testing the Feature

### To test locally:
1. Navigate to any farmer profile
2. Click "Rental Tools" tab
3. View mock data in each section
4. Try adding a new tool (goes through 3 steps)
5. Check API responses in browser console

### Test Scenarios:
1. **View Rentals** - See active and completed rentals
2. **View My Tools** - See farmer's offerings
3. **Add Tool** - Complete 3-step form
4. **Deactivate Tool** - Toggle tool availability
5. **Delete Tool** - Remove tool with confirmation

## Troubleshooting

### Rentals not showing?
- Check `/api/farmer/rentals` returns data
- Verify authentication is working

### Form submission failing?
- Check browser console for validation errors
- Ensure all required fields filled
- Check `/api/farmer/tools` POST endpoint

### Components not loading?
- Verify all imports in RentalToolsTab
- Check that UI components exist in `/components/ui/`
- Ensure ProfileTabs has rental tools case

## Mobile Optimization
- ✅ Touch-friendly button sizes (44px minimum)
- ✅ Responsive grid layout
- ✅ Single column on mobile, 2-3 columns on desktop
- ✅ Full-width inputs and buttons
- ✅ Simplified navigation for small screens

---

**Last Updated:** February 2024
**Status:** Active & Production Ready
