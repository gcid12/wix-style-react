import * as React from 'react';
import ThemeProvider from '..';
import { themeProviderTestkitFactory } from '../../../testkit';
import { themeProviderTestkitFactory as themeProviderEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { themeProviderTestkitFactory as themeProviderPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

function themeProviderWithMandatoryProps() {
  return <ThemeProvider />;
}

function themeProviderWithAllProps() {
  return (
    <ThemeProvider
      dataHook="dataHook"
      theme={{
        color: '#FF0000',
      }}
    />
  );
}

async function testkits() {
  const testkit = themeProviderTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = themeProviderEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await themeProviderPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
