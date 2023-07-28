import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

console.log('redirectUri:' + window.location.origin);

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.oidcIssuer, //'https://stsstg.nih.gov', 
  //issuer: 'https://sts.nih.gov',
  //issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin, // + '/index.html',
  clientId: environment.oidcClientId,
  //clientId: '349323939592-hf97e2m49hp9irkqjdpbv3cm7fpfiohi.apps.googleusercontent.com',
  //clientId:'349323939592-e8uia584trko1mk5pur8mhgh0tbpc7a5.apps.googleusercontent.com',
  responseType: 'code',
  //scope: 'openid profile email offline_access api',
  scope: 'openid profile email',
  showDebugInformation: true,
  timeoutFactor: 0.01,
  checkOrigin: false,
  // tokenEndpoint:'https://stsstg.nih.gov/auth/oauth/v2/token'
  strictDiscoveryDocumentValidation: false,
  dummyClientSecret: environment.oidcDummySecret


};




  // tokenEndpoint:'https://stsstg.nih.gov/auth/oauth/v2/token'

//   "aud",
//   "email",
//   "email_verified",
//   "exp",
//   "family_name",
//   "given_name",
//   "iat",
//   "iss",
//   "locale",
//   "name",
//   "picture",
//   "sub"