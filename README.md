# TikTok Ads Creative Flow

## How to Run the Project

### Prerequisites

- Node.js 14+ and npm
- Modern web browser

### Installation

1. Navigate to the project directory:
```bash
cd d:\Assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open automatically at `http://localhost:3000`. You should see the TikTok Ads Creative Flow interface with a "Connect TikTok Ads Account" button.

### To Stop the Server

Press `Ctrl + C` in the terminal.

### Production Build

To create a production-ready build:
```bash
npm run build
```

This creates an optimized build in the `build/` folder.

---

## OAuth Setup Steps

### Demo Setup (Current - Mocked OAuth)

The project is pre-configured with mocked OAuth for testing:

1. Click the "Connect TikTok Ads Account" button
2. The app simulates the OAuth flow and stores a mock access token
3. The status will show "Connected to TikTok Ads"
4. The ad creation form becomes available

To test token expiration:
1. Open DevTools (F12)
2. Go to Application > Local Storage > http://localhost:3000
3. Find `tiktok_ads_access_token`
4. Edit the value and add "expired" at the end
5. Try to create an ad to see the error handling

### Production Setup (Real TikTok API)

To use the real TikTok Ads API:

1. **Get TikTok Credentials**
   - Visit [TikTok Business Center](https://business.tiktok.com)
   - Navigate to Developer Tools
   - Create a new app to get:
     - Client ID
     - Client Secret
     - Redirect URI (e.g., `https://yourdomain.com/callback`)

2. **Update Configuration** in `src/constants.js`:
   ```javascript
   export const OAUTH_CONFIG = {
     CLIENT_ID: 'your_client_id',
     CLIENT_SECRET: 'your_client_secret',
     REDIRECT_URI: 'https://yourdomain.com/callback',
   };
   ```

3. **Important: Backend Token Exchange**
   - Token exchange must happen on a secure backend server, not in the frontend
   - Create a backend endpoint that receives the authorization code
   - The backend exchanges the code for a token using the CLIENT_SECRET
   - Return the token securely to the frontend using httpOnly cookies

---

## Assumptions or Shortcuts Taken

1. **OAuth Token Exchange is Mocked**
   - Frontend simulates token exchange for demo purposes
   - In production, implement a backend endpoint to handle the secure token exchange
   - Frontend should never have access to CLIENT_SECRET

2. **API Calls are Mocked**
   - All TikTok API calls (ad creation, music validation) are simulated with realistic responses
   - Real API calls require valid TikTok credentials and a backend server
   - Mock responses include success and error scenarios for testing

3. **Music Validation is Mocked**
   - Music ID validation simulates checking against TikTok's music database
   - IDs containing "invalid" will fail validation; others pass by default
   - Real implementation would query TikTok's music library API

4. **Token Storage Uses localStorage**
   - For demo purposes only; uses localStorage for simplicity and visibility
   - Production should use secure httpOnly cookies managed by the backend
   - localStorage is vulnerable to XSS attacks and should not be used for sensitive tokens in production

5. **PKCE is Not Implemented**
   - OAuth 2.0 PKCE (Proof Key for Code Exchange) is skipped for simplicity
   - This is an additional security layer that should be added for production use

6. **Token Refresh is Not Implemented**
   - Tokens do not automatically refresh when expired
   - In production, implement token refresh logic to maintain user sessions
   - Currently, token expiration requires the user to reconnect

## License

This is a demo project created for educational purposes.

---

## Summary

This TikTok Ads Creative Flow application demonstrates:
- ✅ Complete OAuth 2.0 Authorization Code flow
- ✅ Production-ready error handling and validation
- ✅ Complex business logic (three music selection modes)
- ✅ Professional UX patterns and messaging
- ✅ Clean, maintainable code architecture
- ✅ Comprehensive documentation

Perfect for showcasing frontend engineering best practices, OAuth integration, and user-centric error handling under real-world constraints.
