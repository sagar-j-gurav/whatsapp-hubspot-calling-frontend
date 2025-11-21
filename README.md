# WhatsApp Calling Widget for HubSpot

A React-based calling widget that integrates WhatsApp Business calling with HubSpot CRM using the HubSpot Calling Extensions SDK.

## Features

- 🔐 **Permission-Based Calling**: Meta-compliant permission request system
- 📞 **Outbound Calls**: Click-to-call from HubSpot contact records
- 📥 **Incoming Calls**: Real-time notifications via WebSocket
- 📝 **Call Logging**: Automatic engagement creation in HubSpot
- ⏱️ **Call Timer**: Track call duration in real-time
- 🎯 **Contact Routing**: Auto-route incoming calls to contact owners

## Architecture

### Technology Stack

- **React 18** with TypeScript
- **HubSpot Calling Extensions SDK** v0.9.7
- **Socket.IO Client** for real-time incoming calls
- **Styled Components** for CSS-in-JS
- **Webpack 5** for bundling
- **Axios** for API communication

### Project Structure

```
widget/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── screens/        # UI screens
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── KeypadScreen.tsx
│   │   │   ├── PermissionRequestScreen.tsx
│   │   │   ├── PermissionPendingScreen.tsx
│   │   │   ├── PermissionDeniedScreen.tsx
│   │   │   ├── DialingScreen.tsx
│   │   │   ├── IncomingScreen.tsx
│   │   │   ├── CallingScreen.tsx
│   │   │   └── CallEndedScreen.tsx
│   │   ├── App.tsx         # Main app component
│   │   └── StyledComponents.tsx  # Reusable UI components
│   ├── hooks/
│   │   ├── useHubSpot.ts   # HubSpot SDK integration
│   │   ├── usePermission.ts # Permission management
│   │   └── useCallTimer.ts  # Call duration timer
│   ├── services/
│   │   ├── api.service.ts       # Backend API client
│   │   ├── hubspot.service.ts   # HubSpot SDK wrapper
│   │   └── websocket.service.ts # Socket.IO client
│   ├── utils/
│   │   └── formatters.ts   # Helper functions
│   ├── types/
│   │   └── index.ts        # TypeScript definitions
│   └── index.tsx           # Entry point
├── webpack.config.js
├── tsconfig.json
└── package.json
```

## Setup

### Prerequisites

- Node.js 18+
- Backend API running (see ../backend/README.md)
- HubSpot Developer Account
- Twilio WhatsApp Business Account

### Installation

1. Install dependencies:
```bash
cd widget
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_WEBSOCKET_URL=http://localhost:3000
```

### Development

Run development server:
```bash
npm start
```

The widget will open at `http://localhost:8080`

### Production Build

Build for production:
```bash
npm run build
```

Output will be in `dist/` directory.

## HubSpot Integration

### 1. Create Calling Extension

1. Go to HubSpot Developer Account
2. Navigate to Apps → Calling Extensions
3. Create new extension with:
   - **Name**: WhatsApp Calling
   - **Widget URL**: `https://your-domain.com/widget` (production URL)
   - **Width**: 400px
   - **Height**: 600px

### 2. Configure Widget Settings

In HubSpot calling extension settings:
- Enable "Supports inbound calls"
- Enable "Supports outbound calls"
- Set webhook URL for incoming calls (optional)

### 3. Install in HubSpot Portal

1. Install the calling extension in your portal
2. Go to Settings → Calling
3. Select "WhatsApp Calling" as the calling provider

## Usage Flow

### Outbound Call Flow

1. **Keypad Screen**: User enters phone number or clicks from contact
2. **Permission Check**: Widget checks if contact has granted permission
3. **Permission Request** (if needed): Send WhatsApp message with Accept/Reject buttons
4. **Permission Pending**: Wait for contact response (up to 72 hours)
5. **Dialing**: Initiate call once permission granted
6. **Active Call**: Show timer and controls (mute, end)
7. **Call Ended**: Add notes and save to HubSpot

### Incoming Call Flow

1. **WebSocket Notification**: Backend sends incoming call event
2. **Incoming Screen**: Show Accept/Reject options
3. **Active Call**: Connect and show timer
4. **Call Ended**: Save engagement to HubSpot

## Permission System

Follows Meta WhatsApp Business API guidelines:

- ✅ **1 request per 24 hours** per contact
- ✅ **Max 2 requests per 7 days** per contact
- ✅ **72-hour call window** after permission grant
- ✅ **Auto-revoke after 4 missed calls** (consecutive)
- ✅ **Rate limits reset** after successful call

## API Integration

### Backend Endpoints

```typescript
// Permission Management
POST   /api/permissions/request           # Request call permission
GET    /api/permissions/status/:phone     # Check permission status
POST   /api/permissions/validate          # Validate before call

// Call Management
POST   /api/calls/initiate                # Start outbound call
GET    /api/calls/status/:callSid         # Get call status
POST   /api/calls/end                     # End active call

// WebSocket Events
incoming_call                             # Real-time incoming call notification
```

## Customization

### Styling

Edit `src/components/StyledComponents.tsx` to customize:
- Colors and theme
- Button styles
- Card layouts
- Typography

### Business Logic

Edit hooks for custom logic:
- `usePermission.ts`: Permission validation rules
- `useCallTimer.ts`: Timer formatting
- `useHubSpot.ts`: HubSpot SDK events

## Testing

### Local Testing with ngrok

1. Start backend with ngrok:
```bash
cd ../backend
npm run dev
```

2. Start widget dev server:
```bash
cd widget
npm start
```

3. Update HubSpot calling extension URL to `http://localhost:8080`

4. Test in HubSpot:
   - Navigate to a contact record
   - Click the calling icon
   - Widget should load and initialize

### Testing Incoming Calls

1. Ensure WebSocket is connected (check browser console)
2. Send test call from another WhatsApp number
3. Widget should show incoming call screen

## Troubleshooting

### Widget Not Loading

- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct
- Ensure backend is running and accessible
- Check CORS configuration in backend

### HubSpot SDK Not Initializing

- Verify widget URL in HubSpot calling extension settings
- Check that widget is loaded in iframe context
- Look for "HubSpot SDK Ready" in console logs

### WebSocket Not Connecting

- Verify `REACT_APP_WEBSOCKET_URL` is correct
- Ensure Socket.IO is running on backend
- Check firewall/network restrictions
- Verify user ID is available from HubSpot SDK

### Permission Requests Failing

- Check HubDB table is published
- Verify Twilio credentials are valid
- Ensure WhatsApp number is approved for Business API
- Check rate limit status in logs

## Production Deployment

### Build Checklist

- [ ] Update `.env` with production URLs
- [ ] Run `npm run build`
- [ ] Test build with `npm run preview` or serve `dist/`
- [ ] Upload `dist/` contents to CDN/hosting
- [ ] Update HubSpot calling extension URL
- [ ] Test in production HubSpot portal

### Hosting Options

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **AWS S3 + CloudFront**: Upload to S3, enable static hosting
- **HubSpot CMS**: Upload as theme assets

## Support

For issues and questions:
- Check backend logs for API errors
- Review browser console for client errors
- Verify Twilio webhook logs
- Check HubSpot developer console

## License

MIT
# Updated Fri Nov 21 18:29:08 IST 2025
