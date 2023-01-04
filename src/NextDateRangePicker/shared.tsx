import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { LocalizedComponent, PickersInputLocaleText } from "../locales";
import {
  DefaultizedProps,
  useDefaultDates,
  useUtils,
  applyDefaultDate,
  BaseDateValidationProps,
  BaseNextPickerInputProps,
  PickerViewRendererLookup, DateView,
} from '../internals';
import { DateRangeValidationError } from '../internal/hooks/validation/useDateRangeValidation';
import { DateRange } from '../internal/models';
import {
  DateRangeCalendarSlotsComponent,
  DateRangeCalendarSlotsComponentsProps,
  ExportedDateRangeCalendarProps,
} from '../DateRangeCalendar';
import {
  DateRangePickerToolbar,
  DateRangePickerToolbarProps,
  ExportedDateRangePickerToolbarProps,
} from '../DateRangePicker/DateRangePickerToolbar';
import { DateRangeViewRendererProps } from '../dateRangeViewRenderers';
import {applyDefaultViewProps} from "../internals/utils/views";

export interface BaseNextDateRangePickerSlotsComponent<TDate>
  extends DateRangeCalendarSlotsComponent<TDate> {
  /**
   * Custom component for the toolbar rendered above the views.
   * @default DateTimePickerToolbar
   */
  Toolbar?: React.JSXElementConstructor<DateRangePickerToolbarProps<TDate>>;
}

export interface BaseNextDateRangePickerSlotsComponentsProps<TDate>
  extends DateRangeCalendarSlotsComponentsProps<TDate> {
  toolbar?: ExportedDateRangePickerToolbarProps;
}

export interface BaseNextDateRangePickerProps<TDate>
  extends Omit<
      BaseNextPickerInputProps<DateRange<TDate>, TDate, 'day', DateRangeValidationError>,
      'view' | 'views' | 'openTo' | 'onViewChange' | 'orientation'
    >,
    ExportedDateRangeCalendarProps<TDate>,
    BaseDateValidationProps<TDate> {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: BaseNextDateRangePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: BaseNextDateRangePickerSlotsComponentsProps<TDate>;
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers?: Partial<
    PickerViewRendererLookup<DateRange<TDate>, DateView, DateRangeViewRendererProps<TDate, DateView>, {}>
  >;
}

type UseNextDateRangePickerDefaultizedProps<
  TDate,
  Props extends BaseNextDateRangePickerProps<TDate>,
> = LocalizedComponent<TDate, DefaultizedProps<Props, keyof BaseDateValidationProps<TDate>>>;

export function useNextDateRangePickerDefaultizedProps<
  TDate,
  Props extends BaseNextDateRangePickerProps<TDate>,
>(props: Props, name: string): UseNextDateRangePickerDefaultizedProps<TDate, Props> {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();
  const themeProps = useThemeProps({
    props,
    name,
  });

  const localeText = React.useMemo<PickersInputLocaleText<TDate> | undefined>(() => {
    if (themeProps.localeText?.toolbarTitle == null) {
      return themeProps.localeText;
    }

    return {
      ...themeProps.localeText,
      dateRangePickerToolbarTitle: themeProps.localeText.toolbarTitle,
    };
  }, [themeProps.localeText]);

  return {
    ...themeProps,
    localeText,
    ...applyDefaultViewProps({
      views: themeProps.views,
      openTo: themeProps.openTo,
      defaultViews: ['year', 'day'],
      defaultOpenTo: 'day',
    }),
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate),
    components: { Toolbar: DateRangePickerToolbar, ...themeProps.components },
  };
}
