
  import { DataService } from 'src/app/api/data.service';
  import { Injectable } from '@angular/core';

  
  @Injectable({
    providedIn: 'root'
  })
  export class UserService {
    constructor(private dataService: DataService) { 
        
    }
    public username: string = '';
    public roles: string[] = [];
  }