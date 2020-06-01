import React from 'react';
import { storiesOf } from '@storybook/react';
import ThemeProvider from '../ThemeProvider';

const commonProps = {
  // use for repeated props across the tests (e.g. {buttonText: 'example'})
};

const tests = [
  {
    describe: 'sanity', // prop name (e.g. size)
    its: [
      {
        it: 'default', // prop variation (e.g. small)
        props: {
          // the simulation (e.g. {size: "small"})
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(
      `${ThemeProvider.displayName}${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => <ThemeProvider {...commonProps} {...props} />);
  });
});
