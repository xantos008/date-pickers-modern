import * as React from 'react';
import { resolveComponentProps, SlotComponentProps } from '@mui/base/utils';
import {
  PickersCalendarHeader,
  ExportedCalendarHeaderProps,
  useDefaultDates,
  useUtils,
  DayCalendar,
  DayCalendarProps,
  PickersCalendarHeaderSlotsComponent,
  PickersCalendarHeaderSlotsComponentsProps,
  DayValidationProps,
  DayCalendarSlotsComponent,
  DayCalendarSlotsComponentsProps, DateView, ExportedUseViewsOptions,
} from '../internals';
import { doNothing } from '../internal/utils/utils';
import { DateRange } from '../internal/models/range';
import { DateRangePickerDay, DateRangePickerDayProps } from '../DateRangePickerDay';

import { isWithinRange, isStartOfRange, isEndOfRange } from '../internal/utils/date-utils';
import {SlideDirection} from "../DateCalendar/PickersSlideTransition";
import { DateRangeCalendar } from '../DateRangeCalendar';

export interface DateRangePickerViewMobileSlotsComponent<TDate>
  extends PickersCalendarHeaderSlotsComponent,
    Omit<DayCalendarSlotsComponent<TDate>, 'Day'> {
  /**
   * Custom component for day in range pickers.
   * Check the [DateRangePickersDay](https://mui.com/x/api/date-pickers/date-range-picker-day/) component.
   * @default DateRangePickersDay
   */
  Day?: React.ElementType<DateRangePickerDayProps<TDate>>;
}

export interface DateRangePickerViewMobileSlotsComponentsProps<TDate>
  extends PickersCalendarHeaderSlotsComponentsProps<TDate>,
    Omit<DayCalendarSlotsComponentsProps<TDate>, 'day'> {
  day?: SlotComponentProps<typeof DateRangePickerDay, {}, DayCalendarProps<TDate> & { day: TDate }>;
}

interface ChangeMonthPayload<TDate> {
  direction: SlideDirection;
  newMonth: TDate;
}

interface DesktopDateRangeCalendarProps<TDate>
  extends Omit<
      DayCalendarProps<TDate>,
      'selectedDays' | 'onFocusedDayChange' | 'classes' | 'components' | 'componentsProps'
    >,
    DayValidationProps<TDate>,
    ExportedCalendarHeaderProps<TDate>,
    Pick<ExportedUseViewsOptions<DateView>, 'view' | 'views' | 'openTo' | 'onViewChange' | 'focusedView' > {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: DateRangePickerViewMobileSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: DateRangePickerViewMobileSlotsComponentsProps<TDate>;
  value: DateRange<TDate>;
  changeMonth: (date: TDate) => void;onYearChange?: (date: TDate) => void;
  isDateDisabled?:  (day: (TDate | null)) => boolean;
  handleChangeMonth?: (payload: ChangeMonthPayload<TDate>) => void;
  views: DateView[];
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday?: boolean;
  /**
   * Make picker read only.
   * @default false
   */
  readOnly?: boolean;
  changeFocusedDay: (newFocusedDate: (TDate | null), withoutMonthSwitchingAnimation?: (boolean | undefined)) => void;
  /**
   * Callback firing on month change @DateIOType.
   * @template TDate
   * @param {TDate} month The new month.
   * @returns {void|Promise} -
   */
  onMonthChange?: (month: TDate) => void | Promise<void>;
  onFocusedViewChangedIn?: (view: DateView, hasFocus: boolean) => void;
  setCurrentView: (newValue: (DateView | ((prevValue: DateView) => DateView))) => void;
}

/**
 * @ignore - internal component.
 */
export function DateRangePickerViewMobile<TDate>(props: DesktopDateRangeCalendarProps<TDate>) {
  const {
    view: inView,
    views,
    onFocusedViewChange,
    onYearChange,
    onViewChange,
    reduceAnimations,
    openTo,
    autoFocus,
    focusedView: inFocusedView,
    isDateDisabled,
    handleChangeMonth,
    disableHighlightToday,
    shouldDisableMonth,
    shouldDisableYear,
    changeFocusedDay,
    onMonthChange,
    onFocusedViewChangedIn,
    setCurrentView,

    changeMonth,
    components,
    componentsProps,
    value,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onSelectedDaysChange,
    disabled,
    readOnly,
    // excluding classes from `other` to avoid passing them down to children
    classes: providedClasses,
    ...other
  } = props;

  return (
    <React.Fragment>
      <DateRangeCalendar
          {...props}
          calendars={1}
          onFocusedViewChange={props.onFocusedViewChangedIn}
          onViewChange={setCurrentView}
          components={components}
          componentsProps={componentsProps}
          views={views}
          autoFocus={autoFocus}
      />
      {/*<PickersCalendarHeader*/}
      {/*  components={components}*/}
      {/*  componentsProps={componentsProps}*/}
      {/*  maxDate={maxDateWithDisabled}*/}
      {/*  minDate={minDateWithDisabled}*/}
      {/*  onMonthChange={changeMonth as any}*/}
      {/*  view={view}*/}
      {/*  views={views}*/}
      {/*  disabled={disabled}*/}
      {/*  {...other}*/}
      {/*/>*/}
      {/*<DayCalendar<TDate>*/}
      {/*  {...other}*/}
      {/*  minDate={minDate}*/}
      {/*  maxDate={maxDate}*/}
      {/*  disabled={disabled}*/}
      {/*  readOnly={readOnly}*/}
      {/*  selectedDays={value}*/}
      {/*  onSelectedDaysChange={onSelectedDaysChange}*/}
      {/*  onFocusedDayChange={doNothing}*/}
      {/*  components={componentsForDayCalendar}*/}
      {/*  componentsProps={componentsPropsForDayCalendar}*/}
      {/*/>*/}
    </React.Fragment>
  );
}
