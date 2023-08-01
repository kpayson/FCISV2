import { Component } from '@angular/core';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { filter } from 'rxjs/operators';
import { DataService } from 'src/app/api/data.service';
import { UserService } from './shared/auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private oauthService: OAuthService, private userService: UserService) 
  {
    this.userService.Login();
    this.userService.currentUser$.subscribe(u=>{
      console.log(u)
    });
  }

  get userId(): string {

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims['userid'];
  }

  get email(): string {

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims['email'];
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
