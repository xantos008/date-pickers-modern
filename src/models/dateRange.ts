import {
  BaseDateValidationProps,
  MakeOptional,
  UseFieldInternalProps,
} from '../internals';
import { PickerValidDate } from '../models';
import { RangeFieldSection, RangeFieldSeparatorProps } from './fields';
import { DateRangeValidationError } from './validation';
import { DateRange } from './range';
import { DayRangeValidationProps } from '../internals/models/dateRange';

export interface UseDateRangeFieldProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
> extends MakeOptional<
      Omit<
        UseFieldInternalProps<
          DateRange<TDate>,
          TDate,
          RangeFieldSection,
          TEnableAccessibleFieldDOMStructure,
          DateRangeValidationError
        >,
        'unstableFieldRef'
      >,
      'format'
    >,
    RangeFieldSeparatorProps,
    DayRangeValidationProps<TDate>,
    BaseDateValidationProps<TDate> {}
