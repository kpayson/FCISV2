import { Component, OnInit, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-legacy-page-import',
  templateUrl: './legacy-page-import.component.html',
  styleUrls: []
})
export class LegacyPageImportComponent implements OnInit {

  constructor(private sanitizer:DomSanitizer) { }

  @Input()
  public legacyPageUrl:string = "";
  
  public htmlTemplate:string = "";

  private transform(html:string) {
    return this.sanitizer.bypassSecurityTrustStyle(html);
  }

  ngOnInit(): void {
  }

}



// @Pipe({name: 'safeHtml'})
// export class SafeHtml implements PipeTransform {
//   constructor(private sanitizer:DomSanitizer){}

//   transform(html) {
//     return this.sanitizer.bypassSecurityTrustStyle(html);
//   }
// }
