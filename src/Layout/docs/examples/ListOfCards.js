import React from 'react';
import styles from '../styles.scss';

import { Card, Layout, Cell } from 'wix-style-react';

export default () => (
  <div className={styles.exampleContainer}>
    <Layout>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
    </Layout>
  </div>
);

function card() {
  return (
    <Card>
      <Card.Header title="Card" />
      <Card.Divider />
      <Card.Content>
        <div style={{ height: '150px' }} />
      </Card.Content>
    </Card>
  );
}
