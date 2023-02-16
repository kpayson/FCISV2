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

  private _highlightedMapPin = ''
  @Input()
  get highlightedMapPin() {
    return this._highlightedMapPin;
  }
  set highlightedMapPin(v: string) {
    this._highlightedMapPin = v;
    document.querySelectorAll('circle.pin-border').forEach(elem=>{elem.setAttribute('fill','grey')});
    document.querySelector('circle.pin-border[data-locationId="' + v + '"]')?.setAttribute('fill', 'black');
  }

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
  pinMouseOver:EventEmitter<string> = new EventEmitter<string>();

  @Output()
  pinMouseOut:EventEmitter<string> = new EventEmitter<string>();
  
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
