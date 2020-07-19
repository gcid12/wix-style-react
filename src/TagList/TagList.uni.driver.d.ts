import { BaseUniDriver } from 'wix-ui-test-utils/unidriver';

export interface TagListUniDriver extends BaseUniDriver {
  actionButtonLabel: () => Promise<string>;
  clickActionButton: () => Promise<void>;
  actionButtonExists: () => Promise<boolean>;
}
