import { MakeOptional } from '../internals';
import {
  UseMobileRangePickerSlotsComponent,
  UseMobileRangePickerSlotsComponentsProps,
  MobileRangeOnlyPickerProps,
} from '../internal/hooks/useMobileRangePicker';
import {
  BaseNextDateRangePickerProps,
  BaseNextDateRangePickerSlotsComponent,
  BaseNextDateRangePickerSlotsComponentsProps,
} from '../NextDateRangePicker/shared';

export interface MobileNextDateRangePickerSlotsComponent<TDate>
  extends BaseNextDateRangePickerSlotsComponent<TDate>,
    MakeOptional<UseMobileRangePickerSlotsComponent<TDate, 'day'>, 'Field'> {}

export interface MobileNextDateRangePickerSlotsComponentsProps<TDate>
  extends BaseNextDateRangePickerSlotsComponentsProps<TDate>,
    UseMobileRangePickerSlotsComponentsProps<TDate, 'day'> {}

export interface MobileNextDateRangePickerProps<TDate>
  extends BaseNextDateRangePickerProps<TDate>,
    MobileRangeOnlyPickerProps<TDate> {
  /**
   * The number of calendars to render on **desktop**.
   * @default 2
   */
  calendars?: 1 | 2 | 3;
  /**
   * Overrideable components.
   * @default {}
   */
  components?: MobileNextDateRangePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: MobileNextDateRangePickerSlotsComponentsProps<TDate>;
}
