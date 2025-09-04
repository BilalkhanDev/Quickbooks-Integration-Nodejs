// config/quickbooks.js
const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const OAuthClient = require('intuit-oauth');
const QuickBooks = require('node-quickbooks');

const oauth2Client = new OAuthClient({
 
  clientId: process.env.QB_CLIENT_ID,
  clientSecret: process.env.QB_CLIENT_SECRET,
  environment: process.env.NODE_ENV, // Use 'production' for live data
  redirectUri: process.env.QB_REDIRECT_URI,
});

let qbo = null;

const initializeQuickBooks = (accessToken, refreshToken, realmId) => {
  qbo = new QuickBooks(
    process.env.QB_CLIENT_ID,
    process.env.QB_CLIENT_SECRET,
    accessToken,
    refreshToken,
    realmId,
    false, // Use sandbox environment
    true   // Use OAuth2 token
  );
};

const getAuthorizationUrl = () => {
  return oauth2Client.authorizeUri({
    // scopees are the permsiions to app 
    scope:  [OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId,OAuthClient.scopes.Profile],
    state: 'test_quickBook', 
  });
};

const getTokensFromCode = async (req) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const authResponse = await oauth2Client.createToken(fullUrl);

  const tokenJson = authResponse.getJson();
  const { access_token, refresh_token } = tokenJson;
  const realmId = req.query.realmId || ''; 

  initializeQuickBooks(access_token, refresh_token, realmId);

  return { access_token, refresh_token, realmId };
};

// Check if QuickBooks is authenticated
const isAuthenticated = () => !!qbo;
module.exports = { oauth2Client, qbo, initializeQuickBooks, getAuthorizationUrl,getTokensFromCode,isAuthenticated };
