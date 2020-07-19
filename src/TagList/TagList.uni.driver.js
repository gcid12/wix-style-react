import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { buttonDriverFactory } from '../Button/Button.uni.driver';

export const tagListDriverFactory = (base, body) => {
  const getTagListActionTestkit = async () =>
    buttonDriverFactory(base.$(`[data-hook="tag-list-action"]`));

  return {
    ...baseUniDriverFactory(base, body),
    /** Get the action button label */
    actionButtonLabel: async () =>
      (await getTagListActionTestkit()).getButtonTextContent(),
    /** Click action button */
    clickActionButton: async () => (await getTagListActionTestkit()).click(),
    /** Get if action button exists */
    actionButtonExists: async () => (await getTagListActionTestkit()).exists(),
  };
};
