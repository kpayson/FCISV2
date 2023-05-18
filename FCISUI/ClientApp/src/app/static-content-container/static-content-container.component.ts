import { Component, Input } from '@angular/core';
import { Subject, mergeMap } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare const $: any;

@Component({
  selector: 'app-static-content-container',
  templateUrl: './static-content-container.component.html',
  styleUrls: ['./static-content-container.component.scss']
})
export class StaticContentContainerComponent {
  safeHtml: any;

  page$: Subject<string> = new Subject();
  @Input()
  set page(v: string) {
    this.page$.next(v);
  }
  
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private http:HttpClient) {

    this.page$.pipe(mergeMap((p)=>this.http.get(`${environment.siteRootUrl}/assets/static-content/${p}`, {responseType: 'text'}))).subscribe((text) => {
      this.safeHtml = text;

      window.setTimeout(()=>{
        $('.nav-toggle').click( () => {
            $('#collapse').toggle();
            const collapsed = $('#collapse').css("display") == "none";
            $('.nav-toggle').html(collapsed ? 'Read More...' : 'Read Less...');
        });
      },0);
      
    });

  }
}
