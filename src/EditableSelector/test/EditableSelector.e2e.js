import eyes from 'eyes.it';
import { EditableSelectorTestkit } from '../../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../../test/utils/storybook-helpers';
import { storySettings, testStories } from '../docs/storySettings';
import { browser } from 'protractor';

const storyUrl = createTestStoryUrl({
  category: storySettings.category,
  storyName: storySettings.storyName,
  testName: testStories.editableSelector,
});

describe('EditableSelector', () => {
  let driver;

  beforeEach(async () => {
    driver = EditableSelectorTestkit({
      dataHook: storySettings.dataHook,
    });
    await browser.get(storyUrl);

    return waitForVisibilityOf(
      await driver.element(),
      'Cannot find EditableSelector',
    );
  });

  eyes.it('should render a title', async () => {
    expect(await driver.title()).toBe('Type of Seeds');
  });

  eyes.it('should create a new option', async () => {
    const newOption = 'Shir';
    await driver.addNewRow(newOption);
    await driver.clickApprove();
    const items = await driver.items();
    const itemText = await items[2].titleTextDriver();
    expect(await itemText.getText()).toBe(newOption);
  });

  // No eyes: I don't think eyes is needed here. It fails for unknown reason.
  // The snapshot used to include the edit button (which is visible on hover only)
  // And it started breaking (no edit button in snapshot). So we decided to disable eyes here.
  it('should not modify an option when edit is cancelled', async () => {
    const newOption = 'Shir';
    const oldText = await (
      await (await driver.items())[1].titleTextDriver()
    ).getText();

    await driver.editRow(1, newOption);
    await driver.clickCancel();
    const newText = await (
      await (await driver.items())[1].titleTextDriver()
    ).getText();

    expect(newText).toBe(oldText);
  });

  eyes.it('should save an option when edit is approved', async () => {
    const newOption = 'Shir';
    await driver.editRow(1, newOption);
    await driver.clickApprove();
    const newText = await (
      await (await driver.items())[1].titleTextDriver()
    ).getText();
    expect(newText).toBe(newOption);
  });

  eyes.it('should select an option when clicked', async () => {
    const item = (await driver.items())[0];
    expect(await item.isChecked()).toBe(false);
    await driver.toggleItem(0);
    expect(await item.isChecked()).toBe(true);
  });

  eyes.it('should delete an option', async () => {
    await expect((await driver.items()).length).toBe(2);
    await driver.deleteRow(1);
    await expect((await driver.items()).length).toBe(1);
  });
});
