import * as React from 'react';
import {
  ExportedPickersViewLayoutSlotsComponent,
  ExportedPickersViewLayoutSlotsComponentsProps,
  DateOrTimeView,
  BaseNextPickerProps,
  UsePickerParams,
  ExportedBaseToolbarProps,
  StaticOnlyPickerProps,
} from '@mui/x-date-pickers/internals';
import { DateRange } from '../../models/range';

export interface UseStaticRangePickerSlotsComponent
  extends ExportedPickersViewLayoutSlotsComponent {}

export interface UseStaticRangePickerSlotsComponentsProps<TDate, TView extends DateOrTimeView>
  extends ExportedPickersViewLayoutSlotsComponentsProps<DateRange<TDate>, TView> {
  toolbar?: ExportedBaseToolbarProps;
}

export interface StaticRangeOnlyPickerProps extends StaticOnlyPickerProps {}

export interface UseStaticRangePickerProps<
  TDate,
  TView extends DateOrTimeView,
  TError,
  TExternalProps extends UseStaticRangePickerProps<TDate, TView, any, TExternalProps>,
> extends BaseNextPickerProps<DateRange<TDate>, TDate, TView, TError, TExternalProps, {}>,
    StaticRangeOnlyPickerProps {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: UseStaticRangePickerSlotsComponent;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: UseStaticRangePickerSlotsComponentsProps<TDate, TView>;
}

export interface UseStaticRangePickerParams<
  TDate,
  TView extends DateOrTimeView,
  TExternalProps extends UseStaticRangePickerProps<TDate, TView, any, TExternalProps>,
> extends Pick<
    UsePickerParams<DateRange<TDate>, TDate, TView, TExternalProps, {}>,
    'valueManager' | 'validator'
  > {
  props: TExternalProps;
  /**
   * Ref to pass to the root element
   */
  ref: React.Ref<HTMLDivElement> | undefined;
}
