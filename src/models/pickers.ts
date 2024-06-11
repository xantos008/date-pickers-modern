import type { PickersShortcutsItemContext } from '../PickersShortcuts';
import { Moment as MomentJalaali } from "moment-jalaali";
import { Moment as MomentHijri } from 'moment-hijri';
import { Moment } from "moment";
import { DateTime } from "luxon";

export interface PickerChangeHandlerContext<TError> {
  validationError: TError;
  /**
   * Shortcut causing this `onChange` call.
   * If the call has not been caused by a shortcut selection, this property will be `undefined`.
   */
  shortcut?: PickersShortcutsItemContext;
}

export interface PickerValidDateLookup {
  moment: Moment;
  'moment-jalaali': MomentJalaali;
  'moment-hijri': MomentHijri;
  luxon: DateTime;
  'date-fns': Date;
  'date-fns-jalali': Date;
  null: null;
  undefined: undefined;
}

export type PickerValidDate = PickerValidDateLookup[keyof PickerValidDateLookup];
