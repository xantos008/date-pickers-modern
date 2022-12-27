import {
  useUtils,
  useDefaultDates,
  applyDefaultDate,
  useField,
} from '../internals';
import {
  UseSingleInputDateRangeFieldDefaultizedProps,
  UseSingleInputDateRangeFieldParams,
  UseSingleInputDateRangeFieldProps,
} from './SingleInputDateRangeField.types';
import { rangeValueManager, rangeFieldValueManager } from '../internal/utils/valueManagers';
import { validateDateRange } from '../internal/hooks/validation/useDateRangeValidation';

export const useDefaultizedDateRangeFieldProps = <TDate, AdditionalProps extends {}>(
  props: UseSingleInputDateRangeFieldProps<TDate>,
): UseSingleInputDateRangeFieldDefaultizedProps<TDate, AdditionalProps> => {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();

  return {
    ...props,
    disablePast: props.disablePast ?? false,
    disableFuture: props.disableFuture ?? false,
    format: props.format ?? utils.formats.keyboardDate,
    minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate),
  } as any;
};

export const useSingleInputDateRangeField = <TDate, TChildProps extends {}>({
  props,
  inputRef,
}: UseSingleInputDateRangeFieldParams<TDate, TChildProps>) => {
  const {
    value,
    defaultValue,
    format,
    onChange,
    readOnly,
    onError,
    shouldDisableDate,
    minDate,
    maxDate,
    disableFuture,
    disablePast,
    selectedSections,
    onSelectedSectionsChange,
    ...other
  } = useDefaultizedDateRangeFieldProps<TDate, TChildProps>(props);

  return useField({
    inputRef,
    forwardedProps: other as unknown as TChildProps,
    internalProps: {
      value,
      defaultValue,
      format,
      onChange,
      readOnly,
      onError,
      shouldDisableDate,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      selectedSections,
      onSelectedSectionsChange,
    },
    valueManager: rangeValueManager,
    fieldValueManager: rangeFieldValueManager,
    validator: validateDateRange,
    supportedDateSections: ['year', 'month', 'day'],
  });
};
