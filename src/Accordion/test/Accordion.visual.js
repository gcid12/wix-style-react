import React from 'react';
import { storiesOf } from '@storybook/react';

import InfoCircle from 'wix-ui-icons-common/InfoCircle';
import { skins } from '../constants';

import { Accordion, Text, Card, Layout, Cell } from 'wix-style-react';

export const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';

storiesOf('Accordion', module).add('simple', () => (
  <Accordion
    items={[
      { title: 'First Row', children: <Text>${text}</Text> },
      { title: 'Second Row', children: <Text>${text}</Text> },
    ]}
  />
));

storiesOf('Accordion', module).add('withButton', () => (
  <Accordion
    items={[
      {
        title: 'First Row With Button',
        children: <Text>${text}</Text>,
        buttonType: 'button',
        expandLabel: 'Show More',
        collapseLabel: 'Less',
      },
      {
        title: 'Second Row With Icon',
        children: <Text>${text}</Text>,
        icon: <InfoCircle />,
        expandLabel: 'Show More',
        collapseLabel: 'Less',
      },
    ]}
  />
));

storiesOf('Accordion', module).add('multiple', () => (
  <Accordion
    multiple
    items={[
      {
        title: 'First Initially Open Row',
        children: <Text>${text}</Text>,
        initiallyOpen: true,
        collapseLabel: 'Less',
      },
      {
        title: 'Second Row',
        children: <Text>${text}</Text>,
        open: true,
        collapseLabel: 'Less',
      },
      {
        title: 'Third Row',
        children: <Text>${text}</Text>,
        collapseLabel: 'Less',
      },
      {
        title: 'Disable Row',
        children: <Text>${text}</Text>,
        collapseLabel: 'Less',
        disabled: true,
      },
    ]}
  />
));

storiesOf('Accordion', module).add('skins', () => (
  <Layout>
    {Object.values(skins).map(skinColor => (
      <Cell span={4}>
        <Accordion
          multiple
          skin={skinColor}
          items={[
            {
              title: 'First Initially Open Row',
              children: <Text>${text}</Text>,
              initiallyOpen: true,
              collapseLabel: 'Less',
            },
            {
              title: 'Second Row',
              children: <Text>${text}</Text>,
              open: true,
              collapseLabel: 'Less',
            },
            {
              title: 'Third Row',
              children: <Text>${text}</Text>,
              collapseLabel: 'Less',
            },
            {
              title: 'Disable Row',
              children: <Text>${text}</Text>,
              collapseLabel: 'Less',
              disabled: true,
            },
          ]}
        />
      </Cell>
    ))}
  </Layout>
));

storiesOf('Accordion', module).add('skins and shadow', () => (
  <Layout>
    {Object.values(skins).map(skinColor =>
      Object.values([false, true]).map(hideShadow => (
        <Cell span={4}>
          <Accordion
            multiple
            skin={skinColor}
            hideShadow={hideShadow}
            items={[
              {
                title: 'First Initially Open Row',
                children: <Text>${text}</Text>,
                initiallyOpen: true,
                collapseLabel: 'Less',
              },
            ]}
          />
        </Cell>
      )),
    )}
  </Layout>
));

storiesOf('Accordion', module).add('inCard', () => (
  <Card>
    <Card.Header title="Card with Accordion" />
    <Card.Divider />
    <Accordion
      items={[
        {
          title: 'First Item',
          icon: <InfoCircle />,
          expandLabel: 'More',
          collapseLabel: 'Less',
          buttonType: 'button',
          children: <Text>${text}</Text>,
        },
      ]}
    />
  </Card>
));
