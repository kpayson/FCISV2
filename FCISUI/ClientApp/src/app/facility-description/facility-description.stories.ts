import { ActivatedRoute, Router } from '@angular/router';
import type { Meta, Story } from '@storybook/angular';

import {APP_BASE_HREF} from '@angular/common';
import { CommonModule } from '@angular/common';
import { DataService } from '../api/data.service';
import { FacilityDescriptionComponent } from './facility-description.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ThirdPartyComponentsModule } from '../3rd-party-components/3rd-party-components.module';
import { moduleMetadata } from '@storybook/angular';

// const dataServiceMock = {
//     contactUs: ()=>{}
// }
// const routes: Routes = [];

export default {
  title: 'Facility Description',
  component: FacilityDescriptionComponent,

  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        ThirdPartyComponentsModule
        // ,RouterModule.forRoot(routes)
      ],
      providers: [
        // {provide:DataService, useValue:dataServiceMock},
        // {provide: APP_BASE_HREF, useValue: '/'}
        ],
    
    }),
  ],

  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen'
  }
} as Meta;



export const Primary: Story = () => ({
  props: {
    initialContent: 'Hello World'
  }
});

