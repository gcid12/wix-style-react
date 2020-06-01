import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import ThemeProvider from '../ThemeProvider';
import { themeProviderPrivateDriverFactory } from './ThemeProvider.private.uni.driver';

describe(ThemeProvider.displayName, () => {
  const render = createRendererWithUniDriver(themeProviderPrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<ThemeProvider />);

    expect(await driver.exists()).toBe(true);
  });
});
