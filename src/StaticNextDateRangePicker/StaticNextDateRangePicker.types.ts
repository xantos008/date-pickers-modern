import {DateView, MakeOptional} from '../internals';
import {
  StaticRangeOnlyPickerProps,
  UseStaticRangePickerSlotsComponent,
  UseStaticRangePickerSlotsComponentsProps,
} from '../internal/hooks/useStaticRangePicker';
import {
  BaseNextDateRangePickerProps,
  BaseNextDateRangePickerSlotsComponent,
  BaseNextDateRangePickerSlotsComponentsProps,
} from '../NextDateRangePicker/shared';

export interface StaticNextDateRangePickerSlotsComponent<TDate>
  extends BaseNextDateRangePickerSlotsComponent<TDate>,
    UseStaticRangePickerSlotsComponent<TDate, DateView> {}

export interface StaticNextDateRangePickerSlotsComponentsProps<TDate>
  extends BaseNextDateRangePickerSlotsComponentsProps<TDate>,
    UseStaticRangePickerSlotsComponentsProps<TDate, DateView> {}

export interface StaticNextDateRangePickerProps<TDate>
  extends BaseNextDateRangePickerProps<TDate>,
    MakeOptional<StaticRangeOnlyPickerProps, 'displayStaticWrapperAs'> {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: StaticNextDateRangePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: StaticNextDateRangePickerSlotsComponentsProps<TDate>;
}
