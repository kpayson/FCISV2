import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AlmPiService {

  private DB_WEBID: string = environment.dbWebId;
  private AF_SERVER: string = environment.afServer;
  private DATABASE: string = 'Database1';
  private HEADERS: Object = {withCredentials: true};

  constructor(private http: HttpClient) { }

  getWebId(path: string): Observable<any> {
    const url: string = [
      this.AF_SERVER,
      '/piwebapi/elements?path=',
      // this.DATABASE,
      path
    ].join('');

    return this.http.get<any>(url, this.HEADERS)
  }

  getAllChildElements(webId: string): Observable<any> {
    const url: string = [
      this.AF_SERVER,
      '/piwebapi/elements/',
      webId,
      '/elements'
    ].join('');

    return this.http.get(url, this.HEADERS);
  }

  getAllAttributes(webId: string): Observable<any> {
    const url: string = [
      this.AF_SERVER,
      '/piwebapi/elements/',
      webId,
      '/attributes'
    ].join('');

    return this.http.get(url, this.HEADERS);
  }

  getCurrentValue(webId: string): Observable<any> {
    const url: string = [
      this.AF_SERVER,
      '/piwebapi/streams/',
      webId,
      '/end'
    ].join('');

    return this.http.get(url, this.HEADERS);
  }

  getAllChildrenElements(path: string, count:number): Observable<any> {
    const url: string = [
      this.AF_SERVER,
      '/piwebapi/search/children?parent=',
      path,'&count=',count
    ].join('');
    return this.http.get<any>(url, this.HEADERS);
  }

  getAttributeByPath(path: string): Observable<any> {
    const url: string = [
      this.AF_SERVER,
      '/piwebapi/attributes?',
      path
    ].join('');

    return this.http.get(url, this.HEADERS);
  }

  /**
   * Retrieves all alarm/warning/error Event Frames for the last 24
   * hours from PI via PI Web API.
   * @param piName facility prefix used for CGMP items in PI
   */
  getAlarms(piName: string): Observable<any> {
    const queries: string = [
      `CategoryName=CGMP-${piName}`,
      'startTime=*-24h',
      'searchMode=ForwardFromStartTime',
      'selectedFields=Items.Name;Items.CategoryNames;Items.Severity;Items.StartTime;Items.EndTime'
    ].join('&');

    const url: string = [
      this.AF_SERVER,
      '/piwebapi/assetdatabases/',
      this.DB_WEBID,
      '/eventframes?',
      queries
    ].join('');

    return this.http.get<any>(url, this.HEADERS);
  }
}
