import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';

export interface DateTimePickerToolbarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the date container element. */
  dateContainer: string;
  /** Styles applied to the time container element. */
  timeContainer: string;
  /** Styles applied to the time container if rtl. */
  timeLabelReverse: string;
  /** Styles applied to the separator element. */
  separator: string;
}

export type DateTimePickerToolbarClassKey = keyof DateTimePickerToolbarClasses;

export function getDateTimePickerToolbarUtilityClass(slot: string) {
  return generateUtilityClass('MuiDateTimePickerToolbar', slot);
}

export const dateTimePickerToolbarClasses: DateTimePickerToolbarClasses = generateUtilityClasses(
  'MuiDateTimePickerToolbar',
  ['root', 'dateContainer', 'timeContainer', 'separator', 'timeLabelReverse'],
);
