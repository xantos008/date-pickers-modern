import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import TextField from '@mui/material/TextField';
import { UseFieldInternalProps } from '../internals/hooks/useField';
import { DateTimeValidationError } from '../internals/hooks/validation/useDateTimeValidation';
import { DefaultizedProps, MakeOptional } from '../internals/models/helpers';
import {
  BaseDateValidationProps,
  BaseTimeValidationProps,
  DayValidationProps,
  MonthValidationProps,
  TimeValidationProps,
  YearValidationProps,
} from '../internals/hooks/validation/models';
import { FieldsTextFieldProps } from '../internals';

export interface UseDateTimeFieldParams<TDate, TChildProps extends {}> {
  props: UseDateTimeFieldComponentProps<TDate, TChildProps>;
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface UseDateTimeFieldProps<TDate>
  extends MakeOptional<UseFieldInternalProps<TDate | null, DateTimeValidationError>, 'format'>,
    DayValidationProps<TDate>,
    MonthValidationProps<TDate>,
    YearValidationProps<TDate>,
    BaseDateValidationProps<TDate>,
    TimeValidationProps<TDate>,
    BaseTimeValidationProps {
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm?: boolean;
  /**
   * Minimal selectable moment of time with binding to date, to set min time in each day use `minTime`.
   */
  minDateTime?: TDate;
  /**
   * Maximal selectable moment of time with binding to date, to set max time in each day use `maxTime`.
   */
  maxDateTime?: TDate;
}

export type UseDateTimeFieldDefaultizedProps<TDate> = DefaultizedProps<
  UseDateTimeFieldProps<TDate>,
  keyof BaseDateValidationProps<TDate> | keyof BaseTimeValidationProps | 'format'
>;

export type UseDateTimeFieldComponentProps<TDate, TChildProps extends {}> = Omit<
  TChildProps,
  keyof UseDateTimeFieldProps<TDate>
> &
  UseDateTimeFieldProps<TDate>;

export interface DateTimeFieldProps<TDate>
  extends UseDateTimeFieldComponentProps<TDate, FieldsTextFieldProps> {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: DateTimeFieldSlotsComponent;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: DateTimeFieldSlotsComponentsProps<TDate>;
}

export type DateTimeFieldOwnerState<TDate> = DateTimeFieldProps<TDate>;

export interface DateTimeFieldSlotsComponent {
  /**
   * Input rendered.
   * @default TextField
   */
  Input?: React.ElementType;
}

export interface DateTimeFieldSlotsComponentsProps<TDate> {
  input?: SlotComponentProps<typeof TextField, {}, DateTimeFieldOwnerState<TDate>>;
}
