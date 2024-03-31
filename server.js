const cors = require('cors');
const express = require('express');
const path = require('path');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();

// Enable CORS for all requests
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to generate Agora token
app.get('/api/generate-token', (req, res) => {
    const channelName = "testChannel_20240331_1234";
  const appId = "e8ea95d8afcc4556b377c6b8afcba6e0";
  const appCertificate = "3123e59bc0984d4ab225b196d05b32cf";
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600 * 24; // Token expires in 24 hours
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const uid = 0; // Pass 0 if you want Agora to assign a UID for you

  const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);

  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
