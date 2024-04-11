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
import { DayCalendarProps } from '../DateCalendar/DayCalendar';
import { ExportedPickersArrowSwitcherProps } from '../internals/components/PickersArrowSwitcher/PickersArrowSwitcher.types';
import { PickerPopperProps } from '../internals/components/PickersPopper';
import { PickersToolbarProps } from '../internals/components/PickersToolbar';
import { PickersToolbarButtonProps } from '../internals/components/PickersToolbarButton';
import { ExportedPickersToolbarTextProps } from '../internals/components/PickersToolbarText';
import { DateOrTimeView, PickerValidDate } from '../models';

import { DatePickerProps } from '../DatePicker';
import { ExportedDatePickerToolbarProps } from '../DatePicker/DatePickerToolbar';
import { DesktopDatePickerProps } from '../DesktopDatePicker';
import { MobileDatePickerProps } from '../MobileDatePicker';
import { StaticDatePickerProps } from '../StaticDatePicker';

import { DateTimePickerProps, DateTimePickerTabsProps } from '../DateTimePicker';
import { ExportedDateTimePickerToolbarProps } from '../DateTimePicker/DateTimePickerToolbar';
import { DesktopDateTimePickerProps } from '../DesktopDateTimePicker';
import { MobileDateTimePickerProps } from '../MobileDateTimePicker';
import { StaticDateTimePickerProps } from '../StaticDateTimePicker';
import { DateTimeFieldProps } from '../DateTimeField';

import { TimePickerProps } from '../TimePicker';
import { ExportedTimePickerToolbarProps } from '../TimePicker/TimePickerToolbar';
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
import {
  PickersTextFieldProps,
  PickersInputBaseProps,
  PickersOutlinedInputProps,
  PickersInputProps,
  PickersFilledInputProps,
} from '../PickersTextField';
import { PickersSectionListProps } from '../PickersSectionList';

import { DateRangePickerDayProps } from '../DateRangePickerDay';
import { MultiInputDateRangeFieldProps } from '../MultiInputDateRangeField/MultiInputDateRangeField.types';
import { SingleInputDateRangeFieldProps } from '../SingleInputDateRangeField/SingleInputDateRangeField.types';
import { DateRangeCalendarProps } from '../DateRangeCalendar';
import { DateRangePickerProps } from '../DateRangePicker';
import { ExportedDateRangePickerToolbarProps } from '../DateRangePicker/DateRangePickerToolbar';
import { DesktopDateRangePickerProps } from '../DesktopDateRangePicker';
import { MobileDateRangePickerProps } from '../MobileDateRangePicker';
import { StaticDateRangePickerProps } from '../StaticDateRangePicker';
import { MultiInputDateTimeRangeFieldProps } from '../MultiInputDateTimeRangeField';
import { MultiInputTimeRangeFieldProps } from '../MultiInputTimeRangeField';
import { SingleInputDateTimeRangeFieldProps } from '../SingleInputDateTimeRangeField';
import { SingleInputTimeRangeFieldProps } from '../SingleInputTimeRangeField';
import { DateTimeRangePickerProps } from '../DateTimeRangePicker';
import { DesktopDateTimeRangePickerProps } from '../DesktopDateTimeRangePicker';
import { MobileDateTimeRangePickerProps } from '../MobileDateTimeRangePicker';
import { ExportedDateTimeRangePickerTabsProps } from '../DateTimeRangePicker/DateTimeRangePickerTabs';
import { ExportedDateTimeRangePickerToolbarProps } from '../DateTimeRangePicker/DateTimeRangePickerToolbar';
import { ExportedPickersRangeCalendarHeaderProps } from '../PickersRangeCalendarHeader';

export interface PickersComponentsPropsList {
  MuiClock: ClockProps<PickerValidDate>;
  MuiClockNumber: ClockNumberProps;
  MuiClockPointer: ClockPointerProps;
  MuiDateCalendar: DateCalendarProps<PickerValidDate>;
  MuiDateField: DateFieldProps<PickerValidDate, any>;
  MuiDatePickerToolbar: ExportedDatePickerToolbarProps;
  MuiDateTimeField: DateTimeFieldProps<PickerValidDate, any>;
  MuiDateTimePickerTabs: DateTimePickerTabsProps;
  MuiDateTimePickerToolbar: ExportedDateTimePickerToolbarProps;
  MuiDayCalendar: DayCalendarProps<PickerValidDate>;
  MuiDayCalendarSkeleton: DayCalendarSkeletonProps;
  MuiDigitalClock: ExportedDigitalClockProps<PickerValidDate>;
  MuiLocalizationProvider: LocalizationProviderProps<PickerValidDate, unknown>;
  MuiMonthCalendar: MonthCalendarProps<PickerValidDate>;
  MuiMultiSectionDigitalClock: MultiSectionDigitalClockProps<PickerValidDate>;
  MuiMultiSectionDigitalClockSection: ExportedMultiSectionDigitalClockSectionProps;
  MuiPickersArrowSwitcher: ExportedPickersArrowSwitcherProps;
  MuiPickersCalendarHeader: ExportedPickersCalendarHeaderProps<PickerValidDate>;
  MuiPickersDay: PickersDayProps<PickerValidDate>;
  MuiPickersFadeTransitionGroup: PickersFadeTransitionGroupProps;
  MuiPickersMonth: ExportedPickersMonthProps;
  MuiPickersPopper: PickerPopperProps;
  MuiPickersSlideTransition: ExportedSlideTransitionProps;
  MuiPickersToolbar: PickersToolbarProps<unknown, DateOrTimeView>;
  MuiPickersToolbarButton: PickersToolbarButtonProps;
  MuiPickersToolbarText: ExportedPickersToolbarTextProps;
  MuiPickersLayout: PickersLayoutProps<unknown, PickerValidDate, DateOrTimeView>;
  MuiPickersYear: ExportedPickersYearProps;
  MuiTimeClock: TimeClockProps<PickerValidDate>;
  MuiTimeField: TimeFieldProps<PickerValidDate, any>;
  MuiTimePickerToolbar: ExportedTimePickerToolbarProps;
  MuiYearCalendar: YearCalendarProps<PickerValidDate>;

  // Date Pickers
  MuiDatePicker: DatePickerProps<PickerValidDate>;
  MuiDesktopDatePicker: DesktopDatePickerProps<PickerValidDate>;
  MuiMobileDatePicker: MobileDatePickerProps<PickerValidDate>;
  MuiStaticDatePicker: StaticDatePickerProps<PickerValidDate>;

  // Time Pickers
  MuiTimePicker: TimePickerProps<PickerValidDate>;
  MuiDesktopTimePicker: DesktopTimePickerProps<PickerValidDate>;
  MuiMobileTimePicker: MobileTimePickerProps<PickerValidDate>;
  MuiStaticTimePicker: StaticTimePickerProps<PickerValidDate>;

  // Date Time Pickers
  MuiDateTimePicker: DateTimePickerProps<PickerValidDate>;
  MuiDesktopDateTimePicker: DesktopDateTimePickerProps<PickerValidDate>;
  MuiMobileDateTimePicker: MobileDateTimePickerProps<PickerValidDate>;
  MuiStaticDateTimePicker: StaticDateTimePickerProps<PickerValidDate>;

  // V7 Picker's TextField
  MuiPickersTextField: PickersTextFieldProps;
  MuiPickersInputBase: PickersInputBaseProps;
  MuiPickersInput: PickersInputProps;
  MuiPickersFilledInput: PickersFilledInputProps;
  MuiPickersOutlinedInput: PickersOutlinedInputProps;
  MuiPickersSectionList: PickersSectionListProps;
}

export interface PickersProComponentsPropsList {
  MuiDateRangeCalendar: DateRangeCalendarProps<PickerValidDate>;
  MuiDateRangePickerDay: DateRangePickerDayProps<PickerValidDate>;
  MuiDateTimeRangePickerTabs: ExportedDateTimeRangePickerTabsProps;
  MuiDateRangePickerToolbar: ExportedDateRangePickerToolbarProps;
  MuiDateTimeRangePickerToolbar: ExportedDateTimeRangePickerToolbarProps;
  MuiPickersRangeCalendarHeader: ExportedPickersRangeCalendarHeaderProps<PickerValidDate>;

  // Multi input range fields
  MuiMultiInputDateRangeField: MultiInputDateRangeFieldProps<PickerValidDate, any>;
  MuiMultiInputDateTimeRangeField: MultiInputDateTimeRangeFieldProps<PickerValidDate, any>;
  MuiMultiInputTimeRangeField: MultiInputTimeRangeFieldProps<PickerValidDate, any>;

  // Single input range fields
  MuiSingleInputDateRangeField: SingleInputDateRangeFieldProps<PickerValidDate, any>;
  MuiSingleInputDateTimeRangeField: SingleInputDateTimeRangeFieldProps<PickerValidDate, any>;
  MuiSingleInputTimeRangeField: SingleInputTimeRangeFieldProps<PickerValidDate, any>;

  // Date Range Pickers
  MuiDateRangePicker: DateRangePickerProps<PickerValidDate, any>;
  MuiDesktopDateRangePicker: DesktopDateRangePickerProps<PickerValidDate, any>;
  MuiMobileDateRangePicker: MobileDateRangePickerProps<PickerValidDate, any>;
  MuiStaticDateRangePicker: StaticDateRangePickerProps<PickerValidDate>;

  // Date Time Range Pickers
  MuiDateTimeRangePicker: DateTimeRangePickerProps<PickerValidDate, any>;
  MuiDesktopDateTimeRangePicker: DesktopDateTimeRangePickerProps<PickerValidDate, any>;
  MuiMobileDateTimeRangePicker: MobileDateTimeRangePickerProps<PickerValidDate, any>;
}

declare module '@mui/material/styles' {
  interface ComponentsPropsList extends PickersComponentsPropsList, PickersProComponentsPropsList {}
}

// disable automatic export
export {};
