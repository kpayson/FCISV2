import { Component } from '@angular/core';
import {FacilityInfoPageService} from '../facility-info-page/facility-info-page.service';

@Component({
  selector: 'app-facility-image-manager',
  templateUrl: './facility-image-manager.component.html',
  styleUrls: ['./facility-image-manager.component.css']
})
export class FacilityImageManagerComponent {
  constructor(public service: FacilityInfoPageService) {
    this.service.pictures$
  }

  newPictureCaption = ''

  editClick($event:Event){
    console.log($event);
  }

  deleteClick($event:Event){
    console.log($event);
  }

  addClick() {}

  onBasicUploadAuto($event:Event) {
    console.log($event);
  }
}
