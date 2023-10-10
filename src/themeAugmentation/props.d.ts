import {
  DateCalendarProps,
  ExportedSlideTransitionProps,
  PickersFadeTransitionGroupProps,
} from '../DateCalendar';
import { DayCalendarSkeletonProps } from '../DayCalendarSkeleton';
import { ClockNumberProps, TimeClockProps, ClockPointerProps, ClockProps } from '../TimeClock';
import { ExportedPickersMonthProps, MonthCalendarProps } from '../MonthCalendar';
import { PickersDayProps } from '../PickersDay';
import { ExportedPickersYearProps, YearCalendarProps } from '../YearCalendar';
import { DateFieldProps } from '../DateField';
import { LocalizationProviderProps } from '../LocalizationProvider';
import { PickersLayoutProps } from '../PickersLayout';
import {
  DayCalendarProps,
  ExportedPickersArrowSwitcherProps,
  PickerPopperProps,
  PickersToolbarButtonProps,
  PickersToolbarProps,
  ExportedPickersToolbarTextProps,
} from '../internals';
import { DateOrTimeView } from '../models';

import { DatePickerProps, DatePickerToolbarProps } from '../DatePicker';
import { DesktopDatePickerProps } from '../DesktopDatePicker';
import { MobileDatePickerProps } from '../MobileDatePicker';
import { StaticDatePickerProps } from '../StaticDatePicker';

import {
  DateTimePickerProps,
  DateTimePickerTabsProps,
  DateTimePickerToolbarProps,
} from '../DateTimePicker';
import { DesktopDateTimePickerProps } from '../DesktopDateTimePicker';
import { MobileDateTimePickerProps } from '../MobileDateTimePicker';
import { StaticDateTimePickerProps } from '../StaticDateTimePicker';
import { DateTimeFieldProps } from '../DateTimeField';

import { TimePickerProps, TimePickerToolbarProps } from '../TimePicker';
import { DesktopTimePickerProps } from '../DesktopTimePicker';
import { MobileTimePickerProps } from '../MobileTimePicker';
import { StaticTimePickerProps } from '../StaticTimePicker';
import { ExportedDigitalClockProps } from '../DigitalClock';
import { TimeFieldProps } from '../TimeField';
import {
  ExportedMultiSectionDigitalClockSectionProps,
  MultiSectionDigitalClockProps,
} from '../MultiSectionDigitalClock';
import { ExportedPickersCalendarHeaderProps } from '../PickersCalendarHeader';

import { DateRangePickerDayProps } from '../DateRangePickerDay';
import { MultiInputDateRangeFieldProps } from '../MultiInputDateRangeField/MultiInputDateRangeField.types';
import { SingleInputDateRangeFieldProps } from '../SingleInputDateRangeField/SingleInputDateRangeField.types';
import { DateRangeCalendarProps } from '../DateRangeCalendar';

import { DateRangePickerProps, DateRangePickerToolbarProps } from '../DateRangePicker';
import { DesktopDateRangePickerProps } from '../DesktopDateRangePicker';
import { MobileDateRangePickerProps } from '../MobileDateRangePicker';
import { StaticDateRangePickerProps } from '../StaticDateRangePicker';
import { MultiInputDateTimeRangeFieldProps } from '../MultiInputDateTimeRangeField';
import { MultiInputTimeRangeFieldProps } from '../MultiInputTimeRangeField';
import { SingleInputDateTimeRangeFieldProps } from '../SingleInputDateTimeRangeField';
import { SingleInputTimeRangeFieldProps } from '../SingleInputTimeRangeField';

export interface PickersComponentsPropsList {
  MuiClock: ClockProps<unknown>;
  MuiClockNumber: ClockNumberProps;
  MuiClockPointer: ClockPointerProps;
  MuiDateCalendar: DateCalendarProps<unknown>;
  MuiDateField: DateFieldProps<unknown>;
  MuiDatePickerToolbar: DatePickerToolbarProps<unknown>;
  MuiDateTimeField: DateTimeFieldProps<unknown>;
  MuiDateTimePickerTabs: DateTimePickerTabsProps;
  MuiDateTimePickerToolbar: DateTimePickerToolbarProps<unknown>;
  MuiDayCalendar: DayCalendarProps<unknown>;
  MuiDayCalendarSkeleton: DayCalendarSkeletonProps;
  MuiDigitalClock: ExportedDigitalClockProps<unknown>;
  MuiLocalizationProvider: LocalizationProviderProps<unknown, unknown>;
  MuiMonthCalendar: MonthCalendarProps<unknown>;
  MuiMultiSectionDigitalClock: MultiSectionDigitalClockProps<unknown>;
  MuiMultiSectionDigitalClockSection: ExportedMultiSectionDigitalClockSectionProps;
  MuiPickersArrowSwitcher: ExportedPickersArrowSwitcherProps;
  MuiPickersCalendarHeader: ExportedPickersCalendarHeaderProps<unknown>;
  MuiPickersDay: PickersDayProps<unknown>;
  MuiPickersFadeTransitionGroup: PickersFadeTransitionGroupProps;
  MuiPickersMonth: ExportedPickersMonthProps;
  MuiPickersPopper: PickerPopperProps;
  MuiPickersSlideTransition: ExportedSlideTransitionProps;
  MuiPickersToolbar: PickersToolbarProps<unknown, DateOrTimeView>;
  MuiPickersToolbarButton: PickersToolbarButtonProps;
  MuiPickersToolbarText: ExportedPickersToolbarTextProps;
  MuiPickersLayout: PickersLayoutProps<unknown, unknown, DateOrTimeView>;
  MuiPickersYear: ExportedPickersYearProps;
  MuiTimeClock: TimeClockProps<unknown>;
  MuiTimeField: TimeFieldProps<unknown>;
  MuiTimePickerToolbar: TimePickerToolbarProps<unknown>;
  MuiYearCalendar: YearCalendarProps<unknown>;

  // Date Pickers
  MuiDatePicker: DatePickerProps<unknown>;
  MuiDesktopDatePicker: DesktopDatePickerProps<unknown>;
  MuiMobileDatePicker: MobileDatePickerProps<unknown>;
  MuiStaticDatePicker: StaticDatePickerProps<unknown>;

  // Time Pickers
  MuiTimePicker: TimePickerProps<unknown>;
  MuiDesktopTimePicker: DesktopTimePickerProps<unknown>;
  MuiMobileTimePicker: MobileTimePickerProps<unknown>;
  MuiStaticTimePicker: StaticTimePickerProps<unknown>;

  // Date Time Pickers
  MuiDateTimePicker: DateTimePickerProps<unknown>;
  MuiDesktopDateTimePicker: DesktopDateTimePickerProps<unknown>;
  MuiMobileDateTimePicker: MobileDateTimePickerProps<unknown>;
  MuiStaticDateTimePicker: StaticDateTimePickerProps<unknown>;

  MuiDateRangeCalendar: DateRangeCalendarProps<unknown>;
  MuiDateRangePickerDay: DateRangePickerDayProps<unknown>;
  MuiDateRangePickerToolbar: DateRangePickerToolbarProps<unknown>;

  // Multi input range fields
  MuiMultiInputDateRangeField: MultiInputDateRangeFieldProps<unknown>;
  MuiMultiInputDateTimeRangeField: MultiInputDateTimeRangeFieldProps<unknown>;
  MuiMultiInputTimeRangeField: MultiInputTimeRangeFieldProps<unknown>;

  // Single input range fields
  MuiSingleInputDateRangeField: SingleInputDateRangeFieldProps<unknown>;
  MuiSingleInputDateTimeRangeField: SingleInputDateTimeRangeFieldProps<unknown>;
  MuiSingleInputTimeRangeField: SingleInputTimeRangeFieldProps<unknown>;

  // Date Range Pickers
  MuiDateRangePicker: DateRangePickerProps<unknown>;
  MuiDesktopDateRangePicker: DesktopDateRangePickerProps<unknown>;
  MuiMobileDateRangePicker: MobileDateRangePickerProps<unknown>;
  MuiStaticDateRangePicker: StaticDateRangePickerProps<unknown>;
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends PickersComponentsPropsList {}
}

// disable automatic export
export {};
