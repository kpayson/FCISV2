import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-static-content-container',
  templateUrl: './static-content-container.component.html',
  styleUrls: ['./static-content-container.component.scss']
})
export class StaticContentContainerComponent {

  safeHtml: any;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {

    route.params.subscribe((params:Params)=>{
      const page = `assets/static-content/${params.page}.html`;

      (async (url) => {
        const response = await fetch(url);
        const text = await response.text();
        this.safeHtml = text 
      })(page);
    });

  }

}
