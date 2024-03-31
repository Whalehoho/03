// This file is placed in the /api directory of your project.
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

module.exports = (req, res) => {
    const channelName = "testChannel_20240331_1912";
  const appId = "122a378d78084e769c68d509946378ff";
  const appCertificate = "c5a4e8da885d40d794e678f4cb29958a";
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600 * 24; // Token expires in 24 hours
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const uid = 0; // Pass 0 if you want Agora to assign a UID for you

  const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);

  res.json({ token });
};
