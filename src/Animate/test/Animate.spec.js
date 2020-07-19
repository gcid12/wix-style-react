import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import Animate from '../Animate';
import { animatePrivateDriverFactory } from './Animate.private.uni.driver';

describe(Animate.displayName, () => {
  const render = createRendererWithUniDriver(animatePrivateDriverFactory);

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(<Animate />);
    expect(await driver.exists()).toBe(true);
  });
});
