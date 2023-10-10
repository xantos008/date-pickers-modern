/* eslint-disable class-methods-use-this */
import addSeconds from 'date-fns-jalali/addSeconds';
import addMinutes from 'date-fns-jalali/addMinutes';
import addHours from 'date-fns-jalali/addHours';
import addDays from 'date-fns-jalali/addDays';
import addWeeks from 'date-fns-jalali/addWeeks';
import addMonths from 'date-fns-jalali/addMonths';
import addYears from 'date-fns-jalali/addYears';
import differenceInYears from 'date-fns-jalali/differenceInYears';
import differenceInQuarters from 'date-fns-jalali/differenceInQuarters';
import differenceInMonths from 'date-fns-jalali/differenceInMonths';
import differenceInWeeks from 'date-fns-jalali/differenceInWeeks';
import differenceInDays from 'date-fns-jalali/differenceInDays';
import differenceInHours from 'date-fns-jalali/differenceInHours';
import differenceInMinutes from 'date-fns-jalali/differenceInMinutes';
import differenceInSeconds from 'date-fns-jalali/differenceInSeconds';
import differenceInMilliseconds from 'date-fns-jalali/differenceInMilliseconds';
import eachDayOfInterval from 'date-fns-jalali/eachDayOfInterval';
import endOfDay from 'date-fns-jalali/endOfDay';
import endOfWeek from 'date-fns-jalali/endOfWeek';
import endOfYear from 'date-fns-jalali/endOfYear';
import dateFnsFormat from 'date-fns-jalali/format';
import formatISO from 'date-fns-jalali/formatISO';
import getHours from 'date-fns-jalali/getHours';
import getSeconds from 'date-fns-jalali/getSeconds';
import getMilliseconds from 'date-fns-jalali/getMilliseconds';
import getWeek from 'date-fns-jalali/getWeek';
import getYear from 'date-fns-jalali/getYear';
import getMonth from 'date-fns-jalali/getMonth';
import getDate from 'date-fns-jalali/getDate';
import getDaysInMonth from 'date-fns-jalali/getDaysInMonth';
import getMinutes from 'date-fns-jalali/getMinutes';
import isAfter from 'date-fns-jalali/isAfter';
import isBefore from 'date-fns-jalali/isBefore';
import isEqual from 'date-fns-jalali/isEqual';
import isSameDay from 'date-fns-jalali/isSameDay';
import isSameYear from 'date-fns-jalali/isSameYear';
import isSameMonth from 'date-fns-jalali/isSameMonth';
import isSameHour from 'date-fns-jalali/isSameHour';
import isValid from 'date-fns-jalali/isValid';
import dateFnsParse from 'date-fns-jalali/parse';
import parseISO from 'date-fns-jalali/parseISO';
import setDate from 'date-fns-jalali/setDate';
import setHours from 'date-fns-jalali/setHours';
import setMinutes from 'date-fns-jalali/setMinutes';
import setMonth from 'date-fns-jalali/setMonth';
import setSeconds from 'date-fns-jalali/setSeconds';
import setMilliseconds from 'date-fns-jalali/setMilliseconds';
import setYear from 'date-fns-jalali/setYear';
import startOfDay from 'date-fns-jalali/startOfDay';
import startOfMonth from 'date-fns-jalali/startOfMonth';
import endOfMonth from 'date-fns-jalali/endOfMonth';
import startOfWeek from 'date-fns-jalali/startOfWeek';
import startOfYear from 'date-fns-jalali/startOfYear';
import isWithinInterval from 'date-fns-jalali/isWithinInterval';
import defaultLocale from 'date-fns-jalali/locale/fa-IR';
// @ts-ignore
import longFormatters from 'date-fns-jalali/_lib/format/longFormatters';
import {
  AdapterFormats,
  AdapterOptions,
  AdapterUnits,
  DateBuilderReturnType,
  FieldFormatTokenMap,
  MuiPickersAdapter,
} from '../models';

type DateFnsLocale = typeof defaultLocale;

const formatTokenMap: FieldFormatTokenMap = {
  // Year
  y: { sectionType: 'year', contentType: 'digit', maxLength: 4 },
  yy: 'year',
  yyy: { sectionType: 'year', contentType: 'digit', maxLength: 4 },
  yyyy: 'year',

  // Month
  M: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  MM: 'month',
  MMMM: { sectionType: 'month', contentType: 'letter' },
  MMM: { sectionType: 'month', contentType: 'letter' },
  L: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  LL: 'month',
  LLL: { sectionType: 'month', contentType: 'letter' },
  LLLL: { sectionType: 'month', contentType: 'letter' },

  // Day of the month
  d: { sectionType: 'day', contentType: 'digit', maxLength: 2 },
  dd: 'day',
  do: { sectionType: 'day', contentType: 'digit-with-letter' },

  // Day of the week
  E: { sectionType: 'weekDay', contentType: 'letter' },
  EE: { sectionType: 'weekDay', contentType: 'letter' },
  EEE: { sectionType: 'weekDay', contentType: 'letter' },
  EEEE: { sectionType: 'weekDay', contentType: 'letter' },
  EEEEE: { sectionType: 'weekDay', contentType: 'letter' },
  i: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  ii: 'weekDay',
  iii: { sectionType: 'weekDay', contentType: 'letter' },
  iiii: { sectionType: 'weekDay', contentType: 'letter' },
  e: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  ee: 'weekDay',
  eee: { sectionType: 'weekDay', contentType: 'letter' },
  eeee: { sectionType: 'weekDay', contentType: 'letter' },
  eeeee: { sectionType: 'weekDay', contentType: 'letter' },
  eeeeee: { sectionType: 'weekDay', contentType: 'letter' },
  c: { sectionType: 'weekDay', contentType: 'digit', maxLength: 1 },
  cc: 'weekDay',
  ccc: { sectionType: 'weekDay', contentType: 'letter' },
  cccc: { sectionType: 'weekDay', contentType: 'letter' },
  ccccc: { sectionType: 'weekDay', contentType: 'letter' },
  cccccc: { sectionType: 'weekDay', contentType: 'letter' },

  // Meridiem
  a: 'meridiem',
  aa: 'meridiem',
  aaa: 'meridiem',

  // Hours
  H: { sectionType: 'hours', contentType: 'digit', maxLength: 2 },
  HH: 'hours',
  h: { sectionType: 'hours', contentType: 'digit', maxLength: 2 },
  hh: 'hours',

  // Minutes
  m: { sectionType: 'minutes', contentType: 'digit', maxLength: 2 },
  mm: 'minutes',

  // Seconds
  s: { sectionType: 'seconds', contentType: 'digit', maxLength: 2 },
  ss: 'seconds',
};

const defaultFormats: AdapterFormats = {
  year: 'yyyy',
  month: 'LLLL',
  monthShort: 'MMM',
  dayOfMonth: 'd',
  weekday: 'EEEE',
  weekdayShort: 'EEE',
  hours24h: 'HH',
  hours12h: 'hh',
  meridiem: 'aa',
  minutes: 'mm',
  seconds: 'ss',

  fullDate: 'PPP',
  fullDateWithWeekday: 'PPPP',
  keyboardDate: 'P',
  shortDate: 'd MMM',
  normalDate: 'd MMMM',
  normalDateWithWeekday: 'EEE, d MMMM',
  monthAndYear: 'LLLL yyyy',
  monthAndDate: 'd MMMM',

  fullDateTime: 'PPP p',
  fullDateTime12h: 'PPP hh:mm aa',
  fullDateTime24h: 'PPP HH:mm',

  fullTime: 'p',
  fullTime12h: 'hh:mm aaa',
  fullTime24h: 'HH:mm',
  keyboardDateTime: 'P p',
  keyboardDateTime12h: 'P hh:mm aa',
  keyboardDateTime24h: 'P HH:mm',
};

const NUMBER_SYMBOL_MAP = {
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
  '0': '۰',
};

/**
 * Based on `@date-io/date-fns-jalali`
 *
 * MIT License
 *
 * Copyright (c) 2017 Dmitriy Kovalenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export class AdapterDateFnsJalali implements MuiPickersAdapter<Date, DateFnsLocale> {
  public isMUIAdapter = true;

  public isTimezoneCompatible = false;

  public lib = 'date-fns-jalali';

  public locale?: DateFnsLocale;

  public formats: AdapterFormats;

  public formatTokenMap = formatTokenMap;

  public escapedCharacters = { start: "'", end: "'" };

  constructor({ locale, formats }: AdapterOptions<DateFnsLocale, never> = {}) {
    this.locale = locale;
    this.formats = { ...defaultFormats, ...formats };
  }

  public date = (value?: any) => {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  };

  public dateWithTimezone = <T extends string | null | undefined>(
    value: T,
  ): DateBuilderReturnType<T, Date> => {
    return <DateBuilderReturnType<T, Date>>this.date(value);
  };

  public getTimezone = (): string => {
    return 'default';
  };

  public setTimezone = (value: Date): Date => {
    return value;
  };

  public toJsDate = (value: Date) => {
    return value;
  };

  public parseISO = (isoString: string) => {
    return parseISO(isoString);
  };

  public toISO = (value: Date) => {
    return formatISO(value, { format: 'extended' });
  };

  public parse = (value: string, format: string) => {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, format, new Date(), { locale: this.locale });
  };

  public getCurrentLocaleCode = () => {
    return this.locale?.code || 'fa-IR';
  };

  // Note: date-fns input types are more lenient than this adapter, so we need to expose our more
  // strict signature and delegate to the more lenient signature. Otherwise, we have downstream type errors upon usage.
  public is12HourCycleInCurrentLocale = () => {
    if (this.locale) {
      return /a/.test(this.locale.formatLong!.time());
    }

    // By default, date-fns-jalali is using fa-IR locale with am/pm enabled
    return true;
  };

  public expandFormat = (format: string) => {
    // @see https://github.com/date-fns/date-fns/blob/master/src/format/index.js#L31
    const longFormatRegexp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
    const locale = this.locale ?? defaultLocale;
    return format
      .match(longFormatRegexp)!
      .map((token) => {
        const firstCharacter = token[0];
        if (firstCharacter === 'p' || firstCharacter === 'P') {
          const longFormatter = longFormatters[firstCharacter];
          return longFormatter(token, locale.formatLong, {});
        }
        return token;
      })
      .join('');
  };

  public getFormatHelperText = (format: string) => {
    return this.expandFormat(format)
      .replace(/(aaa|aa|a)/g, '(a|p)m')
      .toLocaleLowerCase();
  };

  public isNull = (value: Date | null) => {
    return value === null;
  };

  public isValid = (value: any) => {
    return isValid(this.date(value));
  };

  public format = (value: Date, formatKey: keyof AdapterFormats) => {
    return this.formatByString(value, this.formats[formatKey]);
  };

  public formatByString = (value: Date, formatString: string) => {
    return dateFnsFormat(value, formatString, { locale: this.locale });
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat
      .replace(/\d/g, (match) => NUMBER_SYMBOL_MAP[match as keyof typeof NUMBER_SYMBOL_MAP])
      .replace(/,/g, '،');
  };

  public getDiff = (value: Date, comparing: Date | string, unit?: AdapterUnits) => {
    switch (unit) {
      case 'years':
        return differenceInYears(value, this.date(comparing)!);
      case 'quarters':
        return differenceInQuarters(value, this.date(comparing)!);
      case 'months':
        return differenceInMonths(value, this.date(comparing)!);
      case 'weeks':
        return differenceInWeeks(value, this.date(comparing)!);
      case 'days':
        return differenceInDays(value, this.date(comparing)!);
      case 'hours':
        return differenceInHours(value, this.date(comparing)!);
      case 'minutes':
        return differenceInMinutes(value, this.date(comparing)!);
      case 'seconds':
        return differenceInSeconds(value, this.date(comparing)!);
      default: {
        return differenceInMilliseconds(value, this.date(comparing)!);
      }
    }
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    return isEqual(value, comparing);
  };

  public isSameYear = (value: Date, comparing: Date) => {
    return isSameYear(value, comparing);
  };

  public isSameMonth = (value: Date, comparing: Date) => {
    return isSameMonth(value, comparing);
  };

  public isSameDay = (value: Date, comparing: Date) => {
    return isSameDay(value, comparing);
  };

  public isSameHour = (value: Date, comparing: Date) => {
    return isSameHour(value, comparing);
  };

  public isAfter = (value: Date, comparing: Date) => {
    return isAfter(value, comparing);
  };

  public isAfterYear = (value: Date, comparing: Date) => {
    return isAfter(value, endOfYear(comparing));
  };

  public isAfterDay = (value: Date, comparing: Date) => {
    return isAfter(value, endOfDay(comparing));
  };

  public isBefore = (value: Date, comparing: Date) => {
    return isBefore(value, comparing);
  };

  public isBeforeYear = (value: Date, comparing: Date) => {
    return isBefore(value, startOfYear(comparing));
  };

  public isBeforeDay = (value: Date, comparing: Date) => {
    return isBefore(value, startOfDay(comparing));
  };

  public isWithinRange = (value: Date, [start, end]: [Date, Date]) => {
    return isWithinInterval(value, { start, end });
  };

  public startOfYear = (value: Date) => {
    return startOfYear(value);
  };

  public startOfMonth = (value: Date) => {
    return startOfMonth(value);
  };

  public startOfWeek = (value: Date) => {
    return startOfWeek(value, { locale: this.locale });
  };

  public startOfDay = (value: Date) => {
    return startOfDay(value);
  };

  public endOfYear = (value: Date) => {
    return endOfYear(value);
  };

  public endOfMonth = (value: Date) => {
    return endOfMonth(value);
  };

  public endOfWeek = (value: Date) => {
    return endOfWeek(value, { locale: this.locale });
  };

  public endOfDay = (value: Date) => {
    return endOfDay(value);
  };

  public addYears = (value: Date, amount: number) => {
    return addYears(value, amount);
  };

  public addMonths = (value: Date, amount: number) => {
    return addMonths(value, amount);
  };

  public addWeeks = (value: Date, amount: number) => {
    return addWeeks(value, amount);
  };

  public addDays = (value: Date, amount: number) => {
    return addDays(value, amount);
  };

  public addHours = (value: Date, amount: number) => {
    return addHours(value, amount);
  };

  public addMinutes = (value: Date, amount: number) => {
    return addMinutes(value, amount);
  };

  public addSeconds = (value: Date, amount: number) => {
    return addSeconds(value, amount);
  };

  public getYear = (value: Date) => {
    return getYear(value);
  };

  public getMonth = (value: Date) => {
    return getMonth(value);
  };

  public getDate = (value: Date) => {
    return getDate(value);
  };

  public getHours = (value: Date) => {
    return getHours(value);
  };

  public getMinutes = (value: Date) => {
    return getMinutes(value);
  };

  public getSeconds = (value: Date) => {
    return getSeconds(value);
  };

  public getMilliseconds = (value: Date) => {
    return getMilliseconds(value);
  };

  public setYear = (value: Date, year: number) => {
    return setYear(value, year);
  };

  public setMonth = (value: Date, month: number) => {
    return setMonth(value, month);
  };

  public setDate = (value: Date, date: number) => {
    return setDate(value, date);
  };

  public setHours = (value: Date, hours: number) => {
    return setHours(value, hours);
  };

  public setMinutes = (value: Date, minutes: number) => {
    return setMinutes(value, minutes);
  };

  public setSeconds = (value: Date, seconds: number) => {
    return setSeconds(value, seconds);
  };

  public setMilliseconds = (value: Date, milliseconds: number) => {
    return setMilliseconds(value, milliseconds);
  };

  public getDaysInMonth = (value: Date) => {
    return getDaysInMonth(value);
  };

  public getNextMonth = (value: Date) => {
    return addMonths(value, 1);
  };

  public getPreviousMonth = (value: Date) => {
    return addMonths(value, -1);
  };

  public getMonthArray = (value: Date) => {
    const firstMonth = startOfYear(value);
    const monthArray = [firstMonth];

    while (monthArray.length < 12) {
      const prevMonth = monthArray[monthArray.length - 1];
      monthArray.push(this.getNextMonth(prevMonth));
    }

    return monthArray;
  };

  public mergeDateAndTime = (dateParam: Date, timeParam: Date) => {
    return this.setSeconds(
      this.setMinutes(
        this.setHours(dateParam, this.getHours(timeParam)),
        this.getMinutes(timeParam),
      ),
      this.getSeconds(timeParam),
    );
  };

  public getWeekdays = () => {
    const now = new Date();
    return eachDayOfInterval({
      start: startOfWeek(now, { locale: this.locale }),
      end: endOfWeek(now, { locale: this.locale }),
    }).map((day) => this.formatByString(day, 'EEEEEE'));
  };

  public getWeekArray = (value: Date) => {
    const start = startOfWeek(startOfMonth(value), { locale: this.locale });
    const end = endOfWeek(endOfMonth(value), { locale: this.locale });

    let count = 0;
    let current = start;
    const nestedWeeks: Date[][] = [];

    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = addDays(current, 1);
      count += 1;
    }

    return nestedWeeks;
  };

  public getWeekNumber = (date: Date) => {
    return getWeek(date, { locale: this.locale });
  };

  public getYearRange = (start: Date, end: Date) => {
    const startDate = startOfYear(start);
    const endDate = endOfYear(end);
    const years: Date[] = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  };

  public getMeridiemText = (ampm: 'am' | 'pm') => {
    return ampm === 'am' ? 'ق.ظ' : 'ب.ظ';
  };
}
