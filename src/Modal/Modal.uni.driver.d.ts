import { BaseUniDriver } from 'wix-ui-test-utils/base-driver';
import { ModalTheme } from './index';
import { UniDriver } from 'wix-ui-test-utils/unidriver';

export interface ModalUniDriver extends BaseUniDriver {
  isOpen: () => Promise<boolean>;
  isThemeExist: (theme: ModalTheme) => Promise<boolean>;
  getChildBySelector: (selector: string) => Promise<UniDriver | null>;
  isScrollable: () => Promise<boolean>;
  closeButtonExists: () => Promise<boolean>;
  clickOnOverlay: () => Promise<void>;
  clickOnCloseButton: () => Promise<void>;
  getContent: () => Promise<Element>;
  getContentStyle: () => Promise<any>;
  getContentLabel: () => Promise<string | null>;
  getZIndex: () => Promise<any>;
}
