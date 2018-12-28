import React from 'react';
import CalendarPanel from './CalendarPanel';
import calendarPanelDriverFactory from './CalendarPanel.driver';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';
import isSameDay from 'date-fns/is_same_day';

const A_DAY = new Date(2019, 4, 29);
const A_DAY_NOT_IN_PRESETS = new Date(2019, 4, 10);

const A_DAY_BEFORE = (() => {
  const date = new Date(A_DAY);
  date.setDate(date.getDate() - 1);
  return date;
})();
const A_WEEK_BEFORE = (() => {
  const date = new Date(A_DAY);
  date.setDate(date.getDate() - 7);
  return date;
})();
const A_WEEK_AFTER = (() => {
  const date = new Date(A_DAY);
  date.setDate(date.getDate() + 7);
  return date;
})();
const TWO_MONTHS_BEFORE = (() => {
  const date = new Date(A_DAY);
  date.setMonth(date.getDate() - 60);
  return date;
})();

const ONE_MONTH_BEFORE = (() => {
  const date = new Date(A_DAY);
  date.setMonth(date.getDate() - 30);
  return date;
})();

const presets = [
  { id: 1, value: 'a day', selectedDays: { from: A_DAY, to: A_DAY } },
  {
    id: 2,
    value: 'a day before',
    selectedDays: { from: A_DAY_BEFORE, to: A_DAY_BEFORE },
  },
  {
    id: 3,
    value: 'a week before',
    selectedDays: { from: A_WEEK_BEFORE, to: A_DAY },
  },
  {
    id: 4,
    value: 'a week after',
    selectedDays: { from: A_DAY, to: A_WEEK_AFTER },
  },
  {
    id: 5,
    value: 'one month - two months before',
    selectedDays: { from: TWO_MONTHS_BEFORE, to: ONE_MONTH_BEFORE },
  },
];

describe('CalendarPanel', () => {
  const render = createRendererWithDriver(calendarPanelDriverFactory);
  afterEach(() => cleanup());

  it('should show the calendar in two month view by default', () => {
    const { driver } = render(
      <CalendarPanel onChange={() => null} presets={presets} />,
    );
    expect(driver.calendarDriver().getNumOfVisibleMonths()).toBe(2);
  });

  it('should show the presets dropdown layout', () => {
    const { driver } = render(
      <CalendarPanel onChange={() => null} presets={presets} />,
    );
    expect(driver.presetsDropdownLayoutDriver().exists()).toBe(true);
    expect(driver.presetsDropdownLayoutDriver().isShown()).toBe(true);
  });

  it('should show the correct presets', () => {
    const { driver } = render(
      <CalendarPanel onChange={() => null} presets={presets} />,
    );
    expect(driver.presetsDropdownLayoutDriver().optionsLength()).toBe(
      presets.length,
    );
    const optionsContent = driver
      .presetsDropdownLayoutDriver()
      .optionsContent();
    presets
      .map(preset => preset.value)
      .forEach(presetValue => {
        expect(optionsContent).toContain(presetValue);
      });
  });

  describe('driver.getNumOfVisibleMonths()', () => {
    it('should return 2 also when showMonthDropdown=true', () => {
      const { driver } = render(
        <CalendarPanel
          showMonthDropdown
          onChange={() => null}
          presets={presets}
        />,
      );
      expect(driver.calendarDriver().getNumOfVisibleMonths()).toBe(2);
    });
  });

  it('should call onChange with the selected preset dates', () => {
    const selectedPreset = presets[2];
    const onChange = jest.fn();
    const { driver } = render(
      <CalendarPanel onChange={onChange} presets={presets} />,
    );

    driver
      .presetsDropdownLayoutDriver()
      .clickAtOptionWithValue(selectedPreset.value);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(
      isSameDay(
        onChange.mock.calls[0][0].from,
        selectedPreset.selectedDays.from,
      ),
    ).toBe(true);
    expect(
      isSameDay(onChange.mock.calls[0][0].to, selectedPreset.selectedDays.to),
    ).toBe(true);
  });

  describe('no presets', () => {
    it('should not display the dropdown layout when the presets props is empty array', () => {
      const { driver } = render(
        <CalendarPanel
          onChange={jest.fn()}
          value={A_DAY_NOT_IN_PRESETS}
          selectionMode={'range'}
          presets={[]}
        />,
      );
      expect(driver.isDropdownExists()).toBe(false);
    });

    it('should not display the dropdown layout when the is no presets prop', () => {
      const { driver } = render(
        <CalendarPanel
          onChange={jest.fn()}
          value={A_DAY_NOT_IN_PRESETS}
          selectionMode={'range'}
        />,
      );
      expect(driver.isDropdownExists()).toBe(false);
    });
  });

  describe('footer', () => {
    it('should render a given footer content', () => {
      const compDataHook = 'given-comp';
      const renderProp = () => <div data-hook={compDataHook} />;
      const { driver } = render(
        <CalendarPanel onChange={jest.fn()} footer={renderProp} />,
      );
      expect(driver.findByDataHook(compDataHook)).toBeTruthy();
    });

    describe('renderProp arguments', () => {
      describe('selectedDays', () => {
        it('should have selectedDays prop', () => {
          const renderProp = jest.fn();
          render(
            <CalendarPanel
              value={A_DAY}
              onChange={jest.fn()}
              footer={renderProp}
            />,
          );

          const renderPropFirstArgument = renderProp.mock.calls[0][0];

          expect(renderProp).toHaveBeenCalledTimes(1);
          expect(Object.keys(renderPropFirstArgument)).toContain(
            'selectedDays',
          );
          expect(renderPropFirstArgument.selectedDays).toBe(A_DAY);
        });
      });

      describe('submitDisabled', () => {
        const noop = () => {};
        function testCase({ props, expectedValue }) {
          const renderProp = jest.fn();
          render(
            <CalendarPanel onChange={noop} footer={renderProp} {...props} />,
          );

          const renderPropFirstArgument = renderProp.mock.calls[0][0];

          expect(renderPropFirstArgument.submitDisabled).toBe(expectedValue);
        }
        describe('selectionMode=day', () => {
          it('should be false', () => {
            testCase({
              props: { value: A_DAY, selectionMode: 'day' },
              expectedValue: false,
            });
          });

          it('should be true', () => {
            testCase({
              props: { value: undefined, selectionMode: 'day' },
              expectedValue: true,
            });
          });
        });

        describe('selectionMode=range', () => {
          it('should be enabled when a range is selected', () => {
            testCase({
              props: {
                value: { from: A_DAY_BEFORE, to: A_DAY },
                selectionMode: 'range',
              },
              expectedValue: false,
            });
          });

          it('should be disabled given no selection', () => {
            testCase({
              props: { value: undefined, selectionMode: 'range' },
              expectedValue: true,
            });
          });

          it(`should be disabled given only a 'from' date`, () => {
            testCase({
              props: {
                value: { from: new Date(2018, 1, 1) },
                selectionMode: 'range',
              },
              expectedValue: true,
            });
          });
        });
      });
    });
  });
});
