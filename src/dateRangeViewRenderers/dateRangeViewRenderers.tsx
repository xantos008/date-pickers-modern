import * as React from 'react';
import {DateOrTimeView, DateView} from '../internals';
import { DateRangeCalendar, DateRangeCalendarProps } from '../DateRangeCalendar';

const isDatePickerView = (view: unknown): view is DateView =>
    view === 'year' || view === 'month' || view === 'day';

export interface DateRangeViewRendererProps<TDate, TView extends DateOrTimeView>
  extends Omit<DateRangeCalendarProps<TDate>,
      'views' | 'openTo' | 'view' | 'onViewChange' | 'focusedView'
      > {
  view: TView;
  onViewChange?: (view: TView) => void;
  views: readonly TView[];
  focusedView: TView | null;
}

/**
 * We don't pass all the props down to `DateRangeCalendar`,
 * because otherwise some unwanted props would be passed to the HTML element.
 */
export const renderDateRangeViewCalendar = <TDate extends unknown>({
  views,
  view,
  focusedView,
  value,
  defaultValue,
  onChange,
  className,
  classes,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
  reduceAnimations,
  onMonthChange,
  defaultCalendarMonth,
  rangePosition,
  onRangePositionChange,
  calendars,
  components,
  componentsProps,
  loading,
  renderLoading,
  disableHighlightToday,
  readOnly,
  disabled,
  showDaysOutsideCurrentMonth,
  dayOfWeekFormatter,
  disableAutoMonthSwitching,
  sx,
  autoFocus,
  fixedWeekNumber,
  disableDragEditing,
  displayWeekNumber,
}: DateRangeViewRendererProps<TDate, any>) => (
  <DateRangeCalendar
    view={view as DateView}
    views={views.filter(isDatePickerView)}
    focusedView={focusedView as DateView | null}
    value={value}
    defaultValue={defaultValue}
    onChange={onChange}
    className={className}
    classes={classes}
    disableFuture={disableFuture}
    disablePast={disablePast}
    minDate={minDate}
    maxDate={maxDate}
    shouldDisableDate={shouldDisableDate}
    reduceAnimations={reduceAnimations}
    onMonthChange={onMonthChange}
    defaultCalendarMonth={defaultCalendarMonth}
    rangePosition={rangePosition}
    onRangePositionChange={onRangePositionChange}
    calendars={calendars}
    components={components}
    componentsProps={componentsProps}
    loading={loading}
    renderLoading={renderLoading}
    disableHighlightToday={disableHighlightToday}
    readOnly={readOnly}
    disabled={disabled}
    showDaysOutsideCurrentMonth={showDaysOutsideCurrentMonth}
    dayOfWeekFormatter={dayOfWeekFormatter}
    disableAutoMonthSwitching={disableAutoMonthSwitching}
    sx={sx}
    autoFocus={autoFocus}
    fixedWeekNumber={fixedWeekNumber}
    disableDragEditing={disableDragEditing}
    displayWeekNumber={displayWeekNumber}
  />
);
