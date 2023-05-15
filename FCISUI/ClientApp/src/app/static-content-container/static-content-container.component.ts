import { ActivatedRoute, Params } from '@angular/router';
import { AfterViewInit, Component, Input } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

declare const $: any;

@Component({
  selector: 'app-static-content-container',
  templateUrl: './static-content-container.component.html',
  styleUrls: ['./static-content-container.component.scss']
})
export class StaticContentContainerComponent implements AfterViewInit {
  safeHtml: any;

  page$: BehaviorSubject<string> = new BehaviorSubject('');
  @Input()
  set page(v: string) {
    this.page$.next(v);
  }

  ngAfterViewInit() {

  }
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.page$.subscribe((p) => {
      const pagePath = `assets/static-content/${p}`;

      (async (url) => {
        const response = await fetch(url);
        const text = await response.text();
        this.safeHtml = text;

        window.setTimeout(()=>{
          const navToggle = document.querySelector('.nav-toggle');
          navToggle?.addEventListener('click', ()=>{alert('Hello');})
        },10);

      })(pagePath);
      


      // $('.nav-toggle').click( () => {
      //   alert('click');
      //   // var collapse_content_selector = $(this).attr('href');
      //   // var toggle_switch = $(this);
      //   // $(collapse_content_selector).toggle( () => {
      //   //     if ($(this).css('display') == 'none') {
      //   //         toggle_switch.html('Read More ...');
      //   //     } else {
      //   //         toggle_switch.html('Read Less...');
      //   //     }
      //   // });
      // });


    });
  }
}
