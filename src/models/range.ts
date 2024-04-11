import { PickerValidDate } from '../models';

export type DateRange<TDate extends PickerValidDate> = [TDate | null, TDate | null];

export type NonEmptyDateRange<TDate extends PickerValidDate> = [TDate, TDate];

export type RangePosition = 'start' | 'end';
