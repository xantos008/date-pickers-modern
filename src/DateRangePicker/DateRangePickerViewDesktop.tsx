import * as React from 'react';
import clsx from 'clsx';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { resolveComponentProps, SlotComponentProps } from '@mui/base/utils';
import {
  useDefaultDates,
  useUtils,
  useLocaleText,
  PickersArrowSwitcher,
  usePreviousMonthDisabled,
  useNextMonthDisabled,
  DayCalendar,
  DayCalendarProps,
  DAY_MARGIN,
  DayValidationProps,
  ExportedPickersArrowSwitcherProps,
  PickersArrowSwitcherSlotsComponent,
  PickersArrowSwitcherSlotsComponentsProps,
  DayCalendarSlotsComponent,
  DayCalendarSlotsComponentsProps, ExportedUseViewsOptions, DateView, PickersCalendarHeader, BaseDateValidationProps,
} from '../internals';
import { calculateRangePreview } from './date-range-manager';
import { DateRange, RangePosition } from '../internal/models/range';
import { DateRangePickerDay, DateRangePickerDayProps } from '../DateRangePickerDay';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../internal/utils/date-utils';
import { doNothing } from '../internal/utils/utils';
import {
  DateRangePickerViewDesktopClasses,
  getDateRangePickerViewDesktopUtilityClass,
} from './dateRangePickerViewDesktopClasses';
import {useViews} from "../internals/hooks/useViews";
import useEventCallback from "@mui/utils/useEventCallback";
import {findClosestEnabledDate} from "../internals/utils/date-utils";
import {YearCalendar} from "../YearCalendar";
import {MonthCalendar} from "../MonthCalendar";
import {SlideDirection} from "../DateCalendar/PickersSlideTransition";
import useControlled from "@mui/utils/useControlled";

const useUtilityClasses = (ownerState: DateRangePickerViewDesktopProps<any>) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
    container: ['container'],
  };

  return composeClasses(slots, getDateRangePickerViewDesktopUtilityClass, classes);
};

export interface ExportedDateRangePickerViewDesktopProps {
  /**
   * The number of calendars that render on **desktop**.
   * @default 2
   */
  calendars?: 1 | 2 | 3;
}

export interface DesktopDateRangeCalendarSlotsComponent<TDate>
  extends PickersArrowSwitcherSlotsComponent,
    Omit<DayCalendarSlotsComponent<TDate>, 'Day'> {
  /**
   * Custom component for day in range pickers.
   * Check the [DateRangePickersDay](https://mui.com/x/api/date-pickers/date-range-picker-day/) component.
   * @default DateRangePickersDay
   */
  Day?: React.ElementType<DateRangePickerDayProps<TDate>>;
}

export interface DesktopDateRangeCalendarSlotsComponentsProps<TDate>
  extends PickersArrowSwitcherSlotsComponentsProps,
    Omit<DayCalendarSlotsComponentsProps<TDate>, 'day'> {
  day?: SlotComponentProps<typeof DateRangePickerDay, {}, DayCalendarProps<TDate> & { day: TDate }>;
}

interface ChangeMonthPayload<TDate> {
  direction: SlideDirection;
  newMonth: TDate;
}

export interface DateRangePickerViewDesktopProps<TDate>
  extends ExportedDateRangePickerViewDesktopProps,
    Omit<
      DayCalendarProps<TDate>,
      'selectedDays' | 'onFocusedDayChange' | 'classes' | 'components' | 'componentsProps'
    >,
    DayValidationProps<TDate>,
    ExportedPickersArrowSwitcherProps,
    Pick<ExportedUseViewsOptions<DateView>, 'view' | 'views' | 'openTo' | 'onViewChange' | 'focusedView' > {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: DesktopDateRangeCalendarSlotsComponent<TDate>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: DesktopDateRangeCalendarSlotsComponentsProps<TDate>;
  calendars: 1 | 2 | 3;
  value: DateRange<TDate>;
  changeMonth: (date: TDate) => void;
  onYearChange?: (date: TDate) => void;
  isDateDisabled?:  (day: (TDate | null)) => boolean;
  handleChangeMonth?: (payload: ChangeMonthPayload<TDate>) => void;
  views: DateView[];
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday?: boolean;
  /**
   * Make picker read only.
   * @default false
   */
  readOnly?: boolean;
  changeFocusedDay: (newFocusedDate: (TDate | null), withoutMonthSwitchingAnimation?: (boolean | undefined)) => void;
  /**
   * Callback firing on month change @DateIOType.
   * @template TDate
   * @param {TDate} month The new month.
   * @returns {void|Promise} -
   */
  onMonthChange?: (month: TDate) => void | Promise<void>;
  onFocusedViewChangedIn?: (view: DateView, hasFocus: boolean) => void;

  rangePosition: RangePosition;
  classes?: Partial<DateRangePickerViewDesktopClasses>;
}

const DateRangePickerViewDesktopRoot = styled('div', {
  name: 'MuiDateRangePickerViewDesktop',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root,
})({
  display: 'flex',
  flexDirection: 'row',
});

const DateRangePickerViewDesktopContainer = styled('div', {
  name: 'MuiDateRangePickerViewDesktop',
  slot: 'Container',
  overridesResolver: (_, styles) => styles.container,
})(({ theme }) => ({
  '&:not(:last-of-type)': {
    borderRight: `2px solid ${((theme as any).vars || theme).palette.divider}`,
  },
}));

const DAY_RANGE_SIZE = 40;
const weeksContainerHeight = (DAY_RANGE_SIZE + DAY_MARGIN * 2) * 6;

const DateRangePickerViewDesktopCalendar = styled(DayCalendar)({
  minWidth: 312,
  minHeight: weeksContainerHeight,
}) as typeof DayCalendar;

const DateRangePickerViewDesktopArrowSwitcher = styled(PickersArrowSwitcher)({
  padding: '16px 16px 8px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

function getCalendarsArray(calendars: ExportedDateRangePickerViewDesktopProps['calendars']) {
  switch (calendars) {
    case 1:
      return [0];
    case 2:
      return [0, 0];
    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars
    default:
      return new Array(calendars).fill(0);
  }
}

/**
 * @ignore - internal component.
 */
export function DateRangePickerViewDesktop<TDate>(inProps: DateRangePickerViewDesktopProps<TDate>) {
  const props = useThemeProps({ props: inProps, name: 'MuiDateRangePickerViewDesktop' });
  const {
    view: inView,
    views,
    onFocusedViewChange,
    onYearChange,
    onViewChange,
    reduceAnimations,
    disabled,
    openTo,
    autoFocus,
    focusedView: inFocusedView,
    isDateDisabled,
    handleChangeMonth,
    disableHighlightToday,
    readOnly,
    shouldDisableMonth,
    shouldDisableYear,
    changeFocusedDay,
    onMonthChange,
    onFocusedViewChangedIn,

    calendars,
    changeMonth,
    components,
    componentsProps,
    rangePosition,
    currentMonth,
    value,
    disableFuture,
    disablePast,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onSelectedDaysChange,
    className,
    // excluding classes from `other` to avoid passing them down to children
    classes: providedClasses,
    ...other
  } = props;

  const localeText = useLocaleText<TDate>();

  const utils = useUtils<TDate>();
  const classes = useUtilityClasses(props);
  const defaultDates = useDefaultDates<TDate>();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;

  const [currentView, setCurrentView] = useControlled<DateView>({
    name: 'DateRangeCalendar',
    controlled: inView,
    default: inView || 'day'
  });

  // When disabled, limit the view to the selected date
  const minDateWithDisabled = (disabled && value[0]) || minDate;
  const maxDateWithDisabled = (disabled && value[1]) || maxDate;

  const [rangePreviewDay, setRangePreviewDay] = React.useState<TDate | null>(null);

  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, { disableFuture, maxDate });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, { disablePast, minDate });

  // Range going for the start of the start day to the end of the end day.
  // This makes sure that `isWithinRange` works with any time in the start and end day.
  const valueDayRange = React.useMemo<DateRange<TDate>>(
    () => [
      value[0] == null || !utils.isValid(value[0]) ? value[0] : utils.startOfDay(value[0]),
      value[1] == null || !utils.isValid(value[1]) ? value[1] : utils.endOfDay(value[1]),
    ],
    [value, utils],
  );

  const previewingRange = calculateRangePreview({
    utils,
    range: valueDayRange,
    newDate: rangePreviewDay,
    rangePosition,
  });

  const handleSelectedDayChange = React.useCallback<
    DayCalendarProps<TDate>['onSelectedDaysChange']
  >(
    (day) => {
      setRangePreviewDay(null);
      onSelectedDaysChange(day);
    },
    [onSelectedDaysChange],
  );

  const handlePreviewDayChange = (newPreviewRequest: TDate) => {
    if (!isWithinRange(utils, newPreviewRequest, valueDayRange)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(
    () => ({
      onMouseLeave: () => setRangePreviewDay(null),
    }),
    [],
  );

  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);

  const componentsForDayCalendar = {
    Day: DateRangePickerDay,
    ...components,
  } as DayCalendarSlotsComponent<TDate>;

  const componentsPropsForDayCalendar = {
    ...componentsProps,
    day: (dayOwnerState) => {
      const { day } = dayOwnerState;

      return {
        isPreviewing: isWithinRange(utils, day, previewingRange),
        isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
        isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
        isHighlighting: isWithinRange(utils, day, valueDayRange),
        isStartOfHighlighting: isStartOfRange(utils, day, valueDayRange),
        isEndOfHighlighting: isEndOfRange(utils, day, valueDayRange),
        onMouseEnter: () => handlePreviewDayChange(day),
        ...(resolveComponentProps(componentsProps?.day, dayOwnerState) ?? {}),
      };
    },
  } as DayCalendarSlotsComponentsProps<TDate>;

  const baseDateValidationProps: Required<BaseDateValidationProps<TDate>> = {
    disablePast,
    disableFuture,
    maxDate,
    minDate,
  };

  const commonViewProps = {
    disableHighlightToday,
    readOnly,
    disabled,
  };


  const { view, setView, focusedView, setFocusedView, goToNextView, setValueAndGoToNextView } =
      useViews({
        view: inView,
        views,
        openTo,
        onChange: handleSelectedDayChange,
        onViewChange,
        autoFocus,
        focusedView: inFocusedView,
        onFocusedViewChange: onFocusedViewChangedIn
      });

  React.useEffect(() => {
    setCurrentView(view)
  }, [view]);

  const hasFocus = focusedView !== null;

  const handleDateMonthChange = useEventCallback((newDate: TDate) => {
    const startOfMonth = utils.startOfMonth(newDate);
    const endOfMonth = utils.endOfMonth(newDate);

    const closestEnabledDate = isDateDisabled?.(newDate)
        ? findClosestEnabledDate({
          utils,
          date: newDate,
          minDate: utils.isBefore(minDate, startOfMonth) ? startOfMonth : minDate,
          maxDate: utils.isAfter(maxDate, endOfMonth) ? endOfMonth : maxDate,
          disablePast,
          disableFuture,
          isDateDisabled,
        })
        : newDate;

    if (closestEnabledDate) {
      setValueAndGoToNextView(closestEnabledDate, 'finish');
      onMonthChange?.(startOfMonth);
    } else {
      goToNextView();
      changeMonth(startOfMonth);
    }

    changeFocusedDay(closestEnabledDate, true);
  });
  const handleDateYearChange = useEventCallback((newDate: TDate) => {
    const startOfYear = utils.startOfYear(newDate);
    const endOfYear = utils.endOfYear(newDate);

    const closestEnabledDate = isDateDisabled?.(newDate)
        ? findClosestEnabledDate({
          utils,
          date: newDate,
          minDate: utils.isBefore(minDate, startOfYear) ? startOfYear : minDate,
          maxDate: utils.isAfter(maxDate, endOfYear) ? endOfYear : maxDate,
          disablePast,
          disableFuture,
          isDateDisabled,
        })
        : newDate;

    if (closestEnabledDate) {
      setValueAndGoToNextView(closestEnabledDate, 'finish');
      onYearChange?.(closestEnabledDate);
    } else {
      goToNextView();
      changeMonth(startOfYear);
    }

    changeFocusedDay(closestEnabledDate, true);
  });


  return (
    <DateRangePickerViewDesktopRoot className={clsx(className, classes.root)}>
      {getCalendarsArray(calendars).map((_, index) => {
        const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);

        return (
          <DateRangePickerViewDesktopContainer key={index} className={classes.container}>
            {calendars === 1 ? (
              <PickersCalendarHeader
                  views={views}
                  view={view}
                  currentMonth={currentMonth}
                  onViewChange={(newView) => {
                    setView(newView);
                    setCurrentView(newView);
                  }}
                  onMonthChange={(newMonth, direction) => handleChangeMonth?.({ newMonth, direction })}
                  minDate={minDateWithDisabled}
                  maxDate={maxDateWithDisabled}
                  disabled={disabled}
                  disablePast={disablePast}
                  disableFuture={disableFuture}
                  reduceAnimations={reduceAnimations}
                  components={components}
                  componentsProps={componentsProps}
              />
            ) : (
              <DateRangePickerViewDesktopArrowSwitcher
                onGoToPrevious={selectPreviousMonth}
                onGoToNext={selectNextMonth}
                isPreviousHidden={index !== 0}
                isPreviousDisabled={isPreviousMonthDisabled}
                previousLabel={localeText.previousMonth}
                isNextHidden={index !== calendars - 1}
                isNextDisabled={isNextMonthDisabled}
                nextLabel={localeText.nextMonth}
                components={components}
                componentsProps={componentsProps}
              >
                {utils.format(monthOnIteration, 'monthAndYear')}
              </DateRangePickerViewDesktopArrowSwitcher>
            )}

            {view === 'year' && (
                <YearCalendar<TDate>
                    {...baseDateValidationProps}
                    {...commonViewProps}
                    value={rangePosition === 'start' ? value[0] : value[1]}
                    onChange={handleDateYearChange}
                    shouldDisableYear={shouldDisableYear}
                    hasFocus={hasFocus}
                    onFocusedViewChange={(isViewFocused) => setFocusedView('year', isViewFocused)}
                />
            )}

            {view === 'month' && (
                <MonthCalendar<TDate>
                    {...baseDateValidationProps}
                    {...commonViewProps}
                    hasFocus={hasFocus}
                    className={className}
                    value={rangePosition === 'start' ? value[0] : value[1]}
                    onChange={handleDateMonthChange}
                    shouldDisableMonth={shouldDisableMonth}
                    onFocusedViewChange={(isViewFocused) => setFocusedView('month', isViewFocused)}
                />
            )}

            {view === 'day' && (
              <DateRangePickerViewDesktopCalendar<TDate>
                {...other}
                reduceAnimations={reduceAnimations}
                minDate={minDate}
                maxDate={maxDate}
                disablePast={disablePast}
                disableFuture={disableFuture}
                key={index}
                selectedDays={value}
                onFocusedDayChange={doNothing}
                onSelectedDaysChange={handleSelectedDayChange}
                currentMonth={monthOnIteration}
                TransitionProps={CalendarTransitionProps}
                components={componentsForDayCalendar}
                componentsProps={componentsPropsForDayCalendar}
              />
            )}
          </DateRangePickerViewDesktopContainer>
        );
      })}
    </DateRangePickerViewDesktopRoot>
  );
}
