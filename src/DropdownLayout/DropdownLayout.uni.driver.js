import { baseUniDriverFactory, ReactBase } from '../../test/utils/unidriver';
import {
  DATA_OPTION,
  DATA_HOOKS,
  DATA_DIVIDER,
  DATA_DIRECTION,
  DATA_SHOWN,
  DROPDOWN_LAYOUT_DIRECTIONS,
} from './DataAttr';

export const dropdownLayoutDriverFactory = base => {
  const byDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);
  const reactBase = ReactBase(base);
  const contentContainer = async () => byDataHook('content-container');
  const optionsDataHook = DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS;
  const infiniteScrollContainerDataHook = DATA_HOOKS.INFINITE_SCROLL_CONTAINER;
  const infiniteScrollContainer = byDataHook(infiniteScrollContainerDataHook);
  const optionsElement = byDataHook(optionsDataHook);
  const optionElementAt = async position =>
    await base.$(
      `[data-hook=${
        (await infiniteScrollContainer.exists())
          ? infiniteScrollContainerDataHook
          : optionsDataHook
      }] > *:nth-child(${position + 1})`,
    );
  const optionElementByDataHook = async dataHook =>
    await base.$(
      `[data-hook=${
        (await infiniteScrollContainer.exists())
          ? infiniteScrollContainerDataHook
          : optionsDataHook
      }] [data-hook="${dataHook}"]`,
    );
  const options = () =>
    base.$$(`[data-hook=${optionsDataHook}] > *`).map(i => i);
  const optionsLength = async () => (await options()).length;
  const doIfOptionExists = (position, onSuccess) => {
    if (optionsLength() <= position) {
      throw new Error(
        `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`,
      );
    }
    return onSuccess();
  };
  const getOptionDriver = position =>
    doIfOptionExists(position, async () =>
      createOptionDriver(await optionElementAt(position)),
    );
  return {
    ...baseUniDriverFactory(base),
    /** @deprecated should be private */
    classes: () => optionsElement._prop('className'),
    clickAtOption: async index => (await optionElementAt(index)).click(),
    clickAtOptionByDataHook: async dataHook =>
      (await optionElementByDataHook(dataHook)).click(),
    clickAtOptionWithValue: async value => {
      for (const _option of await options()) {
        if ((await _option._prop('innerHTML')) === value) {
          return _option.click();
        }
      }
    },
    hasTopArrow: async () =>
      await (await byDataHook(DATA_HOOKS.TOP_ARROW)).exists(),
    isDown: async () =>
      (await (await contentContainer()).attr(DATA_DIRECTION)) ===
      DROPDOWN_LAYOUT_DIRECTIONS.DOWN,
    isUp: async () =>
      (await (await contentContainer()).attr(DATA_DIRECTION)) ===
      DROPDOWN_LAYOUT_DIRECTIONS.UP,
    isLinkOption: async position => {
      const option = await optionElementAt(position);
      return (await option._prop('tagName')).toLowerCase() === 'a';
    },
    isOptionADivider: position =>
      doIfOptionExists(
        position,
        async () =>
          !!(await (await optionElementAt(position)).attr(DATA_DIVIDER)),
      ),
    isOptionExists: async optionText => {
      for (const _option of await options()) {
        if ((await _option.text()) === optionText) {
          return true;
        }
      }
      return false;
    },
    isOptionHovered: async index => {
      const option = await optionElementAt(index);
      return !!(await option.attr(DATA_OPTION.HOVERED));
    },
    isOptionSelected: async index => {
      const option = await optionElementAt(index);
      return !!(await option.attr(DATA_OPTION.SELECTED));
    },
    isOptionSelectedWithGlobalClassName: position =>
      doIfOptionExists(
        position,
        async () =>
          !!(await (await optionElementAt(position)).attr(
            DATA_OPTION.SELECTED_GLOBAL,
          )),
      ),
    isOptionHoveredWithGlobalClassName: position =>
      doIfOptionExists(
        position,
        async () =>
          !!(await (await optionElementAt(position)).attr(
            DATA_OPTION.HOVERED_GLOBAL,
          )),
      ),
    isOptionHeightSmall: position =>
      doIfOptionExists(
        position,
        async () =>
          (await (await optionElementAt(position)).attr(DATA_OPTION.SIZE)) ===
          'small',
      ),
    isOptionHeightBig: position =>
      doIfOptionExists(
        position,
        async () =>
          (await (await optionElementAt(position)).attr(DATA_OPTION.SIZE)) ===
          'big',
      ),
    isShown: async () => !!(await (await contentContainer()).attr(DATA_SHOWN)),
    mouseEnter: () => base.hover(),
    mouseEnterAtOption: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).hover(),
      ),
    mouseLeave: () => reactBase.mouseLeave(),
    mouseClickOutside: () => ReactBase.clickBody(),
    mouseLeaveAtOption: position =>
      doIfOptionExists(position, async () =>
        ReactBase(await optionElementAt(position)).mouseLeave(),
      ),
    /** @deprecated Use optionDriver*/
    optionAt: () => optionElementAt.getNative(), // eslint-disable-line no-restricted-properties
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: async hook => {
      const option = optionsElement.$(`[data-hook=${hook}]`);
      if (!(await option.exists())) {
        throw new Error(`an option with data-hook ${hook} was not found`);
      }

      return createOptionDriver(option);
    },
    /**
     * Get Option by id
     * @returns {Promise<any>}
     */
    optionById(optionId) {
      return this.optionByHook(`dropdown-item-${optionId}`);
    },
    optionContentAt: position =>
      doIfOptionExists(position, async () =>
        (await optionElementAt(position)).text(),
      ),
    optionDriver: createOptionDriver,
    options: async () => {
      const drivers = [];
      for (let position = 0; position < (await optionsLength()); position++) {
        drivers.push(await getOptionDriver(position));
      }
      return drivers;
    },
    optionsContent: async () => {
      const textArray = [];
      for (const option of await options()) {
        textArray.push(await option.text());
      }
      return textArray;
    },
    markedOption: async () => {
      const allOptions = await options();
      const optionsWithHovered = await Promise.all(
        allOptions.map(async option => ({
          option,
          hovered: !!(await option.attr(DATA_OPTION.HOVERED)),
        })),
      );
      const hoveredOptions = optionsWithHovered
        .filter(option => option.hovered)
        .map(option => option.option);
      return (
        (hoveredOptions.length &&
          createOptionDriver(hoveredOptions[0]).content()) ||
        null
      );
    },
    optionsLength,
    /** @deprecated should be private */
    optionsScrollTop: () => optionsElement._prop('scrollTop'),
    pressDownKey: () => base.pressKey('ArrowDown'),
    pressUpKey: () => base.pressKey('ArrowUp'),
    pressEnterKey: () => base.pressKey('Enter'),
    pressSpaceKey: () => base.pressKey(' '),
    pressTabKey: () => base.pressKey('Tab'),
    pressEscKey: () => base.pressKey('Escape'),
    tabIndex: () => base._prop('tabIndex'),
  };
};

const createOptionDriver = option => ({
  element: () => option,
  mouseEnter: () => option.hover(),
  mouseLeave: () => ReactBase(option).mouseLeave(),
  isHovered: async () => !!(await option.attr(DATA_OPTION.HOVERED)),
  isSelected: async () => !!(await option.attr(DATA_OPTION.SELECTED)),
  isHoveredWithGlobalClassName: async () =>
    !!(await option.attr(DATA_OPTION.HOVERED_GLOBAL)),
  isSelectedWithGlobalClassName: async () =>
    !!(await option.attr(DATA_OPTION.SELECTED_GLOBAL)),
  content: () => option.text(),
  click: () => option.click(),
  isDivider: async () => !!(await option.attr(DATA_DIVIDER)),
  isDisabled: async () => !!(await option.attr(DATA_OPTION.DISABLED)),
});
