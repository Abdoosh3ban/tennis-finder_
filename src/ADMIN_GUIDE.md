# TennisFinder Admin Dashboard Guide

## Overview
The TennisFinder Admin Dashboard provides comprehensive tools for managing courts and monitoring bookings across the platform.

## Accessing the Admin Panel

### Method 1: Direct URL
Navigate to: `/admin`

### Method 2: Footer Link
Scroll to the bottom of any page and click on the "Admin Panel" link in the Legal section.

## Admin Dashboard Features

### 1. Overview Dashboard (`/admin`)
The main dashboard provides:
- **Statistics Cards**: Quick view of total courts, active bookings, revenue, and active users
- **Weekly Bookings & Revenue Chart**: Line chart showing booking trends and revenue over the week
- **Court Utilization Chart**: Bar chart displaying utilization rates for each court
- **Recent Bookings Table**: Quick view of the latest booking activity

**Key Metrics:**
- Total Courts
- Active Bookings (with percentage change)
- Total Revenue (in EGP)
- Active Users (with growth percentage)

### 2. Manage Courts (`/admin/courts`)
Comprehensive court management interface with:

#### Features:
- **Add New Court**: Click the "Add New Court" button to create a new court
- **Search & Filter**: Search by court name/location and filter by city
- **Edit Court**: Click the edit icon to modify court details
- **Delete Court**: Click the trash icon to remove a court (with confirmation)

#### Court Information Fields:
- Court Name
- City (Cairo, Alexandria, Giza)
- Location (full address)
- Surface Type (Hard Court, Clay Court, Grass Court)
- Price per Hour (in EGP)
- Amenities (comma-separated)
- Status (Active/Inactive)
- Image URL

#### Court Table Columns:
- Court image and name
- Location with map pin icon
- Surface type
- Price per hour
- Rating (from user reviews)
- Status badge
- Action buttons (Edit/Delete)

### 3. All Bookings (`/admin/bookings`)

View and manage all court bookings across the platform.

#### Features:
- **Statistics Overview**: Total, Confirmed, Completed, Pending bookings, and Total Revenue
- **Advanced Filters**:
  - Search by booking ID, court name, or user name
  - Filter by status (All, Confirmed, Completed, Pending, Cancelled)
  - Filter by date (All, Today, Upcoming, Past)
- **Export Bookings**: Download booking data
- **View Details**: Click the eye icon to see complete booking information

#### Booking Information Displayed:
- Booking ID and booking date
- Court name and location
- User details (name, email, phone)
- Date and time slot
- Duration (in hours)
- Amount paid
- Payment method
- Status badge

#### Booking Details Dialog:
When viewing a booking, you'll see three sections:
1. **Booking Information**: ID, booking date, status, payment method
2. **Court Information**: Court name, location, date, time slot, duration, amount
3. **User Information**: Name, email, phone number

### 4. Settings (`/admin/settings`)

Configure platform settings and preferences.

#### General Settings:
- Site Name
- Site Email
- Support Email
- Currency (default: EGP)
- Timezone (default: Africa/Cairo)

#### Notification Settings:
- Email Notifications (toggle)
- Booking Notifications (toggle)
- Payment Notifications (toggle)

#### Booking Settings:
- Minimum Booking Hours
- Maximum Booking Hours
- Cancellation Notice Hours

#### Payment Settings:
- Payment Gateway
- Commission Rate (percentage)

#### Security Settings:
- Two-Factor Authentication (toggle)
- Session Timeout (in minutes)

## User Interface Features

### Navigation
The admin panel includes:
- **Fixed Sidebar** (desktop): Always visible for quick navigation
- **Collapsible Mobile Menu**: Hamburger menu for mobile devices
- **Active Page Indicator**: Green highlight on current page

### Design Elements
- **Clean, Modern Interface**: Professional admin dashboard aesthetic
- **Responsive Design**: Works on all device sizes
- **Color-Coded Status**: Visual indicators for different states
  - Green: Active, Confirmed, Completed
  - Yellow: Pending
  - Red: Cancelled, Inactive
  - Blue: Confirmed bookings

### Icons
All icons are from Lucide React library for consistency:
- Dashboard: LayoutDashboard
- Courts: MapPin
- Bookings: Calendar
- Settings: Settings
- Admin badge: ShieldCheck

## Sample Data

The admin panel comes pre-loaded with sample data:
- 4 tennis courts across Cairo and Alexandria
- 8 booking records with various statuses
- Realistic statistics and charts

## Tips for Admin Users

1. **Regular Monitoring**: Check the Overview dashboard daily for key metrics
2. **Court Management**: Keep court information up-to-date, especially availability and pricing
3. **Booking Review**: Monitor pending bookings and address any issues promptly
4. **Settings Configuration**: Set appropriate booking rules and cancellation policies
5. **Export Data**: Use the export feature for record-keeping and analysis

## Future Enhancements

Potential additions to the admin panel:
- User management (view, edit, suspend users)
- Revenue analytics and reports
- Email notifications to users
- Bulk operations for courts
- Advanced booking calendar view
- Court availability scheduling
- Performance metrics and KPIs

## Technical Notes

- Built with React and TypeScript
- Uses React Router for navigation
- Recharts library for data visualization
- Tailwind CSS for styling
- shadcn/ui component library

## Support

For technical support or feature requests, contact the development team.

---

**TennisFinder Admin Dashboard** - Manage your tennis platform efficiently
