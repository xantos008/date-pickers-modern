# date-pickers-modern

This package is date and time picker components.

## Installation

Install the package in your project directory with:

```sh
npm install date-pickers-modern
```

## Usage

```sh
asd
```

## Props

 Name | Type                      | Default | Description |
:---  |:--------------------------| :--- | :--- |
onChange* | func |	| Callback fired when the value (the selected date range) changes @DateIOType. |
renderInput* | func |	| The `renderInput` prop allows you to customize the rendered input. The `startProps` and `endProps` arguments of this render prop contains props of [TextField](https://mui.com/material-ui/api/text-field/#props), that you need to forward to the range start/end inputs respectively. Pay specific attention to the `ref` and `inputProps` keys. <br /><br /> **Signature:** <br /> `function(startProps: MuiTextFieldProps, endProps: MuiTextFieldProps) => React.ReactElement` <br /> <br />_startProps_: Props that you need to forward to the range start input.<br />_endProps_: Props that you need to forward to the range end input.<br />_returns_ (React.ReactElement): The range input to render.
value | `Array<any>` |  | The value of the picker.
acceptRegex | RegExp | 	/\dap/gi | Regular expression to detect "accepted" symbols.
calendars | `Enum:[1,2,3] ` | 2 | The number of calendars that render on **desktop**.
className | string |  | className applied to the root component.
closeOnSelect | bool | `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop). | If `true` the popup or dialog will immediately close after submitting full date.
components | object | {} | Overrideable components.
componentsProps | object | {} | The props used for each component slot.
dayOfWeekFormatter | func | (day) => day.charAt(0).toUpperCase() | Formats the day of week displayed in the calendar header.<br /><br />**Signature:**<br/>`function(day: string) => string`<br/>_day_: The day of week provided by the adapter's method `getWeekdays`.<br/>_returns_ (string): The name to display.
defaultCalendarMonth | any |  | Default calendar month displayed when `value={null}`.
desktopModeMediaQuery | string | '@media (pointer: fine)' | CSS media query when `Mobile` mode will be changed to `Desktop`.
disableAutoMonthSwitching | bool | false | If `true`, after selecting `start` date calendar will not automatically switch to the month of `end` date.
disabled | bool | false | If `true`, the picker and text field are disabled.
disableFuture | bool | false | If `true` disable values before the current date for date components, time for time components and both for date time components.
disableHighlightToday | bool | false | If `true`, today's date is rendering without highlighting with circle.
disableMaskedInput | bool | false | Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
disableOpenPicker | bool | false | Do not render open picker button (renders only text field with validation).
disablePast | bool | false | If `true` disable values after the current date for date components, time for time components and both for date time components.
displayWeekNumber | bool | false | If `true`, the week number will be display in the calendar.
fixedWeekNumber | number | undefined | Calendar will show more weeks in order to match this value. Put it to 6 for having fix number of week in Gregorian calendars
getOpenDialogAriaText | func | (date, utils) => `Choose date, selected date is ${utils.format(date, 'fullDate')}` | Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType <br /><br /> **Signature**:<br />`function(date: TDate or null, utils: MuiPickersAdapter<TDate>) => string`<br />_date_: The date from which we want to add an aria-text.<br />_utils_: The utils to manipulate the date.<br />_returns_ (string): The aria-text to render inside the dialog.
InputAdornmentProps | object |  | Props to pass to keyboard input adornment.
inputFormat | string |  | Format string.
inputRef | func OR { current?: object } |  | Pass a ref to the input element.
loading | bool  | false | If `true` renders `LoadingComponent` in calendar instead of calendar view. Can be used to preload information and show it in calendar.
localeText | object |  | Locale for components texts
mask | string | `__/__/____` | Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or` __/__/____ __:__ _M`).
maxDate | any |  | Maximal selectable date.
minDate | any |  | Minimal selectable date.
onAccept | func |  | Callback fired when date is accepted @DateIOType.<br /><br />**Signature**:<br />`function(value: TValue) => void`<br />_value_: The value that was just accepted.
onClose | func |  | Callback fired when the popup requests to be closed. Use in controlled mode (see open).
onError | func |  | Callback that fired when input value or new `value` prop validation returns new validation error (or value is valid after error). In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state. This can be used to render appropriate form error.<br />[Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.<br /><br />**Signature**:<br />`function(reason: TError, value: TValue) => void`<br />_reason_: The reason why the current value is not valid.<br />_value_: The invalid value.
onMonthChange | func |  | Callback firing on month change @DateIOType.<br /><br />**Signature**:<br />`function(month: TDate) => void OR Promise`<br />_month_: The new month.<br />_returns_ (void OR Promise): -
onOpen | func |  | Callback fired when the popup requests to be opened. Use in controlled mode (see open).
open | bool | false | Control the popup or dialog open state.
OpenPickerButtonProps | object |  | Props to pass to keyboard adornment button.
readOnly | bool | false | Make picker read only.
reduceAnimations | bool | typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent) | Disable heavy animations.
renderLoading | func | `() => <span data-mui-test="loading-progress">...</span>` | Component displaying when passed `loading` true.<br /><br />**Signature**:<br />`function() => React.ReactNode`<br /><br />_returns_ (React.ReactNode): The node to render when loading.
rifmFormatter | func |  | Custom formatter to be passed into Rifm component.<br /><br />**Signature**:<br />`function(str: string) => string`<br />_str_: The un-formatted string.<br />_returns_ (string): The formatted string.
shouldDisableDate | func |  | Disable specific date. @DateIOType<br /><br />**Signature**:<br />`function(day: TDate, position: string) => boolean`<br />_day_: The date to test.<br />_position_: The date to test, 'start' or 'end'.<br />_returns_ (boolean): Returns true if the date should be disabled.
shouldDisableMonth | func |  | Disable specific month.<br /><br />**Signature**:<br />`function(month: TDate) => boolean`<br />_month_: The month to test.<br />_returns_ (boolean): If true the month will be disabled.
shouldDisableYear | func |  | Disable specific year.<br /><br />**Signature**:<br />`function(year: TDate) => boolean`<br />_year_: The year to test.<br />_returns_ (boolean): If true the year will be disabled.
showDaysOutsideCurrentMonth | bool | false | If `true`, days that have `outsideCurrentMonth={true}` are displayed.
showToolbar | bool | false | If `true`, show the toolbar even in desktop mode.
sx | Array<func \| object \| bool> \| func \| object |  | The system prop that allows defining system overrides as well as additional CSS styles. See the [`sx` page](https://mui.com/system/getting-started/the-sx-prop/) for more details.


