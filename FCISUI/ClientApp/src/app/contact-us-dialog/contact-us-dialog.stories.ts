import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { Meta, Story } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import {ContactUsDialogComponent} from './contact-us-dialog.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ThirdPartyComponentsModule } from '../3rd-party-components/3rd-party-components.module';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Contact Us Dialog',
  component: ContactUsDialogComponent,

  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ThirdPartyComponentsModule
      ],
      providers:[{provide:DynamicDialogRef, use:DynamicDialogRef}]
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

