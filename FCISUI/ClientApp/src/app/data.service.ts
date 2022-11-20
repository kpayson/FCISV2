import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private get<T>(url:string) {
    return this.http.get<T>(`${environment.apiRootUrl}/${url}`)
  }

 
  gsfByFacility() {
    return this.get<any[]>(`GsfChart/GsfByFacility`);
  }

  gsfByIC() {
    return this.get<any[]>(`GsfChart/GsfByIC`);
  }

  gsfGrowthByClassification() {
    return this.get<any[]>(`GsfChart/GsfGrowthByClassification`);
  }


}
