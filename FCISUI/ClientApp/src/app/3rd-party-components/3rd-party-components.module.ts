import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgModule } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    EditorModule,
    ProgressSpinnerModule,
    TableModule
  ],
  providers: [],
  bootstrap: []
})
export class ThirdPartyComponentsModule {}
