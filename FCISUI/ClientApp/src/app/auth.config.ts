import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

console.log('redirectUri:' + window.location.origin);

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.oidcIssuer, //'https://stsstg.nih.gov', 
  redirectUri: environment.redirectUri, //window.location.origin + '/index.html',
  clientId: environment.oidcClientId,
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: false,
  timeoutFactor: 0.01,
  checkOrigin: false,
  strictDiscoveryDocumentValidation: false,
  dummyClientSecret: environment.oidcDummySecret,

};
