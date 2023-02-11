import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SvgMap, defaultSvgMap } from '../api/models';

import { DomSanitizer } from '@angular/platform-browser';

export interface PinHoverInfo {
  locationId:string;
  status: 'on' | 'off';
}

@Component({
  selector: 'app-svg-status-map',
  templateUrl: './svg-status-map.component.html',
  styleUrls: ['./svg-status-map.component.scss']
})
export class SvgStatusMapComponent {

  constructor(private sanitizer: DomSanitizer) { }

  @Input()
  svgMap: SvgMap = defaultSvgMap 

  @Input()
  pinStates: { [name: string]: string } = {};

  private _backgroundImageUrl="";
  @Input()
  get backgroundImageUrl() {
    return this._backgroundImageUrl
  }
  set backgroundImageUrl(v) {
    this._backgroundImageUrl = v;

    if(!v || this.svgMap.backgroundSvg) {
      this.backgroundStyle = {}
    }
    else {
      this.backgroundStyle = {
        'background-image':  'url('+this.backgroundImageUrl+')',
        'background-size': '100% 100%',
        'background-repeat': 'no-repeat'
      }
    }
  }

  public backgroundStyle = {};

  @Output()
  pinClick:EventEmitter<string> = new EventEmitter<string>();

  @Output()
  pinHover:EventEmitter<PinHoverInfo> = new EventEmitter<PinHoverInfo>();

  handlePinHoverOn(locationId:string, title:string) {
    // TODO show title
    this.pinHover.emit({locationId, status:'on'});
  }
  
  handlePinHoverOff(locationId:string) {
    this.pinHover.emit({locationId, status:'off'});
  }
  
  pinClass(locationId:string){
    //return 'pin-green';
    if(this.pinStates[locationId]) {
      return `pin-${this.pinStates[locationId]}`
    }
    else {
      // console.log(locationId)
      return 'pin-lightgray';
    }

  }

}
