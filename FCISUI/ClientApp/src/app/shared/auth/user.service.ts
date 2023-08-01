
  import { DataService } from 'src/app/api/data.service';
  import { Injectable } from '@angular/core';
  import { Observable, ReplaySubject, Subject, filter} from 'rxjs';
  import { OAuthService } from 'angular-oauth2-oidc';
  import { authCodeFlowConfig } from 'src/app/auth.config';
  

  interface User {
    userid:string,
    email:string,
    firstname:string,
    lastname:string,
    name:string,
    isAdmin:boolean,
    roles:string[],
  }
  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private oauthService: OAuthService, private dataService: DataService) { 
        
    }

    private _currentUser$: Subject<User> = new ReplaySubject<User>(1); 

    public Init(profile:any) {
      this.dataService.currentUserRoles().subscribe(roles=>{
        this._currentUser$.next({
          userid:profile.info.userid,
          email:profile.info.email,
          firstname:profile.info.first_name,
          lastname:profile.info.last_name,
          name:profile.info.name,
          
          isAdmin: roles.some(r=>r==='Admin'),
          roles
        })
      })
    }

    public Login() {
      this.oauthService.configure(authCodeFlowConfig);
      this.oauthService.loadDiscoveryDocumentAndLogin();

      this.oauthService.events
      .pipe(
        filter((e) => e.type === 'token_received')
      )
      .subscribe((_) => {
        // console.debug('state', this.oauthService.state);
        this.oauthService.loadUserProfile().then((profile:any)=>{
          this.dataService.currentUserRoles().subscribe(roles=>{
            this._currentUser$.next({
              userid:profile.info.userid,
              email:profile.info.email,
              firstname:profile.info.first_name,
              lastname:profile.info.last_name,
              name:profile.info.name,
              
              isAdmin: roles.some(r=>r==='Admin'),
              roles
            })
          })
        });
        // const scopes = this.oauthService.getGrantedScopes();
        // console.debug('scopes', scopes);


      });


    }

    public currentUser$: Observable<User> = this._currentUser$ as Observable<User>;
  }
