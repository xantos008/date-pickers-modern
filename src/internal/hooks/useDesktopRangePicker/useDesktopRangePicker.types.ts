import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SlotComponentProps } from '@mui/base/utils';
import {
  ExportedPickersLayoutSlotsComponent,
  ExportedPickersLayoutSlotsComponentsProps,
} from '../../../PickersLayout/PickersLayout.types';
import {
  DateOrTimeView,
  UsePickerParams,
  BaseNextPickerProps,
  PickersPopperSlotsComponent,
  PickersPopperSlotsComponentsProps,
  ExportedBaseToolbarProps,
  DesktopOnlyPickerProps,
  UsePickerViewsProps,
} from '../../../internals';
import { DateRange, RangePositionProps } from '../../models';
import { BaseMultiInputFieldProps } from '../../models/fields';

export interface UseDesktopRangePickerSlotsComponent<TDate, TView extends DateOrTimeView>
  extends PickersPopperSlotsComponent,
    ExportedPickersLayoutSlotsComponent<DateRange<TDate>, TView> {
  Field: React.ElementType;
  FieldRoot?: React.ElementType<StackProps>;
  FieldSeparator?: React.ElementType<TypographyProps>;
  Input?: React.ElementType<TextFieldProps>;
}

export interface UseDesktopRangePickerSlotsComponentsProps<TDate, TView extends DateOrTimeView>
  // TODO v6: Remove `Pick` once `PickerPoppers` does not handle the layouting parts
  extends Pick<
      PickersPopperSlotsComponentsProps,
      'desktopPaper' | 'desktopTransition' | 'desktopTrapFocus' | 'popper' | 'paperContent'
    >,
    ExportedPickersLayoutSlotsComponentsProps<DateRange<TDate>, TView> {
  field?: SlotComponentProps<
    React.ElementType<BaseMultiInputFieldProps<DateRange<TDate>, unknown>>,
    {},
    unknown
  >;
  fieldRoot?: SlotComponentProps<typeof Stack, {}, unknown>;
  fieldSeparator?: SlotComponentProps<typeof Typography, {}, unknown>;
  input?: SlotComponentProps<typeof TextField, {}, unknown>;
  toolbar?: ExportedBaseToolbarProps;
}

export interface DesktopRangeOnlyPickerProps<TDate> extends DesktopOnlyPickerProps<TDate> {}

export interface UseDesktopRangePickerProps<
  TDate,
  TView extends DateOrTimeView,
  TError,
  TExternalProps extends UsePickerViewsProps<any, TView, any, any>,
> extends DesktopRangeOnlyPickerProps<TDate>,
    BaseNextPickerProps<
      DateRange<TDate>,
      TDate,
      TView,
      TError,
      TExternalProps,
      DesktopRangePickerAdditionalViewProps
    > {
  /**
   * Overrideable components.
   * @default {}
   */
  components: UseDesktopRangePickerSlotsComponent<TDate, TView>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: UseDesktopRangePickerSlotsComponentsProps<TDate, TView>;
}

export interface DesktopRangePickerAdditionalViewProps extends RangePositionProps {}

export interface UseDesktopRangePickerParams<
  TDate,
  TView extends DateOrTimeView,
  TExternalProps extends UseDesktopRangePickerProps<TDate, TView, any, TExternalProps>,
> extends Pick<
    UsePickerParams<
      DateRange<TDate>,
      TDate,
      TView,
      TExternalProps,
      DesktopRangePickerAdditionalViewProps
    >,
    'valueManager' | 'validator'
  > {
  props: TExternalProps;
}
