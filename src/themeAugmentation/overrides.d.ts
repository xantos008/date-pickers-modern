import {
  DateCalendarClassKey,
  DayCalendarClassKey,
  PickersCalendarHeaderClassKey,
  PickersFadeTransitionGroupClassKey,
  PickersSlideTransitionClassKey,
} from '../DateCalendar';
import { DayCalendarSkeletonClassKey } from '../DayCalendarSkeleton';
import {
  ClockClassKey,
  ClockNumberClassKey,
  TimeClockClassKey,
  ClockPointerClassKey,
} from '../TimeClock';
import { MonthCalendarClassKey, PickersMonthClassKey } from '../MonthCalendar';
import { PickersDayClassKey } from '../PickersDay';
import { PickersYearClassKey, YearCalendarClassKey } from '../YearCalendar';
import { PickerStaticWrapperClassKey } from '../internals/components/PickerStaticWrapper';
import { DatePickerToolbarClassKey } from '../DatePicker';
import { DateTimePickerTabsClassKey, DateTimePickerToolbarClassKey } from '../DateTimePicker';
import { TimePickerToolbarClassKey } from '../TimePicker';
import { PickersLayoutClassKey } from '../PickersLayout';
import {
  CalendarOrClockPickerClassKey,
  PickersArrowSwitcherClassKey,
  PickersPopperClassKey,
  PickersToolbarButtonClassKey,
  PickersToolbarClassKey,
  PickersToolbarTextClassKey,
} from '../internals';
import { DateRangePickerInputClassKey } from '../DateRangePicker/dateRangePickerInputClasses';
import { DateRangePickerToolbarClassKey } from '../DateRangePicker/dateRangePickerToolbarClasses';
import { DateRangePickerViewDesktopClassKey } from '../DateRangePicker/dateRangePickerViewDesktopClasses';
import { DateRangePickerDayClassKey } from '../DateRangePickerDay';
import { DateRangeCalendarClassKey } from '../DateRangeCalendar/dateRangeCalendarClasses';

// prettier-ignore
export interface PickersComponentNameToClassKey {
  MuiCalendarOrClockPicker: CalendarOrClockPickerClassKey;
  MuiClock: ClockClassKey;
  MuiClockNumber: ClockNumberClassKey;
  MuiClockPointer: ClockPointerClassKey;
  MuiDateCalendar: DateCalendarClassKey;
  MuiDateField: never;
  MuiDatePicker: never;
  MuiDatePickerToolbar: DatePickerToolbarClassKey;
  MuiDateTimePicker: never;
  MuiDateTimePickerTabs: DateTimePickerTabsClassKey;
  MuiDateTimePickerToolbar: DateTimePickerToolbarClassKey;
  MuiDayCalendar: DayCalendarClassKey;
  MuiDayCalendarSkeleton: DayCalendarSkeletonClassKey;
  MuiDesktopDatePicker: never;
  MuiDesktopDateTimePicker: never;
  MuiDesktopNextDatePicker: never;
  MuiDesktopNextDateTimePicker: never;
  MuiDesktopNextTimePicker: never;
  MuiDesktopTimePicker: never;
  MuiLocalizationProvider: never;
  MuiMobileDatePicker: never;
  MuiMobileDateTimePicker: never;
  MuiMobileNextDatePicker: never;
  MuiMobileNextDateTimePicker: never;
  MuiMobileNextTimePicker: never;
  MuiMobileTimePicker: never;
  MuiMonthCalendar: MonthCalendarClassKey;
  MuiNextDatePicker: never;
  MuiNextDateTimePicker: never;
  MuiNextTimePicker: never;
  MuiPickersArrowSwitcher: PickersArrowSwitcherClassKey;
  MuiPickersCalendarHeader: PickersCalendarHeaderClassKey;
  MuiPickersDay: PickersDayClassKey;
  MuiPickersFadeTransitionGroup: PickersFadeTransitionGroupClassKey;
  MuiPickersMonth: PickersMonthClassKey;
  MuiPickersPopper: PickersPopperClassKey;
  MuiPickersSlideTransition: PickersSlideTransitionClassKey;
  MuiPickerStaticWrapper: PickerStaticWrapperClassKey;
  MuiPickersToolbar: PickersToolbarClassKey;
  MuiPickersToolbarButton: PickersToolbarButtonClassKey;
  MuiPickersToolbarText: PickersToolbarTextClassKey;
  MuiPickersLayout: PickersLayoutClassKey;
  MuiPickersYear: PickersYearClassKey;
  MuiStaticDatePicker: never;
  MuiStaticDateTimePicker: never;
  MuiStaticNextDatePicker: never;
  MuiStaticNextDateTimePicker: never;
  MuiStaticNextTimePicker: never;
  MuiStaticTimePicker: never;
  MuiTimeClock: TimeClockClassKey;
  MuiTimePicker: never;
  MuiTimePickerToolbar: TimePickerToolbarClassKey;
  MuiYearCalendar: YearCalendarClassKey;
}

// prettier-ignore
export interface PickersProComponentNameToClassKey {
  MuiDateRangeCalendar: DateRangeCalendarClassKey
  MuiDateRangePicker: never;
  MuiDateRangePickerDay: DateRangePickerDayClassKey;
  MuiDateRangePickerInput: DateRangePickerInputClassKey;
  MuiDateRangePickerToolbar: DateRangePickerToolbarClassKey;
  MuiDateRangePickerViewDesktop: DateRangePickerViewDesktopClassKey;
  MuiDesktopDateRangePicker: never;
  MuiDesktopNextDateRangePicker: never;
  MuiMobileDateRangePicker: never;
  MuiMobileNextDateRangePicker: never;
  MuiMultiInputDateRangeField: never;
  MuiNextDateRangePicker: never;
  MuiSingleInputDateRangeField: never;
  MuiStaticDateRangePicker: never;
  MuiStaticNextDateRangePicker: never;
}

declare module '@mui/material/styles' {
  interface ComponentNameToClassKey extends PickersComponentNameToClassKey, PickersProComponentNameToClassKey {}
}

// disable automatic export
export {};
