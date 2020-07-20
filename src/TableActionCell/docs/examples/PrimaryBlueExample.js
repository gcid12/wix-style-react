import React from 'react';
import style from '../TableActionCell.story.st.css';

import { TableActionCell } from 'wix-style-react';

const Example = () => (
  <div className={style.exampleRow}>
    <TableActionCell
      dataHook="story-primary-blue"
      primaryAction={{
        text: 'Edit',
        skin: 'standard',
        onClick: () => window.alert('Primary action was triggered!'),
      }}
    />
  </div>
);

export default Example;
