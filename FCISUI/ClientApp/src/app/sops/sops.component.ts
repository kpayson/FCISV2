import {BehaviorSubject, Observable, map} from 'rxjs'
import { Component, OnInit } from '@angular/core';

import { DataService } from '../api/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sops',
  templateUrl: './sops.component.html',
  styleUrls: ['./sops.component.scss']
})
export class SopsComponent implements OnInit {

  private _sops:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public get sops() {
    return this._sops as Observable<any[]>;
  }
  
  constructor(public service:DataService) { 
    this.service.sops().subscribe(x=>{
      this._sops.next(x);
    })
  }

  ngOnInit(): void {
  }

  openDoc(storedFileName:string){
    const url = `${environment.attachmentRootUrl}/${storedFileName}`;
    window.open(url,'_blank')
  }

}
