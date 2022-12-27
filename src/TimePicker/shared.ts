import * as React from 'react';
import { useThemeProps } from '@mui/material/styles';
import { Clock } from '../internals/components/icons';
import {
  TimeClockSlotsComponent,
  TimeClockSlotsComponentsProps,
  ExportedTimeClockProps,
} from '../TimeClock/TimeClock';
import { useLocaleText, useUtils } from '../internals/hooks/useUtils';
import { ValidationCommonProps } from '../internals/hooks/validation/useValidation';
import { TimeValidationError } from '../internals/hooks/validation/useTimeValidation';
import { BasePickerProps } from '../internals/models/props/basePickerProps';
import { ExportedDateInputProps } from '../internals/components/PureDateInput';
import { TimeView } from '../internals/models';
import { PickerStateValueManager } from '../internals/hooks/usePickerState';
import { DefaultizedProps } from '../internals/models/helpers';
import { BaseTimeValidationProps } from '../internals/hooks/validation/models';
import {
  TimePickerToolbarProps,
  ExportedTimePickerToolbarProps,
  TimePickerToolbar,
} from './TimePickerToolbar';
import { LocalizedComponent, PickersInputLocaleText } from '../locales/utils/pickersLocaleTextApi';
import { singleItemValueManager } from '../internals/utils/valueManagers';

export interface BaseTimePickerSlotsComponent<TDate> extends TimeClockSlotsComponent {
  /**
   * Custom component for the toolbar rendered above the views.
   * @default TimePickerToolbar
   */
  Toolbar?: React.JSXElementConstructor<TimePickerToolbarProps<TDate>>;
}

export interface BaseTimePickerSlotsComponentsProps extends TimeClockSlotsComponentsProps {
  toolbar?: ExportedTimePickerToolbarProps;
}

export interface BaseTimePickerProps<TDate>
  extends ExportedTimeClockProps<TDate>,
    BasePickerProps<TDate | null, TDate>,
    ValidationCommonProps<TimeValidationError, TDate | null>,
    ExportedDateInputProps<TDate> {
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm?: boolean;
  /**
   * Callback fired on view change.
   * @param {TimeView} view The new view.
   */
  onViewChange?: (view: TimeView) => void;
  /**
   * First view to show.
   * Must be a valid option from `views` list
   * @default 'hours'
   */
  openTo?: TimeView;
  /**
   * Array of views to show.
   * @default ['hours', 'minutes']
   */
  views?: readonly TimeView[];
  /**
   * Overrideable components.
   * @default {}
   */
  components?: BaseTimePickerSlotsComponent<TDate> & { OpenPickerIcon?: any };
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: BaseTimePickerSlotsComponentsProps;
}

export function useTimePickerDefaultizedProps<TDate, Props extends BaseTimePickerProps<TDate>>(
  props: Props,
  name: string,
): LocalizedComponent<
  TDate,
  DefaultizedProps<
    Props,
    'openTo' | 'views' | keyof BaseTimeValidationProps,
    { inputFormat: string }
  >
> {
  // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.
  const themeProps = useThemeProps({ props, name });

  const utils = useUtils<TDate>();
  const localeTextFromContext = useLocaleText<TDate>();
  const ampm = themeProps.ampm ?? utils.is12HourCycleInCurrentLocale();

  const getOpenDialogAriaText = localeTextFromContext.openTimePickerDialogue;

  const localeText = React.useMemo<PickersInputLocaleText<TDate> | undefined>(() => {
    if (themeProps.localeText?.toolbarTitle == null) {
      return themeProps.localeText;
    }

    return {
      ...themeProps.localeText,
      timePickerToolbarTitle: themeProps.localeText.toolbarTitle,
    };
  }, [themeProps.localeText]);

  return {
    ampm,
    openTo: 'hours',
    views: ['hours', 'minutes'],
    acceptRegex: ampm ? /[\dapAP]/gi : /\d/gi,
    disableMaskedInput: false,
    disablePast: false,
    disableFuture: false,
    getOpenDialogAriaText,
    inputFormat: ampm ? utils.formats.fullTime12h : utils.formats.fullTime24h,
    ...themeProps,
    localeText,
    components: {
      OpenPickerIcon: Clock,
      Toolbar: TimePickerToolbar,
      ...themeProps.components,
    },
    componentsProps: {
      ...themeProps.componentsProps,
      toolbar: {
        ampm,
        ampmInClock: themeProps.ampmInClock,
        ...themeProps.componentsProps?.toolbar,
      },
    },
  };
}

// TODO v6: Drop with the legacy pickers
export const timeValueManager: PickerStateValueManager<any, any, TimeValidationError> = {
  ...singleItemValueManager,
  valueReducer: (utils, lastValidValue, newValue) => {
    if (!lastValidValue || !utils.isValid(newValue)) {
      return newValue;
    }

    return utils.mergeDateAndTime(lastValidValue, newValue);
  },
};
