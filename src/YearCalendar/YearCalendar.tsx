import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SxProps, useTheme } from '@mui/system';
import { styled, useThemeProps, Theme } from '@mui/material/styles';
import {
  unstable_useForkRef as useForkRef,
  unstable_composeClasses as composeClasses,
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
} from '@mui/utils';
import { PickersYear } from './PickersYear';
import { useUtils, useNow, useDefaultDates } from '../internals/hooks/useUtils';
import { WrapperVariantContext } from '../internals/components/wrappers/WrapperVariantContext';
import { YearCalendarClasses, getYearCalendarUtilityClass } from './yearCalendarClasses';
import { BaseDateValidationProps, YearValidationProps } from '../internals/hooks/validation/models';
import { DefaultizedProps } from '../internals/models/helpers';
import { applyDefaultDate } from '../internals/utils/date-utils';

const useUtilityClasses = (ownerState: YearCalendarProps<any>) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getYearCalendarUtilityClass, classes);
};

function useYearCalendarDefaultizedProps<TDate>(
  props: YearCalendarProps<TDate>,
  name: string,
): DefaultizedProps<
  YearCalendarProps<TDate>,
  'minDate' | 'maxDate' | 'disableFuture' | 'disablePast'
> {
  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();
  const themeProps = useThemeProps({
    props,
    name,
  });

  return {
    disablePast: false,
    disableFuture: false,
    ...themeProps,
    minDate: applyDefaultDate(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: applyDefaultDate(utils, themeProps.maxDate, defaultDates.maxDate),
  };
}

const YearCalendarRoot = styled('div', {
  name: 'MuiYearCalendar',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: YearCalendarProps<any> }>({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  height: '100%',
  padding: '0 4px',
  width: 320,
  maxHeight: 304,
});

export interface YearCalendarProps<TDate>
  extends YearValidationProps<TDate>,
    BaseDateValidationProps<TDate> {
  autoFocus?: boolean;
  /**
   * className applied to the root element.
   */
  className?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<YearCalendarClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /** If `true` picker is disabled */
  disabled?: boolean;
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value?: TDate | null;
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue?: TDate | null;
  /**
   * Callback fired when the value changes.
   * @template TDate
   * @param {TDate | null} value The new value.
   */
  onChange?: (value: TDate) => void;
  /** If `true` picker is readonly */
  readOnly?: boolean;
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday?: boolean;
  onYearFocus?: (year: number) => void;
  hasFocus?: boolean;
  onFocusedViewChange?: (hasFocus: boolean) => void;
}

type YearCalendarComponent = (<TDate>(props: YearCalendarProps<TDate>) => JSX.Element) & {
  propTypes?: any;
};

export const YearCalendar = React.forwardRef(function YearCalendar<TDate>(
  inProps: YearCalendarProps<TDate>,
  ref: React.Ref<HTMLDivElement>,
) {
  const now = useNow<TDate>();
  const theme = useTheme();
  const utils = useUtils<TDate>();
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const props = useYearCalendarDefaultizedProps(inProps, 'MuiYearCalendar');
  const {
    autoFocus,
    className,
    value: valueProp,
    defaultValue,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    onChange,
    readOnly,
    shouldDisableYear,
    disableHighlightToday,
    onYearFocus,
    hasFocus,
    onFocusedViewChange,
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const [value, setValue] = useControlled({
    name: 'YearCalendar',
    state: 'value',
    controlled: valueProp,
    default: defaultValue ?? null,
  });

  const selectedDateOrStartOfYear = React.useMemo(
    () => value ?? utils.startOfYear(now),
    [now, utils, value],
  );

  const todayYear = React.useMemo(() => utils.getYear(now), [utils, now]);
  const selectedYear = React.useMemo(() => {
    if (value != null) {
      return utils.getYear(value);
    }

    if (disableHighlightToday) {
      return null;
    }

    return utils.getYear(now);
  }, [now, value, utils, disableHighlightToday]);
  const [focusedYear, setFocusedYear] = React.useState(() => selectedYear || todayYear);

  const [internalHasFocus, setInternalHasFocus] = useControlled({
    name: 'YearCalendar',
    state: 'hasFocus',
    controlled: hasFocus,
    default: autoFocus ?? false,
  });

  const changeHasFocus = useEventCallback((newHasFocus: boolean) => {
    setInternalHasFocus(newHasFocus);

    if (onFocusedViewChange) {
      onFocusedViewChange(newHasFocus);
    }
  });

  const isYearDisabled = useEventCallback((dateToValidate: TDate) => {
    if (disablePast && utils.isBeforeYear(dateToValidate, now)) {
      return true;
    }
    if (disableFuture && utils.isAfterYear(dateToValidate, now)) {
      return true;
    }
    if (minDate && utils.isBeforeYear(dateToValidate, minDate)) {
      return true;
    }
    if (maxDate && utils.isAfterYear(dateToValidate, maxDate)) {
      return true;
    }
    if (shouldDisableYear && shouldDisableYear(dateToValidate)) {
      return true;
    }
    return false;
  });

  const handleYearSelection = useEventCallback((event: React.MouseEvent, year: number) => {
    if (readOnly) {
      return;
    }

    const newDate = utils.setYear(selectedDateOrStartOfYear, year);
    setValue(newDate);
    onChange?.(newDate);
  });

  const focusYear = useEventCallback((year: number) => {
    if (!isYearDisabled(utils.setYear(selectedDateOrStartOfYear, year))) {
      setFocusedYear(year);
      changeHasFocus(true);
      onYearFocus?.(year);
    }
  });

  React.useEffect(() => {
    setFocusedYear((prevFocusedYear) =>
      selectedYear !== null && prevFocusedYear !== selectedYear ? selectedYear : prevFocusedYear,
    );
  }, [selectedYear]);

  const handleKeyDown = useEventCallback((event: React.KeyboardEvent, year: number) => {
    const yearsInRow = wrapperVariant === 'desktop' ? 4 : 3;

    switch (event.key) {
      case 'ArrowUp':
        focusYear(year - yearsInRow);
        event.preventDefault();
        break;
      case 'ArrowDown':
        focusYear(year + yearsInRow);
        event.preventDefault();
        break;
      case 'ArrowLeft':
        focusYear(year + (theme.direction === 'ltr' ? -1 : 1));
        event.preventDefault();
        break;
      case 'ArrowRight':
        focusYear(year + (theme.direction === 'ltr' ? 1 : -1));
        event.preventDefault();
        break;
      default:
        break;
    }
  });

  const handleYearFocus = useEventCallback((event: React.FocusEvent, year: number) => {
    focusYear(year);
  });

  const handleYearBlur = useEventCallback((event: React.FocusEvent, year: number) => {
    if (focusedYear === year) {
      changeHasFocus(false);
    }
  });

  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(ref, scrollerRef);
  React.useEffect(() => {
    if (autoFocus || scrollerRef.current === null) {
      return;
    }
    const tabbableButton = scrollerRef.current.querySelector<HTMLElement>('[tabindex="0"]');
    if (!tabbableButton) {
      return;
    }

    // Taken from useScroll in x-data-grid, but vertically centered
    const offsetHeight = tabbableButton.offsetHeight;
    const offsetTop = tabbableButton.offsetTop;

    const clientHeight = scrollerRef.current.clientHeight;
    const scrollTop = scrollerRef.current.scrollTop;

    const elementBottom = offsetTop + offsetHeight;

    if (offsetHeight > clientHeight || offsetTop < scrollTop) {
      // Button already visible
      return;
    }

    scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
  }, [autoFocus]);

  return (
    <YearCalendarRoot
      ref={handleRef}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {utils.getYearRange(minDate, maxDate).map((year) => {
        const yearNumber = utils.getYear(year);
        const isSelected = yearNumber === selectedYear;
        const isDisabled = disabled || isYearDisabled(year);

        return (
          <PickersYear
            key={utils.format(year, 'year')}
            selected={isSelected}
            value={yearNumber}
            onClick={handleYearSelection}
            onKeyDown={handleKeyDown}
            autoFocus={internalHasFocus && yearNumber === focusedYear}
            disabled={isDisabled}
            tabIndex={yearNumber === focusedYear ? 0 : -1}
            onFocus={handleYearFocus}
            onBlur={handleYearBlur}
            aria-current={todayYear === yearNumber ? 'date' : undefined}
          >
            {utils.format(year, 'year')}
          </PickersYear>
        );
      })}
    </YearCalendarRoot>
  );
}) as YearCalendarComponent;

YearCalendar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  autoFocus: PropTypes.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The default selected value.
   * Used when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true` picker is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If `true` disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: PropTypes.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,
  /**
   * If `true` disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: PropTypes.bool,
  hasFocus: PropTypes.bool,
  /**
   * Maximal selectable date.
   */
  maxDate: PropTypes.any,
  /**
   * Minimal selectable date.
   */
  minDate: PropTypes.any,
  /**
   * Callback fired when the value changes.
   * @template TDate
   * @param {TDate | null} value The new value.
   */
  onChange: PropTypes.func,
  onFocusedViewChange: PropTypes.func,
  onYearFocus: PropTypes.func,
  /**
   * If `true` picker is readonly
   */
  readOnly: PropTypes.bool,
  /**
   * Disable specific year.
   * @template TDate
   * @param {TDate} year The year to test.
   * @returns {boolean} If `true` the year will be disabled.
   */
  shouldDisableYear: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: PropTypes.any,
} as any;
