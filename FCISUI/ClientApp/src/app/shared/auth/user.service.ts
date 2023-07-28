  import { Observable, map, of } from 'rxjs';
  import { DataService } from 'src/app/api/data.service';
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { environment } from 'src/environments/environment';
  
  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private dataService: DataService) { 
        
    }
    public username: string = '';
    public roles: string[] = [];
  }