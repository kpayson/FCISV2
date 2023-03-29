import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { SvgMap, SvgMapPin, defaultSvgMap } from '../api/models';

import { DomSanitizer } from '@angular/platform-browser';

declare const bootstrap: any;

export interface PinHoverInfo {
  locationId: string;
  status: 'on' | 'off';
}

@Component({
  selector: 'app-svg-status-map',
  templateUrl: './svg-status-map.component.html',
  styleUrls: ['./svg-status-map.component.scss']
})
export class SvgStatusMapComponent implements OnChanges {
  constructor(private sanitizer: DomSanitizer) {}

  mapTooltip(pin: SvgMapPin) {
    const tooltipHtml = `
    <div class="label-tooltip">
      Room: ${pin.title} <br>

    </div>`;

    // Room #: ${room.roomNumber} <br>
    // Class: ${room.iso} <br>
    // GSF: ${room.sq}

    // Room: ${room.roomName} <br>
    // Room #: ${room.roomNumber} <br>
    // Class: ${room.iso} <br>
    // GSF: ${room.sq}
    // const tooltipHtml = `
    //   <div align="left" class="label-tooltip">
    //     <table>
    //      <tr><td> Room: ${room.roomName} </td></tr>
    //      <tr><td><b> Room #: ${room.roomNumber} </b></td></tr>
    //      <tr><td><b> Class: ${room.iso} </b></td></tr>
    //      <tr><td><b> GSF: ${room.sq} </b></td></tr>
    //      </table>
    //   </div>
    // `;
    return tooltipHtml;
  }

  ngOnChanges() {
    for (const pin of this.svgMap.svgMapPins) {
      window.setTimeout(() => {
        const pinElem = document.getElementById('pin_' + pin.locationId);
        if (pinElem) {
          const tooltip = new bootstrap.Tooltip(pinElem, {
            placement: 'right',
            html: true,
            title: '<div>' + pin.title + '</div>'
          });
        }
      }, 100);

      // const roomData = this.chartData.locations[locationName];
      // if(roomData) {
      //   const roomTooltip = this.roomLabelTooltip(roomData);
      //   const tooltip = new bootstrap.Tooltip(label, {
      //     placement:'right',
      //     html: true,
      //     title: roomTooltip
      //   });
      // }
    }
  }

  @Input()
  svgMap: SvgMap = defaultSvgMap;

  @Input()
  pinStates: { [name: string]: string } = {};

  private _highlightedMapPin = '';
  @Input()
  get highlightedMapPin() {
    return this._highlightedMapPin;
  }
  set highlightedMapPin(v: string) {
    this._highlightedMapPin = v;
    document.querySelectorAll('.pin-border').forEach((elem) => {
      (elem as HTMLElement).style.fill = 'grey';
    });
    const target = document.querySelector(
      '.pin-border[data-locationId="' + v + '"]'
    ) as HTMLElement;
    if (target) {
      target.style.fill = 'black';
    }
  }

  private _backgroundImageUrl = '';
  @Input()
  get backgroundImageUrl() {
    return this._backgroundImageUrl;
  }
  set backgroundImageUrl(v) {
    this._backgroundImageUrl = v;

    this.backgroundStyle = {
      'background-image': 'url(' + this.backgroundImageUrl + ')',
      'background-size': '100% 100%',
      'background-repeat': 'no-repeat',
      border: '1px solid blue;'
    };
  }

  public backgroundStyle = {};

  @Output()
  pinClick: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  pinMouseOver: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  pinMouseOut: EventEmitter<string> = new EventEmitter<string>();

  pinClass(locationId: string) {
    if (this.pinStates[locationId]) {
      return `pin-${this.pinStates[locationId]}`;
    } else {
      return 'pin-lightgray';
    }
  }

  mouseOver(locationId: string) {
    const target = document.querySelector(
      '.pin-border[data-locationId="' + locationId + '"]'
    ) as HTMLElement;
    if (target) {
      target.style.fill = 'black';
    }
    this.pinMouseOver.emit(locationId);
  }

  mouseOut(locationId: string) {
    const target = document.querySelector(
      '.pin-border[data-locationId="' + locationId + '"]'
    ) as HTMLElement;
    if (target) {
      target.style.fill = 'grey';
    }
    this.pinMouseOut.emit(locationId);
  }
}
