import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import Animate from '../Animate';
import { animatePrivateDriverFactory } from './Animate.private.uni.driver';

describe(Animate.displayName, () => {
  const render = createRendererWithUniDriver(animatePrivateDriverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should render', async () => {
    const { driver } = render(<Animate />);

    expect(await driver.exists()).toBe(true);
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const { driver } = render(<Animate />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<Animate buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
