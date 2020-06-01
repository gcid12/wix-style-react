import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
  example as baseExample,
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import ThemeProvider from '..';

const example = config => baseExample({ components: allComponents, ...config });
const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: ThemeProvider,
  componentPath: '..',

  componentProps: {
    theme: {
      color: '#ff0000',
    },
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${ThemeProvider.displayName}/`,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text: 'Customize wix-style-react theme!',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text: 'A simple example with compact preview',
            source: `
<ThemeProvider theme={{
  color: '#ff0000'
}}>
    <ToggleSwitch checked />
</ThemeProvider>
            `,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
