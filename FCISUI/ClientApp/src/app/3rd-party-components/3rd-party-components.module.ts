import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    EditorModule
  ],
  providers: [],
  bootstrap: []
})
export class ThirdPartyComponentsModule {}
