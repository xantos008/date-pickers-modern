import * as React from 'react';
import PropTypes from 'prop-types';
import {
  BaseTimePickerProps,
  useTimePickerDefaultizedProps,
  timeValueManager,
  BaseTimePickerSlotsComponentsProps,
  BaseTimePickerSlotsComponent,
} from '../TimePicker/shared';
import {
  DesktopWrapper,
  DesktopWrapperProps,
  DesktopWrapperSlotsComponent,
  DesktopWrapperSlotsComponentsProps,
} from '../internals/components/wrappers/DesktopWrapper';
import { CalendarOrClockPicker } from '../internals/components/CalendarOrClockPicker';
import { useTimeValidation } from '../internals/hooks/validation/useTimeValidation';
import { KeyboardDateInput } from '../internals/components/KeyboardDateInput';
import { usePickerState } from '../internals/hooks/usePickerState';
import { DateInputSlotsComponent } from '../internals/components/PureDateInput';

export interface DesktopTimePickerSlotsComponent<TDate>
  extends BaseTimePickerSlotsComponent<TDate>,
    DesktopWrapperSlotsComponent,
    DateInputSlotsComponent {}

export interface DesktopTimePickerSlotsComponentsProps
  extends BaseTimePickerSlotsComponentsProps,
    DesktopWrapperSlotsComponentsProps {}

export interface DesktopTimePickerProps<TDate>
  extends BaseTimePickerProps<TDate>,
    DesktopWrapperProps {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: DesktopTimePickerSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: DesktopTimePickerSlotsComponentsProps;
}

type DesktopTimePickerComponent = (<TDate>(
  props: DesktopTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Time Picker](https://mui.com/x/react-date-pickers/time-picker/)
 *
 * API:
 *
 * - [DesktopTimePicker API](https://mui.com/x/api/date-pickers/desktop-time-picker/)
 */
export const DesktopTimePicker = React.forwardRef(function DesktopTimePicker<TDate>(
  inProps: DesktopTimePickerProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useTimePickerDefaultizedProps<TDate, DesktopTimePickerProps<TDate>>(
    inProps,
    'MuiDesktopTimePicker',
  );

  const validationError = useTimeValidation(props) !== null;
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, timeValueManager);

  const { onChange, value, components, componentsProps, localeText, ...other } = props;

  const DateInputProps = {
    ...inputProps,
    ...other,
    components,
    componentsProps,
    ref,
    validationError,
  };

  return (
    <DesktopWrapper
      {...wrapperProps}
      DateInputProps={DateInputProps}
      KeyboardDateInputComponent={KeyboardDateInput}
      components={components}
      componentsProps={componentsProps}
      localeText={localeText}
    >
      <CalendarOrClockPicker
        {...pickerProps}
        autoFocus
        DateInputProps={DateInputProps}
        components={components}
        componentsProps={componentsProps}
        {...other}
      />
    </DesktopWrapper>
  );
}) as DesktopTimePickerComponent;

DesktopTimePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),
  /**
   * 12h/24h view for hour selection clock.
   * @default `utils.is12HourCycleInCurrentLocale()`
   */
  ampm: PropTypes.bool,
  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,
  children: PropTypes.node,
  /**
   * className applied to the root component.
   */
  className: PropTypes.string,
  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  closeOnSelect: PropTypes.bool,
  /**
   * Overrideable components.
   * @default {}
   */
  components: PropTypes.object,
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true` disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,
  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,
  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,
  /**
   * If `true` disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: PropTypes.bool,
  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @template TDate
   * @param {TDate | null} date The date from which we want to add an aria-text.
   * @param {MuiPickersAdapter<TDate>} utils The utils to manipulate the date.
   * @returns {string} The aria-text to render inside the dialog.
   * @default (date, utils) => `Choose date, selected date is ${utils.format(date, 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,
  ignoreInvalidInputs: PropTypes.bool,
  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,
  /**
   * Format string.
   */
  inputFormat: PropTypes.string,
  InputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  label: PropTypes.node,
  /**
   * Locale for components texts
   */
  localeText: PropTypes.object,
  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,
  /**
   * Maximal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  maxTime: PropTypes.any,
  /**
   * Minimal selectable time.
   * The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.
   */
  minTime: PropTypes.any,
  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,
  /**
   * Callback fired when date is accepted @DateIOType.
   * @template TValue
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: PropTypes.func,
  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   * @template TValue
   * @param {TValue} value The new value.
   * @param {string} keyboardInputValue The current value of the keyboard input.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,
  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   *
   * @template TError, TValue
   * @param {TError} reason The reason why the current value is not valid.
   * @param {TValue} value The invalid value.
   */
  onError: PropTypes.func,
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,
  /**
   * Callback fired on view change.
   * @param {TimeView} view The new view.
   */
  onViewChange: PropTypes.func,
  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,
  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,
  /**
   * First view to show.
   * Must be a valid option from `views` list
   * @default 'hours'
   */
  openTo: PropTypes.oneOf(['hours', 'minutes', 'seconds']),
  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
  /**
   * Make picker read only.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://mui.com/material-ui/api/text-field/#props) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   * @param {MuiTextFieldPropsType} props The props of the input.
   * @returns {React.ReactNode} The node to render as the input.
   */
  renderInput: PropTypes.func.isRequired,
  /**
   * Custom formatter to be passed into Rifm component.
   * @param {string} str The un-formatted string.
   * @returns {string} The formatted string.
   */
  rifmFormatter: PropTypes.func,
  /**
   * Disable specific time.
   * @param {number} timeValue The value to check.
   * @param {TimeView} view The clock type of the timeValue.
   * @returns {boolean} If `true` the time will be disabled.
   */
  shouldDisableTime: PropTypes.func,
  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,
  /**
   * The value of the picker.
   */
  value: PropTypes.any,
  /**
   * Array of views to show.
   * @default ['hours', 'minutes']
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired),
} as any;
