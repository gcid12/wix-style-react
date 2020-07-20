import React from 'react';
import LinkTo from '@storybook/addon-links/react';

import Markdown from 'wix-storybook-utils/Markdown';

import Introduction from './Introduction.md';
import FAQ from './FAQ.md';
import Roadmap from './Roadmap.md';
import IntroductionExample from './IntroductionExample';
import { Category } from '../../../../stories/storiesHierarchy';
import { TextButton } from 'wix-style-react';

export default () => (
  <div>
    <Markdown source={Introduction} />
    <IntroductionExample />
    <LinkTo kind={`${Category.COMPONENTS}/Drag And Drop/`} story="SortableList">
      {<TextButton>{`<SortableList/>`} Docs</TextButton>}
    </LinkTo>
    <Markdown source={FAQ} />
    <Markdown source={Roadmap} />
  </div>
);
