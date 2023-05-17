import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-content-page',
  template: '<app-static-content-container [page]="page"></app-static-content-container>',
  styleUrls: []
})
export class StaticContentPageComponent implements OnInit {

  public page: string = ''
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.page = `${params.page}.html`;
      //`assets/static-content/${params.page}.html`;
    });
  }

  ngOnInit(): void {
  }


}
