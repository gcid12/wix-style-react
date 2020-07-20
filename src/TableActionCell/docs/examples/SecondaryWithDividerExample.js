import React from 'react';
import Download from 'wix-ui-icons-common/Download';
import Duplicate from 'wix-ui-icons-common/Duplicate';
import style from '../TableActionCell.story.st.css';
import { TableActionCell } from 'wix-style-react';

const Example = () => (
  <div className={style.exampleRow}>
    <TableActionCell
      secondaryActions={[
        {
          text: 'Download',
          icon: <Download />,
          onClick: () => window.alert('Download action was triggered.'),
        },
        {
          divider: true,
        },
        {
          text: 'Duplicate',
          icon: <Duplicate />,
          onClick: () => window.alert('Duplicate action was triggered.'),
        },
      ]}
      numOfVisibleSecondaryActions={0}
    />
  </div>
);

export default Example;
