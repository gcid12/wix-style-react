import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import HorizontalTimeline from '../HorizontalTimeline';
import { horizontalTimelinePrivateDriverFactory } from './HorizontalTimeline.private.uni.driver';

describe(HorizontalTimeline.displayName, () => {
  const render = createRendererWithUniDriver(
    horizontalTimelinePrivateDriverFactory,
  );

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(
      <HorizontalTimeline
        items={[
          {
            label: 'Instructions completed',
            skin: 'dark',
            icon: <HorizontalTimeline.CompleteIcon />,
          },
          {
            label: 'Domain check',
            skin: 'dark',
            icon: <HorizontalTimeline.ActiveIcon />,
          },
          { label: 'Domain connecting' },
          {
            label: 'Site is live worldwide',
            icon: <HorizontalTimeline.DestructiveIcon />,
          },
        ]}
      />,
    );

    expect(await driver.exists()).toBe(true);
  });
});
