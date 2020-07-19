import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import TagList from '../TagList';
import { tagListPrivateDriverFactory } from './TagList.private.uni.driver';

describe(TagList.displayName, () => {
  const render = createRendererWithUniDriver(tagListPrivateDriverFactory);

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(
      <TagList
        tags={[
          {
            id: '1',
            children: 'Some Tag',
          },
        ]}
      />,
    );

    expect(await driver.exists()).toBe(true);
  });

  it('should not show action button', async () => {
    const { driver } = render(
      <TagList
        tags={[
          {
            id: '1',
            children: 'Some Tag',
          },
        ]}
      />,
    );

    expect(await driver.actionButtonExists()).toBe(false);
  });

  it('should show action button', async () => {
    const actionButtonLabel = 'Do Action';
    const { driver } = render(
      <TagList
        tags={[
          {
            id: '1',
            children: 'Some Tag',
          },
        ]}
        actionButton={{
          label: actionButtonLabel,
        }}
      />,
    );

    expect(await driver.actionButtonExists()).toBe(true);
    expect(await driver.actionButtonLabel()).toBe(actionButtonLabel);
  });

  it('should click action button', async () => {
    const onActionButtonClickFn = jest.fn();
    const { driver } = render(
      <TagList
        tags={[
          {
            id: '1',
            children: 'Some Tag',
          },
        ]}
        actionButton={{
          onClick: onActionButtonClickFn,
        }}
      />,
    );
    await driver.clickActionButton();
    expect(onActionButtonClickFn).toHaveBeenCalled();
  });
});
