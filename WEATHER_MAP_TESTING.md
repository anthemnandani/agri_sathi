# Weather Map - Testing Guide

## Pre-Testing Checklist

Before running tests, ensure:
- [ ] Node.js and npm installed
- [ ] Project dependencies installed (`npm install`)
- [ ] No console errors on startup
- [ ] Browser developer tools available
- [ ] Test devices/browsers available
- [ ] Internet connection stable

## Test Environment Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Navigate to weather page
# http://localhost:3000/farmer/weather

# 4. Open browser DevTools
# F12 or Cmd+Option+I
```

## Test Cases

### 1. Map Loading & Initialization

**Test 1.1: Map Loads Successfully**
- [ ] Navigate to /farmer/weather
- [ ] Wait 2-3 seconds for map initialization
- [ ] Verify map tiles are visible
- [ ] Verify no console errors
- [ ] Expected: OpenStreetMap tiles visible with geographic data

**Test 1.2: Markers Display Correctly**
- [ ] Check for 5 colored markers on map
- [ ] Markers at expected locations:
  - Supaul, Bihar (~26.2°N, 87.5°E)
  - Delhi (~28.7°N, 77.1°E)
  - Mumbai (~19.1°N, 72.9°E)
  - Bangalore (~12.9°N, 77.6°E)
  - Indore (~23.2°N, 79.9°E)
- [ ] Expected: All 5 markers visible on map

**Test 1.3: Default Weather Data Loads**
- [ ] Wait for initial weather fetch to complete
- [ ] Verify "Loading weather data..." message appears
- [ ] Check console for no errors
- [ ] Expected: Loading indicator appears then disappears

### 2. User Interactions - Map Controls

**Test 2.1: My Location Button**
- [ ] Click "My Location" button (top-right)
- [ ] Allow geolocation permission when prompted
- [ ] Verify map centers on current location
- [ ] Verify zoom level increases to 10
- [ ] Expected: Map shows user's location, weather data loads

**Test 2.2: My Location - Deny Permission**
- [ ] Click "My Location" button
- [ ] Deny geolocation permission
- [ ] Verify fallback to Supaul, Bihar
- [ ] Verify no errors in console
- [ ] Expected: Map centers on default location

**Test 2.3: Drag/Pan Map**
- [ ] Click and drag map in any direction
- [ ] Hold drag for 1+ seconds
- [ ] Release mouse button
- [ ] Verify map smoothly follows drag motion
- [ ] Verify visible bounds update
- [ ] Expected: Map pans smoothly without jank

**Test 2.4: Zoom Controls**
- [ ] Locate zoom buttons (top-right)
- [ ] Click zoom in (+) button
- [ ] Verify zoom level increases (check zoom display)
- [ ] Verify map tiles become more detailed
- [ ] Click zoom out (-) button
- [ ] Verify zoom level decreases
- [ ] Click zoom at max level (18)
- [ ] Expected: Zoom +/- buttons work, zoom limited to 1-18

**Test 2.5: Mouse Wheel Zoom**
- [ ] Move mouse over map
- [ ] Scroll mouse wheel up (zoom in)
- [ ] Verify zoom increases
- [ ] Scroll mouse wheel down (zoom out)
- [ ] Verify zoom decreases
- [ ] Expected: Smooth zoom on wheel scroll

### 3. User Interactions - Markers

**Test 3.1: Click on Marker - Supaul**
- [ ] Click on red marker (Supaul, Bihar)
- [ ] Verify popup appears showing "Supaul, Bihar"
- [ ] Wait for weather data to load (loading indicator)
- [ ] Verify WeatherDetailsPopup appears with:
  - [ ] Temperature and condition
  - [ ] 6 metric cards (humidity, wind, etc.)
  - [ ] Sunrise/sunset times
  - [ ] Weather forecast
- [ ] Expected: Complete weather information displayed

**Test 3.2: Click on Marker - Delhi**
- [ ] Click on marker at Delhi location
- [ ] Verify weather popup shows "Delhi"
- [ ] Verify different weather data than Supaul
- [ ] Expected: Delhi weather information correct

**Test 3.3: Click on All Markers**
- [ ] Click on each of 5 markers in sequence
- [ ] Verify each shows correct location name
- [ ] Verify each displays unique weather data
- [ ] Expected: All 5 markers functional

**Test 3.4: Close Weather Popup**
- [ ] Click on a marker to open popup
- [ ] Locate X button in popup header
- [ ] Click X button
- [ ] Verify popup closes smoothly
- [ ] Expected: Popup closes, map still functional

### 4. User Interactions - Click on Map

**Test 4.1: Click on Map - Empty Area**
- [ ] Click on empty area of map (no marker)
- [ ] Verify weather loading indicator appears
- [ ] Verify WeatherDetailsPopup appears
- [ ] Check location name format: "Location X.XX, Y.YY"
- [ ] Verify weather data displays
- [ ] Expected: Weather data fetched for clicked coordinates

**Test 4.2: Click Multiple Locations**
- [ ] Click on 3 different map locations
- [ ] Verify each shows different weather data
- [ ] Close popup after each click
- [ ] Expected: Each location shows unique weather

**Test 4.3: Click on Popup Area**
- [ ] Open weather popup by clicking marker
- [ ] Click inside popup content area
- [ ] Verify popup doesn't close (event doesn't propagate)
- [ ] Expected: Popup stays open

### 5. Weather Layers - Toggle Controls

**Test 5.1: Layer Controls Panel Visibility**
- [ ] Locate layer controls (bottom-left)
- [ ] Verify "Weather Layers" header visible
- [ ] Verify "0 active" text (initially no layers)
- [ ] Expected: Panel visible and readable

**Test 5.2: Toggle Temperature Layer**
- [ ] Click Temperature layer toggle button
- [ ] Verify layer activates (button highlights)
- [ ] Verify "1 active" count updates
- [ ] Observe red/orange/blue circles on map
- [ ] Zoom in and out to see density change
- [ ] Click toggle again to deactivate
- [ ] Verify circles disappear
- [ ] Expected: Temperature overlay appears/disappears

**Test 5.3: Toggle Rainfall Layer**
- [ ] Click Rainfall toggle
- [ ] Verify blue circles appear on map
- [ ] Verify "1 active" count
- [ ] Circles should be sparse (not everywhere)
- [ ] Toggle off to verify removal
- [ ] Expected: Rainfall overlay conditional

**Test 5.4: Toggle Thunderstorm Layer**
- [ ] Click Thunderstorm toggle
- [ ] Verify purple circles appear (sparse)
- [ ] Verify color differs from other layers
- [ ] Toggle off
- [ ] Expected: Thunderstorm overlay visible when active

**Test 5.5: Toggle Cloud Cover Layer**
- [ ] Click Cloud Cover toggle
- [ ] Verify gray circles cover much of map
- [ ] Verify density > rainfall layer
- [ ] Toggle off
- [ ] Expected: Cloud layer shows density

**Test 5.6: Toggle Flood Risk Layer**
- [ ] Click Flood Risk toggle
- [ ] Verify red circles appear (sparse)
- [ ] Observe only high-risk areas highlighted
- [ ] Toggle off
- [ ] Expected: Flood layer shows risk areas

**Test 5.7: Multiple Layers Active**
- [ ] Toggle Temperature ON
- [ ] Toggle Rainfall ON
- [ ] Verify both layers visible simultaneously
- [ ] Verify count shows "2 active"
- [ ] Add Clouds layer
- [ ] Verify 3 layers visible
- [ ] Check legend shows all active layers
- [ ] Toggle each off in sequence
- [ ] Expected: Multiple overlays render without interference

**Test 5.8: Layer Controls Collapse/Expand**
- [ ] Click collapse arrow on layer panel
- [ ] Verify controls collapse (only header visible)
- [ ] Click expand arrow
- [ ] Verify controls expand
- [ ] Expected: Panel toggles smoothly

### 6. Weather Details Popup

**Test 6.1: Popup Content Completeness**
- [ ] Open weather popup
- [ ] Verify contains:
  - [ ] Location name/coordinates
  - [ ] Current weather icon (emoji)
  - [ ] Temperature in °C
  - [ ] Feels like temperature
  - [ ] Humidity card
  - [ ] Wind speed card
  - [ ] Visibility card
  - [ ] Cloud cover card
  - [ ] UV Index card
  - [ ] Rain probability card
  - [ ] Sunrise/Sunset info
  - [ ] Weather alerts (if applicable)
  - [ ] 6-hour forecast
- [ ] Expected: All information displayed correctly

**Test 6.2: Temperature Display**
- [ ] Open popup and note temperature
- [ ] Click different location
- [ ] Verify temperature changes appropriately
- [ ] Expected: Temperature shows reasonable values (15-35°C)

**Test 6.3: Weather Alerts Display**
- [ ] Look for locations with high rain probability
- [ ] Open popup
- [ ] Verify alert boxes appear (if rain >70%)
- [ ] Check for thunderstorm alerts
- [ ] Check for flood risk alerts
- [ ] Expected: Alerts appear when applicable

**Test 6.4: Forecast Display**
- [ ] Open weather popup
- [ ] Scroll down to "Next 6 Hours" section
- [ ] Verify 3 forecast cards display (instead of 6)
- [ ] Each card should show:
  - [ ] Time
  - [ ] Weather icon
  - [ ] Temperature
  - [ ] Rain probability
- [ ] Expected: Forecast information visible

**Test 6.5: Popup Scrolling (Mobile)**
- [ ] Open popup on small screen
- [ ] If popup exceeds screen height
- [ ] Verify scrollbar appears
- [ ] Verify all content accessible via scroll
- [ ] Expected: Popup scrollable on mobile

### 7. Responsive Design Tests

**Test 7.1: Desktop Layout (1920x1080)**
- [ ] Open page on 1920x1080 resolution
- [ ] Verify map occupies full width
- [ ] Verify controls positioned correctly
- [ ] Verify no horizontal scroll
- [ ] Click and interact normally
- [ ] Expected: All elements properly positioned

**Test 7.2: Tablet Layout (768x1024)**
- [ ] Resize browser to 768x1024
- [ ] Verify layout adapts
- [ ] Verify map readable
- [ ] Verify controls accessible
- [ ] Touch interactions work
- [ ] Expected: Responsive layout functions

**Test 7.3: Mobile Layout (375x667)**
- [ ] Resize browser to 375x667
- [ ] Verify map height is 400px minimum
- [ ] Verify controls stacked vertically
- [ ] Verify no horizontal scroll
- [ ] Verify text readable (14px+)
- [ ] Verify buttons large (48px+)
- [ ] Expected: Mobile layout optimized

**Test 7.4: Mobile Landscape (667x375)**
- [ ] Rotate device/browser to landscape
- [ ] Verify layout adapts
- [ ] Verify map visible
- [ ] Verify controls accessible
- [ ] Verify no orientation issues
- [ ] Expected: Landscape orientation works

### 8. Accessibility Tests

**Test 8.1: Keyboard Navigation**
- [ ] Press Tab key
- [ ] Verify focus moves through interactive elements:
  - [ ] My Location button
  - [ ] Layer toggle buttons
  - [ ] Close popup button
- [ ] Press Enter on focused button
- [ ] Verify button activates
- [ ] Expected: Full keyboard navigation

**Test 8.2: Screen Reader (VoiceOver/NVDA)**
- [ ] Enable screen reader
- [ ] Navigate through page
- [ ] Verify landmarks announced
- [ ] Verify button labels read correctly
- [ ] Verify form fields announced
- [ ] Expected: Accessible to screen readers

**Test 8.3: Color Contrast**
- [ ] Use color contrast checker tool
- [ ] Check all text elements
- [ ] Verify WCAG AA compliance (4.5:1)
- [ ] Check dark mode contrast
- [ ] Expected: Sufficient contrast ratio

**Test 8.4: Focus Indicators**
- [ ] Use keyboard Tab to focus buttons
- [ ] Verify visible focus indicator
- [ ] Verify focus indicator has good contrast
- [ ] Expected: All focusable elements have visible indicators

### 9. Theme & Dark Mode Tests

**Test 9.1: Light Mode**
- [ ] Ensure app in light mode
- [ ] Verify map tiles visible
- [ ] Verify controls readable
- [ ] Verify text has good contrast
- [ ] Verify all colors display correctly
- [ ] Expected: Light mode displays properly

**Test 9.2: Dark Mode**
- [ ] Switch to dark mode (in app settings)
- [ ] Verify map background dark
- [ ] Verify controls dark-themed
- [ ] Verify text readable on dark
- [ ] Verify weather overlays visible
- [ ] Verify no bright flashes
- [ ] Expected: Dark mode consistent

**Test 9.3: Theme Toggle**
- [ ] Toggle between light and dark
- [ ] Verify smooth transition
- [ ] Verify all elements update
- [ ] No layout shift
- [ ] Expected: Theme changes smoothly

### 10. Performance Tests

**Test 10.1: Initial Load Time**
- [ ] Open DevTools Network tab
- [ ] Clear cache
- [ ] Refresh page
- [ ] Measure time to interactive
- [ ] Expected: < 3 seconds to interactive

**Test 10.2: Weather Fetch Performance**
- [ ] Click map location
- [ ] Open DevTools Network tab
- [ ] Observe fetch time
- [ ] Expected: < 300ms for cached data

**Test 10.3: Layer Toggle Performance**
- [ ] Open DevTools Performance tab
- [ ] Toggle layer on/off
- [ ] Record performance
- [ ] Expected: < 50ms for layer render

**Test 10.4: Zoom Performance**
- [ ] Use DevTools Performance monitor
- [ ] Zoom in/out rapidly
- [ ] Observe FPS
- [ ] Expected: 30+ FPS during zoom

**Test 10.5: Pan Performance**
- [ ] Use DevTools Performance monitor
- [ ] Drag map rapidly
- [ ] Observe FPS
- [ ] Expected: Smooth panning (30+ FPS)

### 11. Error Handling Tests

**Test 11.1: Geolocation Errors**
- [ ] Deny geolocation permission
- [ ] Click "My Location"
- [ ] Verify no crash
- [ ] Verify fallback to Supaul
- [ ] Expected: Graceful fallback

**Test 11.2: Weather Fetch Errors**
- [ ] Offline mode (disable network)
- [ ] Click map
- [ ] Verify graceful error handling
- [ ] Expected: Error message or fallback

**Test 11.3: Console Error Check**
- [ ] Open DevTools Console
- [ ] Perform all interactions
- [ ] Verify no error messages
- [ ] Verify no warnings
- [ ] Expected: Clean console output

### 12. Browser Compatibility Tests

**Test 12.1: Chrome**
- [ ] Open in Chrome (latest)
- [ ] Run through core functionality
- [ ] Expected: Works perfectly

**Test 12.2: Firefox**
- [ ] Open in Firefox (latest)
- [ ] Test all features
- [ ] Expected: Works perfectly

**Test 12.3: Safari**
- [ ] Open in Safari (latest)
- [ ] Test interactions
- [ ] Expected: Works correctly

**Test 12.4: Edge**
- [ ] Open in Edge (latest)
- [ ] Verify functionality
- [ ] Expected: Works correctly

**Test 12.5: Mobile Browsers**
- [ ] Open in Chrome Mobile
- [ ] Test touch interactions
- [ ] Expected: Touch works smoothly

### 13. Data Validation Tests

**Test 13.1: Temperature Reasonableness**
- [ ] Check multiple locations
- [ ] Verify temperatures between 5-45°C
- [ ] Expected: Realistic values

**Test 13.2: Humidity Reasonableness**
- [ ] Check humidity values
- [ ] Verify between 20-95%
- [ ] Expected: Realistic values

**Test 13.3: Wind Speed Reasonableness**
- [ ] Check wind speeds
- [ ] Verify between 0-30 km/h
- [ ] Expected: Realistic values

**Test 13.4: Forecast Data**
- [ ] Open popup
- [ ] Check forecast temperatures
- [ ] Verify reasonable progression
- [ ] Expected: Realistic forecast

## Test Reports

### Test Summary Template

```markdown
## Weather Map - Test Run Report

**Date**: [Date]
**Tester**: [Name]
**Browser**: [Browser + Version]
**Device**: [Device/Resolution]
**OS**: [Operating System]

### Results Summary
- Total Tests: XX
- Passed: XX
- Failed: XX
- Skipped: XX
- Pass Rate: XX%

### Issues Found
1. [Issue Description]
   - Severity: [Critical/High/Medium/Low]
   - Reproduction: [Steps]
   - Expected: [Expected behavior]

### Notes
[Any additional observations]
```

## Performance Metrics

### Expected Metrics

```
Initial Load:           < 3 seconds
Weather Fetch:          < 300ms (cached)
Layer Toggle:           < 50ms
Map Pan:                30+ FPS
Map Zoom:               30+ FPS
Popup Open:             < 100ms
Button Response:        < 50ms
```

## Regression Testing

Run after any code changes:
- [ ] Map still loads
- [ ] All markers visible
- [ ] Weather popup works
- [ ] All layers toggle
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Performance acceptable

## Sign-Off Checklist

- [ ] All test cases passed
- [ ] No critical issues
- [ ] Performance acceptable
- [ ] Mobile responsive verified
- [ ] Accessibility verified
- [ ] Browser compatibility verified
- [ ] Documentation updated
- [ ] Ready for production

---

**Status**: Ready for QA Testing
**Last Updated**: April 2026
