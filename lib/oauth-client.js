// // lib/oauth-client.js
// import { google } from 'googleapis';
// import fs from 'fs/promises';
// import { TOKENS_PATH, oauth2Config } from './config';

// class OAuthClient {
//   constructor() {
//     this.oauth2Client = new google.auth.OAuth2(
//       oauth2Config.client_id,
//       oauth2Config.client_secret,
//       oauth2Config.redirect_uri
//     );

//     // Set up token refresh handler
//     this.oauth2Client.on('tokens', async (tokens) => {
//       const existingTokens = await this.loadExistingTokens();
//       const newTokens = { ...existingTokens, ...tokens };
//       await fs.writeFile(TOKENS_PATH, JSON.stringify(newTokens));
//     });
//   }

//   async loadExistingTokens() {
//     try {
//       const tokens = await fs.readFile(TOKENS_PATH, 'utf-8');
//       return JSON.parse(tokens);
//     } catch {
//       return {};
//     }
//   }

//   async initialize() {
//     try {
//       const tokens = await this.loadExistingTokens();
//       this.oauth2Client.setCredentials(tokens);
//       return this.oauth2Client;
//     } catch (error) {
//       console.error('Error initializing OAuth client:', error);
//       throw new Error('Authentication required');
//     }
//   }

//   getAuthUrl() {
//     return this.oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: oauth2Config.scopes,
//       prompt: 'consent'
//     });
//   }

//   async handleCallback(code) {
//     const { tokens } = await this.oauth2Client.getToken(code);
//     await fs.writeFile(TOKENS_PATH, JSON.stringify(tokens));
//     this.oauth2Client.setCredentials(tokens);
//     return tokens;
//   }
// }

// export const oAuthClient = new OAuthClient();