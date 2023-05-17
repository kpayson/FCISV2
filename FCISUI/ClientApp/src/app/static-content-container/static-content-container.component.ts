import { ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, Component, Input } from '@angular/core';
import { BehaviorSubject, Subject, mergeMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';

declare const $: any;

@Component({
  selector: 'app-static-content-container',
  templateUrl: './static-content-container.component.html',
  styleUrls: ['./static-content-container.component.scss']
})
export class StaticContentContainerComponent implements AfterViewInit {
  safeHtml: any;

  page$: Subject<string> = new Subject();
  @Input()
  set page(v: string) {
    this.page$.next(v);
  }

  ngAfterViewInit() {
    // const res1 = fetch('/assets/static-content/about/B1-PET.about.html').then(data=>{
    //   const text = data.text();
    //   console.log(text);
    // },(err)=>{
    //   console.log(err);
    // })

    
  }
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private http:HttpClient) {
    // const httpHeaders = new HttpHeaders();
    //.set('Content-Type'
    // httpHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
    
    this.page$.pipe(mergeMap((p)=>this.http.get(`/assets/static-content/${p}`, {responseType: 'text'}))).subscribe((text) => {
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
