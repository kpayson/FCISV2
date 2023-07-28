import { Component } from '@angular/core';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private oauthService: OAuthService) 
  {
    
    // this.oauthService.initCodeFlow();
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();
    

    //this.oauthService.setupAutomaticSilentRefresh();

    // Automatically load user profile
    this.oauthService.events
      .pipe(
        filter((e) => e.type === 'token_received'),

      )
      .subscribe((_) => {
        console.debug('state', this.oauthService.state);
        this.oauthService.loadUserProfile().then((profile)=>{
          console.log(profile);
        });
        const scopes = this.oauthService.getGrantedScopes();
        console.debug('scopes', scopes);
      });
  }

  get userName(): string {

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims['given_name'];
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  refresh() {
    this.oauthService.refreshToken();
  }
}
