import React from 'react';
import { storiesOf } from '@storybook/react';

import { NumberInput, Input } from 'wix-style-react';

const defaultProps = {
  value: '12345',
};

const tests = [
  {
    describe: 'Number Input',
    its: [
      {
        it: 'default',
        props: {},
      },

      {
        it: 'small',
        props: {
          size: 'small',
        },
      },

      {
        it: 'large',
        props: {
          size: 'large',
        },
      },

      {
        it: 'with prefix',
        props: {
          prefix: <Input.Affix>#</Input.Affix>,
        },
      },

      {
        it: 'with suffix',
        props: {
          suffix: <Input.Affix>#</Input.Affix>,
        },
      },

      {
        it: 'with error',
        props: {
          prefix: <Input.Affix>#</Input.Affix>,
          status: 'error',
          suffix: <Input.Affix>$</Input.Affix>,
        },
      },

      {
        it: 'with error disabled',
        props: {
          prefix: <Input.Affix>#</Input.Affix>,
          status: 'error',
          disabled: true,
          suffix: <Input.Affix>$</Input.Affix>,
        },
      },

      {
        it: 'readOnly',
        props: {
          readOnly: true,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`NumberInput${describe ? '/' + describe : ''}`, module).add(
      it,
      () => <NumberInput {...defaultProps} {...props} />,
    );
  });
});
