import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  gsfGrowth_findAll() {
    return this.http.get<any[]>(`${environment.apiRootUrl}/GsfChart/GsfGrowth`)
  }

  gsfByFacility() {
    return this.http.get<any[]>(`${environment.apiRootUrl}/GsfChart/GsfByFacility`);
  }

  gsfByIC() {
    return this.http.get<any[]>(`${environment.apiRootUrl}/GsfChart/GsfByIC`);
  }
}
