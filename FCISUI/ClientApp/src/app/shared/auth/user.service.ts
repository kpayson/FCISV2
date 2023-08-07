import { DataService } from 'src/app/api/data.service';
import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject,
  filter,
  BehaviorSubject
} from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/auth.config';

interface User {
  userid: string;
  email: string;
  firstname: string;
  lastname: string;
  name: string;
  isAdmin: boolean;
  roles: string[];
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private oauthService: OAuthService,
    private dataService: DataService
  ) {
    this._currentUser$ = new ReplaySubject(1);

    if (this.oauthService.hasValidAccessToken()) {
      const profile = JSON.parse(window.sessionStorage.id_token_claims_obj);
      //this.oauthService.loadUserProfile().then((profile:any) => {
        this.dataService.currentUserRoles().subscribe((roles) => {
          this._currentUser$.next({
            userid: profile.userid,
            email: profile.email,
            firstname: profile.first_name,
            lastname: profile.last_name,
            name: profile.name,

            isAdmin: roles.some((r) => r === 'Admin'),
            roles
          });
        });
      // },(err)=>{
      //   console.error(err);
      // });
    }
  }

  private _currentUser$: Subject<User>;

  public Init(profile: any) {
    this.dataService.currentUserRoles().subscribe((roles) => {
      this._currentUser$.next({
        userid: profile.info.userid,
        email: profile.info.email,
        firstname: profile.info.first_name,
        lastname: profile.info.last_name,
        name: profile.info.name,

        isAdmin: roles.some((r) => r === 'Admin'),
        roles
      });
    });
  }

  public Login() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndLogin();

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        // console.debug('state', this.oauthService.state);
        this.oauthService.loadUserProfile().then((profile: any) => {
          this.dataService.currentUserRoles().subscribe((roles) => {
            this._currentUser$.next({
              userid: profile.info.userid,
              email: profile.info.email,
              firstname: profile.info.first_name,
              lastname: profile.info.last_name,
              name: profile.info.name,

              isAdmin: roles.some((r) => r === 'Admin'),
              roles
            });
          });
        });
        // const scopes = this.oauthService.getGrantedScopes();
        // console.debug('scopes', scopes);
      });
  }

  public get currentUser$(): Observable<User> {
    return this._currentUser$ as Observable<User>;
  }
}
