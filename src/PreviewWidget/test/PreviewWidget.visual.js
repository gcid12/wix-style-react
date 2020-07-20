import React from 'react';
import { storiesOf } from '@storybook/react';
import { skins, contentOutlines } from '../constants';

import PreviewWidget from '../PreviewWidget';

import { Box, Text } from 'wix-style-react';

const defaultProps = {
  skin: 'neutral',
  contentOutline: 'shadow',
  height: '100%',
  width: '100%',
  children: <div />,
};

const childNode = (
  <Box padding="20px" backgroundColor="Y30">
    <Text>Content goes here</Text>
  </Box>
);

const tests = [
  {
    describe: 'Skins',
    its: [
      {
        it: skins.neutral,
        props: { skin: skins.neutral },
      },
      {
        it: skins.gradient,
        props: { skin: skins.gradient },
      },
      {
        it: skins.custom,
        props: {
          skin: skins.custom,
          backgroundColor: 'linear-gradient(#e66465, #9198e5)',
        },
      },
    ],
  },
  {
    describe: 'Content Outline',
    its: [
      {
        it: contentOutlines.shadow,
        props: { contentOutline: contentOutlines.shadow },
      },
      {
        it: contentOutlines.border,
        props: {
          contentOutline: contentOutlines.border,
          skin: skins.custom,
          backgroundColor: 'D80',
        },
      },
    ],
  },
  {
    describe: 'Custom size',
    its: [
      {
        it: 'height',
        props: { height: '200px' },
      },
      {
        it: 'width',
        props: { width: '400px' },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`PreviewWidget${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <PreviewWidget {...defaultProps} {...props}>
          {childNode}
        </PreviewWidget>
      ),
    );
  });
});
