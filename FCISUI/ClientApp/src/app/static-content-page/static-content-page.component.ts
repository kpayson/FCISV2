import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-static-content-page',
  template: `
  <nav>
    <a (click)="backClick()">Back</a>
    <a (click)="homeClick()">Home</a>
  </nav>

  <app-static-content-container [page]="page"></app-static-content-container>`,
  styleUrls: ['./static-content-page.component.scss']
})
export class StaticContentPageComponent implements OnInit {

  public page: string = ''
  constructor(
    private route: ActivatedRoute,
    private location: Location, 
    private router: Router) {
      
    this.route.params.subscribe((params: Params) => {
      this.page = `${params.page}.html`;
    });
  }

  ngOnInit(): void {
  }

  backClick() {
    this.location.back();
  }

  homeClick() {
    this.router.navigate(['/home']);
  }



}
