import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { MenubarModule } from 'primeng/menubar';
import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [],
  imports: [],
  exports: [
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    DialogModule,
    DynamicDialogModule,
    EditorModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    MenubarModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    TableModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: []
})
export class ThirdPartyComponentsModule {}
