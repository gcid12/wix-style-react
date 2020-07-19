import React from 'react';
import { storiesOf } from '@storybook/react';
import TagList from '../TagList';

const commonProps = {
  tags: [
    {
      id: '1',
      children: 'Tag',
    },
  ],
};

const tests = [
  {
    describe: 'sanity', // prop name (e.g. size)
    its: [
      {
        it: 'default', // prop variation (e.g. small)
      },
    ],
  },
  {
    describe: 'actionButton',
    its: [
      {
        it: 'none',
        props: {
          actionButton: null,
        },
      },
      {
        it: 'with label',
        props: {
          actionButton: {
            label: 'action button',
          },
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(
      `${TagList.displayName}${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => <TagList {...commonProps} {...props} />);
  });
});
