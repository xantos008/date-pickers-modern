import * as React from 'react';
import { PickersInputLocaleText } from '@mui/x-date-pickers';
import {
  DateOrTimeView,
  onSpaceOrEnter,
  useLocaleText,
  UsePickerResponse,
  WrapperVariant,
} from '@mui/x-date-pickers/internals';
import { DateRange, RangePosition } from '../models';

interface UseRangePickerFieldParams<TDate, TView extends DateOrTimeView>
  extends Pick<UsePickerResponse<DateRange<TDate>, TView, any>, 'open' | 'actions'> {
  wrapperVariant: WrapperVariant;
  readOnly?: boolean;
  disabled?: boolean;
  disableOpenPicker?: boolean;
  onBlur?: () => void;
  rangePosition: RangePosition;
  onRangePositionChange: (newPosition: RangePosition) => void;
  localeText: PickersInputLocaleText<TDate> | undefined;
}

export const useRangePickerInputProps = <TDate, TView extends DateOrTimeView>({
  wrapperVariant,
  open,
  actions,
  readOnly,
  disabled,
  disableOpenPicker,
  onBlur,
  rangePosition,
  onRangePositionChange,
  localeText: inLocaleText,
}: UseRangePickerFieldParams<TDate, TView>) => {
  const localeText = useLocaleText<TDate>();
  const startRef = React.useRef<HTMLInputElement>(null);
  const endRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    if (rangePosition === 'start') {
      startRef.current?.focus();
    } else if (rangePosition === 'end') {
      endRef.current?.focus();
    }
  }, [rangePosition, open]);

  const openRangeStartSelection = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
    onRangePositionChange('start');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };

  const openRangeEndSelection = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
    onRangePositionChange('end');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen();
    }
  };

  const focusOnRangeStart = () => {
    if (open) {
      onRangePositionChange('start');
    }
  };

  const focusOnRangeEnd = () => {
    if (open) {
      onRangePositionChange('end');
    }
  };

  const readOnlyInput = readOnly ?? wrapperVariant === 'mobile';

  const startInputProps = {
    inputRef: startRef,
    label: inLocaleText?.start ?? localeText.start,
    onKeyDown: onSpaceOrEnter(openRangeStartSelection),
    onFocus: focusOnRangeStart,
    focused: open ? rangePosition === 'start' : undefined,
    // registering `onClick` listener on the root element as well to correctly handle cases where user is clicking on `label`
    // which has `pointer-events: none` and due to DOM structure the `input` does not catch the click event
    ...(!readOnly && !disabled && { onClick: openRangeStartSelection }),
    readOnly: readOnlyInput,
    disabled,
  };

  const endInputProps = {
    inputRef: endRef,
    label: inLocaleText?.end ?? localeText.end,
    onKeyDown: onSpaceOrEnter(openRangeEndSelection),
    onFocus: focusOnRangeEnd,
    focused: open ? rangePosition === 'end' : undefined,
    // registering `onClick` listener on the root element as well to correctly handle cases where user is clicking on `label`
    // which has `pointer-events: none` and due to DOM structure the `input` does not catch the click event
    ...(!readOnly && !disabled && { onClick: openRangeEndSelection }),
    readOnly: readOnlyInput,
    disabled,
  };

  const rootProps = {
    onBlur,
  };

  return { startInput: startInputProps, endInput: endInputProps, root: rootProps };
};
