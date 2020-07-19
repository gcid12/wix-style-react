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
import * as examples from './examples';

import Animate from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Animate,
  componentPath: '..',

  componentProps: {},

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${Animate.displayName}/`,
      component: <Animate />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'This line here should briefly describe component in just a sentence or two. It should be short and easy to read.',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Controlled Animation',
            text: 'A simple example of usage of Animate component',
            source: examples.controlledExample,
          }),

          example({
            title: 'onExited example',
            text: '`onExited` callback is executed when the transition ends.',
            source: examples.onExitedExample,
          }),

          example({
            title: 'loop example',
            text:
              'When `loop` prop is true, the child component bounces repetitively until stopped by other event.',
            source: examples.loopExample,
          }),

          example({
            title: 'delay example',
            text:
              'When `delay` prop is true, the child component bounces with a delay.',
            source: examples.delayExample,
          }),

          example({
            title: 'sizes example',
            text:
              'For child width `198-341`, scale is `1.07`. For child width `342-534`, scale is `1.03`.',
            source: examples.childSizeExamples,
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
