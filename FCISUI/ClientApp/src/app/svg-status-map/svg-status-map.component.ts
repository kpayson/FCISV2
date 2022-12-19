import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SvgMap } from '../api/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-status-map',
  templateUrl: './svg-status-map.component.html',
  styleUrls: ['./svg-status-map.component.scss']
})
export class SvgStatusMapComponent {

  constructor(private sanitizer: DomSanitizer) { }

  @Input()
  svgMap: SvgMap  = {id:0, backgroundSvg:"",name:"",svgMapPins:[],viewbox:"0 0 0 0"};

  @Input()
  pinStates: { [name: string]: string } = {};

  @Output()
  pinClick:EventEmitter<string> = new EventEmitter<string>();

  @Output()
  pinHover:EventEmitter<string> = new EventEmitter<string>();


  pinClass(locationId:string){
    //return 'pin-green';
    if(this.pinStates[locationId]) {
      return `pin-${this.pinStates[locationId]}`
    }
    else {
      console.log(locationId)
      return 'pin-lightgray';
    }

  }

}
