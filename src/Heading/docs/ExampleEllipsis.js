import React from 'react';
import { Heading } from 'wix-style-react';

export default () => (
  <div data-hook="heading-with-ellipses" style={{ width: '267px' }}>
    <Heading ellipsis>very very long text</Heading>
  </div>
);
