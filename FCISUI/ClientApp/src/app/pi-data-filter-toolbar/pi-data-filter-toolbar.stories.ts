import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThirdPartyComponentsModule } from '../3rd-party-components/3rd-party-components.module';

import { CommonModule } from '@angular/common';

import { PiDataFilterToolbarComponent } from './pi-data-filter-toolbar.component';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Pi Data Filter Toolbar',
  component: PiDataFilterToolbarComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ThirdPartyComponentsModule
      ]
    })
  ]
};

export const Primary: Story = () => ({
  props: {
    facilities: [{ name: 'One', value: 1 }]
  }
});
