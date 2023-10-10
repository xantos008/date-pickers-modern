import { TimezoneProps } from '../../../models';
import {
  Validator,
  validateDateTime,
  BaseDateValidationProps,
  TimeValidationProps,
  DefaultizedProps,
} from '../../../internals';
import { isRangeValid } from '../date-utils';
import { DayRangeValidationProps } from '../../models/dateRange';
import { DateRange } from '../../models/range';
import { DateTimeRangeValidationError } from '../../../models';

export interface DateTimeRangeComponentValidationProps<TDate>
  extends DayRangeValidationProps<TDate>,
    TimeValidationProps<TDate>,
    Required<BaseDateValidationProps<TDate>>,
    DefaultizedProps<TimezoneProps, 'timezone'> {}

export const validateDateTimeRange: Validator<
  DateRange<any>,
  any,
  DateTimeRangeValidationError,
  DateTimeRangeComponentValidationProps<any>
> = ({ props, value, adapter }) => {
  const [start, end] = value;

  const { shouldDisableDate, ...otherProps } = props;

  const dateTimeValidations: DateTimeRangeValidationError = [
    validateDateTime({
      adapter,
      value: start,
      props: {
        ...otherProps,
        shouldDisableDate: (day) => !!shouldDisableDate?.(day, 'start'),
      },
    }),
    validateDateTime({
      adapter,
      value: end,
      props: {
        ...otherProps,
        shouldDisableDate: (day) => !!shouldDisableDate?.(day, 'end'),
      },
    }),
  ];

  if (dateTimeValidations[0] || dateTimeValidations[1]) {
    return dateTimeValidations;
  }

  // for partial input
  if (start === null || end === null) {
    return [null, null];
  }

  if (!isRangeValid(adapter.utils, value)) {
    return ['invalidRange', 'invalidRange'];
  }

  return [null, null];
};
