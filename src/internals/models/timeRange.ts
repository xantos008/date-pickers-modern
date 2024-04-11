import {
  BaseTimeValidationProps,
  TimeValidationProps,
  MakeOptional,
  UseFieldInternalProps,
} from '../../internals';
import { PickerValidDate } from '../../models';
import {
  TimeRangeValidationError,
  RangeFieldSection,
  DateRange,
  RangeFieldSeparatorProps,
} from '../../models';

export interface UseTimeRangeFieldProps<
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean,
> extends MakeOptional<
      Omit<
        UseFieldInternalProps<
          DateRange<TDate>,
          TDate,
          RangeFieldSection,
          TEnableAccessibleFieldDOMStructure,
          TimeRangeValidationError
        >,
        'unstableFieldRef'
      >,
      'format'
    >,
    RangeFieldSeparatorProps,
    TimeValidationProps<TDate>,
    BaseTimeValidationProps {
  /**
   * 12h/24h view for hour selection clock.
   * @default utils.is12HourCycleInCurrentLocale()
   */
  ampm?: boolean;
}
