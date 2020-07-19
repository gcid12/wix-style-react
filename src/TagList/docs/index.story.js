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
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import StructureExampleRaw from '!raw-loader!./examples/Structure';
import CustomizingTagsExampleRaw from '!raw-loader!./examples/CustomizingTags';
import UsageExampleRaw from '!raw-loader!./examples/Usage';

import TagList from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: TagList,
  componentPath: '..',

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${TagList.displayName}/`,
      component: (
        <TagList
          tags={[
            {
              id: '1',
              children: 'Some Tag',
            },
          ]}
          actionButton={{
            label: 'Clear All',
          }}
        />
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'TagList is a group of tags and buttons. It shows the summary of picked options. Use it to display applied filters or keywords.',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Structure',
            text:
              'Component consists of any number tag and button subcomponents.',
            source: StructureExampleRaw,
          }),

          example({
            title: 'Customizing Tags',
            text: `Component allows to pass all <Tag/> properties except size.`,
            source: CustomizingTagsExampleRaw,
          }),

          example({
            title: 'Usage',
            text: `Use it inside table SubToolbar to display applied filters.`,
            source: UsageExampleRaw,
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
