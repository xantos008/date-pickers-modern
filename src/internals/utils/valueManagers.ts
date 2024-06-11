import type { PickerValueManager } from '../hooks/usePicker';
import {
  DateValidationError,
  TimeValidationError,
  DateTimeValidationError,
  FieldSection,
  PickerValidDate,
} from '../../models';
import type { FieldValueManager } from '../hooks/useField';
import { areDatesEqual, getTodayDate, replaceInvalidDateByNull } from './date-utils';
import { getDefaultReferenceDate } from './getDefaultReferenceDate';
import {
  createDateStrForV7HiddenInputFromSections,
  createDateStrForV6InputFromSections,
} from '../hooks/useField/useField.utils';
import { splitDateRangeSections, removeLastSeparator } from './date-fields-utils';
import type {
  DateRangeValidationError,
  DateTimeRangeValidationError,
  TimeRangeValidationError,
  RangeFieldSection,
  DateRange,
  RangePosition,
} from '../../models';

export type SingleItemPickerValueManager<
  TValue = any,
  TDate extends PickerValidDate = any,
  TError extends DateValidationError | TimeValidationError | DateTimeValidationError = any,
> = PickerValueManager<TValue, TDate, TError>;

export const singleItemValueManager: SingleItemPickerValueManager = {
  emptyValue: null,
  getTodayValue: getTodayDate,
  getInitialReferenceValue: ({ value, referenceDate, ...params }) => {
    if (value != null && params.utils.isValid(value)) {
      return value;
    }

    if (referenceDate != null) {
      return referenceDate;
    }

    return getDefaultReferenceDate(params);
  },
  cleanValue: replaceInvalidDateByNull,
  areValuesEqual: areDatesEqual,
  isSameError: (a, b) => a === b,
  hasError: (error) => error != null,
  defaultErrorState: null,
  getTimezone: (utils, value) =>
    value == null || !utils.isValid(value) ? null : utils.getTimezone(value),
  setTimezone: (utils, timezone, value) =>
    value == null ? null : utils.setTimezone(value, timezone),
};

export const singleItemFieldValueManager: FieldValueManager<any, any, FieldSection> = {
  updateReferenceValue: (utils, value, prevReferenceValue) =>
    value == null || !utils.isValid(value) ? prevReferenceValue : value,
  getSectionsFromValue: (utils, date, prevSections, getSectionsFromDate) => {
    const shouldReUsePrevDateSections = !utils.isValid(date) && !!prevSections;

    if (shouldReUsePrevDateSections) {
      return prevSections;
    }

    return getSectionsFromDate(date);
  },
  getV7HiddenInputValueFromSections: createDateStrForV7HiddenInputFromSections,
  getV6InputValueFromSections: createDateStrForV6InputFromSections,
  getActiveDateManager: (utils, state) => ({
    date: state.value,
    referenceDate: state.referenceValue,
    getSections: (sections) => sections,
    getNewValuesFromNewActiveDate: (newActiveDate) => ({
      value: newActiveDate,
      referenceValue:
        newActiveDate == null || !utils.isValid(newActiveDate)
          ? state.referenceValue
          : newActiveDate,
    }),
  }),
  parseValueStr: (valueStr, referenceValue, parseDate) =>
    parseDate(valueStr.trim(), referenceValue),
};

export type RangePickerValueManager<
    TValue = [any, any],
    TDate extends PickerValidDate = any,
    TError extends
            | DateRangeValidationError
        | TimeRangeValidationError
        | DateTimeRangeValidationError = any,
> = PickerValueManager<TValue, TDate, TError>;

export const rangeValueManager: RangePickerValueManager = {
  emptyValue: [null, null],
  getTodayValue: (utils, timezone, valueType) => [
    getTodayDate(utils, timezone, valueType),
    getTodayDate(utils, timezone, valueType),
  ],
  getInitialReferenceValue: ({ value, referenceDate: referenceDateProp, ...params }) => {
    const shouldKeepStartDate = value[0] != null && params.utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && params.utils.isValid(value[1]);

    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }

    const referenceDate = referenceDateProp ?? getDefaultReferenceDate(params);

    return [
      shouldKeepStartDate ? value[0] : referenceDate,
      shouldKeepEndDate ? value[1] : referenceDate,
    ];
  },
  cleanValue: (utils, value) =>
      value.map((date) => replaceInvalidDateByNull(utils, date)) as DateRange<any>,
  areValuesEqual: (utils, a, b) =>
      areDatesEqual(utils, a[0], b[0]) && areDatesEqual(utils, a[1], b[1]),
  isSameError: (a, b) => b !== null && a[1] === b[1] && a[0] === b[0],
  hasError: (error) => error[0] != null || error[1] != null,
  defaultErrorState: [null, null],
  getTimezone: (utils, value) => {
    const timezoneStart =
        value[0] == null || !utils.isValid(value[0]) ? null : utils.getTimezone(value[0]);
    const timezoneEnd =
        value[1] == null || !utils.isValid(value[1]) ? null : utils.getTimezone(value[1]);

    if (timezoneStart != null && timezoneEnd != null && timezoneStart !== timezoneEnd) {
      throw new Error('MUI Warn: The timezone of the start and the end date should be the same.');
    }

    return timezoneStart ?? timezoneEnd;
  },
  setTimezone: (utils, timezone, value) => [
    value[0] == null ? null : utils.setTimezone(value[0], timezone),
    value[1] == null ? null : utils.setTimezone(value[1], timezone),
  ],
};

export const getRangeFieldValueManager = <TDate extends PickerValidDate>({
                                                                           dateSeparator = '–',
                                                                         }: {
  dateSeparator: string | undefined;
}): FieldValueManager<DateRange<TDate>, TDate, RangeFieldSection> => ({
  updateReferenceValue: (utils, value, prevReferenceValue) => {
    const shouldKeepStartDate = value[0] != null && utils.isValid(value[0]);
    const shouldKeepEndDate = value[1] != null && utils.isValid(value[1]);

    if (!shouldKeepStartDate && !shouldKeepEndDate) {
      return prevReferenceValue;
    }

    if (shouldKeepStartDate && shouldKeepEndDate) {
      return value;
    }

    if (shouldKeepStartDate) {
      return [value[0], prevReferenceValue[0]];
    }

    return [prevReferenceValue[1], value[1]];
  },
  getSectionsFromValue: (utils, [start, end], fallbackSections, getSectionsFromDate) => {
    const separatedFallbackSections =
        fallbackSections == null
            ? { startDate: null, endDate: null }
            : splitDateRangeSections(fallbackSections);

    const getSections = (
        newDate: any | null,
        fallbackDateSections: RangeFieldSection[] | null,
        position: RangePosition,
    ) => {
      const shouldReUsePrevDateSections = !utils.isValid(newDate) && !!fallbackDateSections;

      if (shouldReUsePrevDateSections) {
        return fallbackDateSections;
      }

      const sections = getSectionsFromDate(newDate);
      return sections.map((section, sectionIndex) => {
        if (sectionIndex === sections.length - 1 && position === 'start') {
          return {
            ...section,
            dateName: position,
            // TODO: Check if RTL still works
            endSeparator: `${section.endSeparator} ${dateSeparator} `,
          };
        }

        return {
          ...section,
          dateName: position,
        };
      });
    };

    return [
      ...getSections(start, separatedFallbackSections.startDate, 'start'),
      ...getSections(end, separatedFallbackSections.endDate, 'end'),
    ];
  },
  getV7HiddenInputValueFromSections: (sections) => {
    const dateRangeSections = splitDateRangeSections(sections);
    return createDateStrForV7HiddenInputFromSections([
      ...dateRangeSections.startDate,
      ...dateRangeSections.endDate,
    ]);
  },
  getV6InputValueFromSections: (sections, localizedDigits, isRtl) => {
    const dateRangeSections = splitDateRangeSections(sections);
    return createDateStrForV6InputFromSections(
        [...dateRangeSections.startDate, ...dateRangeSections.endDate],
        localizedDigits,
        isRtl,
    );
  },
  parseValueStr: (valueStr, referenceValue, parseDate) => {
    // TODO: Improve because it would not work if some section have the same separator as the dateSeparator.
    const [startStr, endStr] = valueStr.split(dateSeparator);

    return [startStr, endStr].map((dateStr, index) => {
      if (dateStr == null) {
        return null;
      }

      return parseDate(dateStr.trim(), referenceValue[index]!);
    }) as DateRange<any>;
  },
  getActiveDateManager: (utils, state, activeSection) => {
    const index = activeSection.dateName === 'start' ? 0 : 1;

    const updateDateInRange = (newDate: TDate | null, prevDateRange: DateRange<TDate>) =>
        (index === 0 ? [newDate, prevDateRange[1]] : [prevDateRange[0], newDate]) as DateRange<TDate>;

    return {
      date: state.value[index],
      referenceDate: state.referenceValue[index]!,
      getSections: (sections) => {
        const dateRangeSections = splitDateRangeSections(sections);
        if (index === 0) {
          return removeLastSeparator(dateRangeSections.startDate);
        }

        return dateRangeSections.endDate;
      },
      getNewValuesFromNewActiveDate: (newActiveDate) => ({
        value: updateDateInRange(newActiveDate, state.value),
        referenceValue:
            newActiveDate == null || !utils.isValid(newActiveDate)
                ? state.referenceValue
                : updateDateInRange(newActiveDate, state.referenceValue),
      }),
    };
  },
});
