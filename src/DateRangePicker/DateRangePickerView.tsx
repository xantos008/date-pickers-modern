import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useUtils,
  WrapperVariantContext,
  MobileKeyboardInputView,
  defaultReduceAnimations,
  ExportedDateCalendarProps,
  useCalendarState,
  PickerStatePickerProps,
  DayCalendarProps,
  BaseDateValidationProps,
  DayValidationProps,
  ExportedBaseToolbarProps,
  ExportedUseViewsOptions, DateView,
} from '../internals';
import { DateRange, RangePositionProps } from '../internal/models/range';
import { DayRangeValidationProps } from '../internal/models/dateRange';
import { isRangeValid } from '../internal/utils/date-utils';
import { calculateRangeChange } from './date-range-manager';
import {
  DateRangePickerViewMobile,
  DateRangePickerViewMobileSlotsComponent,
  DateRangePickerViewMobileSlotsComponentsProps,
} from './DateRangePickerViewMobile';
import { DateRangePickerInput, DateRangePickerInputProps } from './DateRangePickerInput';
import {
  DateRangePickerViewDesktop,
  ExportedDateRangePickerViewDesktopProps,
} from './DateRangePickerViewDesktop';
import { DateRangePickerToolbarProps } from './DateRangePickerToolbar';

export interface DateRangePickerViewSlotsComponent<TDate>
  extends DateRangePickerViewMobileSlotsComponent<TDate> {
  /**
   * Custom component for the toolbar rendered above the views.
   * @default DateRangePickerToolbar
   */
  Toolbar?: React.JSXElementConstructor<DateRangePickerToolbarProps<TDate>>;
}

export interface DateRangePickerViewSlotsComponentsProps<TDate>
  extends DateRangePickerViewMobileSlotsComponentsProps<TDate> {
  toolbar?: ExportedBaseToolbarProps;
}

export interface ExportedDateRangePickerViewProps<TDate>
  extends ExportedDateRangePickerViewDesktopProps,
    DayRangeValidationProps<TDate>,
    Omit<
      ExportedDateCalendarProps<TDate>,
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'onYearChange'
      | keyof BaseDateValidationProps<TDate>
      | keyof DayValidationProps<TDate>
    > ,
      ExportedUseViewsOptions<DateView> {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: DateRangePickerViewSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: DateRangePickerViewSlotsComponentsProps<TDate>;
  /**
   * If `true`, after selecting `start` date calendar will not automatically switch to the month of `end` date.
   * @default false
   */
  disableAutoMonthSwitching?: boolean;
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar?: boolean;
  /**
   * className applied to the root component.
   */
  className?: string;
}

interface DateRangePickerViewProps<TDate>
  extends RangePositionProps,
    ExportedDateRangePickerViewProps<TDate>,
    PickerStatePickerProps<DateRange<TDate>>,
    Required<BaseDateValidationProps<TDate>> {
  calendars: 1 | 2 | 3;
  open: boolean;
  DateInputProps: DateRangePickerInputProps<TDate>;
  onYearChange?: (year: TDate) => void;
  /**
   * Make picker read only.
   * @default false
   */
  readOnly?: boolean;
  views: DateView[];
}

type DateRangePickerViewComponent = (<TDate>(
  props: DateRangePickerViewProps<TDate>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - internal component.
 */
function DateRangePickerViewRaw<TDate>(props: DateRangePickerViewProps<TDate>) {
  const {
    onYearChange,
    views,
    view: inView,
    openTo,
    focusedView,
    readOnly,
    shouldDisableMonth,
    shouldDisableYear,

    calendars,
    className,
    value,
    DateInputProps,
    defaultCalendarMonth,
    disableAutoMonthSwitching = false,
    disableFuture,
    disableHighlightToday,
    disablePast,
    isMobileKeyboardViewOpen,
    maxDate,
    minDate,
    onDateChange,
    onMonthChange,
    open,
    reduceAnimations = defaultReduceAnimations,
    rangePosition,
    onRangePositionChange,
    shouldDisableDate,
    showToolbar,
    toggleMobileKeyboardView,
    components,
    componentsProps,
    onFocusedViewChange,
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const wrappedShouldDisableDate =
    shouldDisableDate && ((dayToTest: TDate) => shouldDisableDate?.(dayToTest, rangePosition));

  const [start, end] = value;
  const {
    calendarState,
    changeFocusedDay,
    changeMonth,
    handleChangeMonth,
    onMonthSwitchingAnimationEnd,
    isDateDisabled
  } = useCalendarState<TDate>({
      value: start || end,
      defaultCalendarMonth,
      disableFuture,
      disablePast,
      disableSwitchToMonthOnDayFocus: true,
      maxDate,
      minDate,
      onMonthChange,
      reduceAnimations,
      shouldDisableDate: wrappedShouldDisableDate,
    });

  const prevValue = React.useRef<DateRange<TDate> | null>(null);
  React.useEffect(() => {
    const date = rangePosition === 'start' ? start : end;
    if (!date || !utils.isValid(date)) {
      return;
    }

    const prevDate = rangePosition === 'start' ? prevValue.current?.[0] : prevValue.current?.[1];
    prevValue.current = value;

    // The current date did not change, this call comes either from a `rangePosition` change or a change in the other date.
    // In both cases, we don't want to change the visible month(s).
    if (disableAutoMonthSwitching && prevDate && utils.isEqual(prevDate, date)) {
      return;
    }

    const displayingMonthRange = wrapperVariant === 'mobile' ? 0 : calendars - 1;
    const currentMonthNumber = utils.getMonth(calendarState.currentMonth);
    const requestedMonthNumber = utils.getMonth(date);

    if (
      !utils.isSameYear(calendarState.currentMonth, date) ||
      requestedMonthNumber < currentMonthNumber ||
      requestedMonthNumber > currentMonthNumber + displayingMonthRange
    ) {
      const newMonth =
        rangePosition === 'start'
          ? date
          : // If need to focus end, scroll to the state when "end" is displaying in the last calendar
            utils.addMonths(date, -displayingMonthRange);

      changeMonth(newMonth);
    }
  }, [rangePosition, value]); // eslint-disable-line

  const handleSelectedDayChange = React.useCallback<
    DayCalendarProps<TDate>['onSelectedDaysChange']
  >(
    (newDate) => {
      const { nextSelection, newRange } = calculateRangeChange({
        newDate,
        utils,
        range: value,
        rangePosition,
      });

      onRangePositionChange(nextSelection);

      const isFullRangeSelected = rangePosition === 'end' && isRangeValid(utils, newRange);

      onDateChange(
        newRange as DateRange<TDate>,
        wrapperVariant,
        isFullRangeSelected ? 'finish' : 'partial',
      );
    },
    [rangePosition, value, onDateChange, onRangePositionChange, utils, wrapperVariant],
  );

  const shouldRenderToolbar = showToolbar ?? wrapperVariant !== 'desktop';
  const Toolbar = components?.Toolbar;

  const renderView = () => {
    const sharedCalendarProps = {
      value,
      onMonthChange,
      views,
      onYearChange,
      isDateDisabled,
      handleChangeMonth,
      changeFocusedDay,
      onSelectedDaysChange: handleSelectedDayChange,
      reduceAnimations,
      disableHighlightToday,
      onMonthSwitchingAnimationEnd,
      changeMonth,
      rangePosition,
      disableFuture,
      disablePast,
      minDate,
      maxDate,
      components,
      componentsProps,
      shouldDisableDate: wrappedShouldDisableDate,
      ...calendarState,
      onFocusedViewChange: onFocusedViewChange
        ? (newHasFocus: boolean) => onFocusedViewChange('day', newHasFocus)
        : undefined,
      ...other,
    };

    switch (wrapperVariant) {
      case 'desktop': {
        return <DateRangePickerViewDesktop calendars={calendars} {...sharedCalendarProps} />;
      }

      default: {
        return <DateRangePickerViewMobile {...sharedCalendarProps} />;
      }
    }
  };

  return (
    <div className={className}>
      {shouldRenderToolbar && !!Toolbar && (
        <Toolbar
          {...componentsProps?.toolbar}
          value={value}
          isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
          toggleMobileKeyboardView={toggleMobileKeyboardView}
          rangePosition={rangePosition}
          onRangePositionChange={onRangePositionChange}
        />
      )}

      {isMobileKeyboardViewOpen ? (
        <MobileKeyboardInputView>
          <DateRangePickerInput disableOpenPicker ignoreInvalidInputs {...DateInputProps} />
        </MobileKeyboardInputView>
      ) : (
        renderView()
      )}
    </div>
  );
}

export const DateRangePickerView = DateRangePickerViewRaw as DateRangePickerViewComponent;

DateRangePickerViewRaw.propTypes = {
  calendars: PropTypes.oneOf([1, 2, 3]),
  disableAutoMonthSwitching: PropTypes.bool,
};
