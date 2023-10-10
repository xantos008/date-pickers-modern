/* eslint-disable class-methods-use-this */
import defaultJMoment, { Moment } from 'moment-jalaali';
import { AdapterMoment } from '../AdapterMoment';
import {
  AdapterFormats,
  AdapterOptions,
  DateBuilderReturnType,
  FieldFormatTokenMap,
  MuiPickersAdapter,
} from '../models';

// From https://momentjs.com/docs/#/displaying/format/
const formatTokenMap: FieldFormatTokenMap = {
  // Year
  jYY: 'year',
  jYYYY: { sectionType: 'year', contentType: 'digit', maxLength: 4 },

  // Month
  jM: { sectionType: 'month', contentType: 'digit', maxLength: 2 },
  jMM: 'month',
  jMMM: { sectionType: 'month', contentType: 'letter' },
  jMMMM: { sectionType: 'month', contentType: 'letter' },

  // Day of the month
  jD: { sectionType: 'day', contentType: 'digit', maxLength: 2 },
  jDD: 'day',

  // Meridiem
  A: 'meridiem',
  a: 'meridiem',

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
  year: 'jYYYY',
  month: 'jMMMM',
  monthShort: 'jMMM',
  dayOfMonth: 'jD',
  weekday: 'dddd',
  weekdayShort: 'ddd',
  hours24h: 'HH',
  hours12h: 'hh',
  meridiem: 'A',
  minutes: 'mm',
  seconds: 'ss',

  fullDate: 'jYYYY, jMMMM Do',
  fullDateWithWeekday: 'dddd Do jMMMM jYYYY',
  keyboardDate: 'jYYYY/jMM/jDD',
  shortDate: 'jD jMMM',
  normalDate: 'dddd, jD jMMM',
  normalDateWithWeekday: 'DD MMMM',
  monthAndYear: 'jMMMM jYYYY',
  monthAndDate: 'jD jMMMM',

  fullTime: 'LT',
  fullTime12h: 'hh:mm A',
  fullTime24h: 'HH:mm',

  fullDateTime: 'jYYYY, jMMMM Do, hh:mm A',
  fullDateTime12h: 'jD jMMMM hh:mm A',
  fullDateTime24h: 'jD jMMMM HH:mm',
  keyboardDateTime: 'jYYYY/jMM/jDD LT',
  keyboardDateTime12h: 'jYYYY/jMM/jDD hh:mm A',
  keyboardDateTime24h: 'jYYYY/jMM/jDD HH:mm',
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
 * Based on `@date-io/jalaali`
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
export class AdapterMomentJalaali
  extends AdapterMoment
  implements MuiPickersAdapter<Moment, string>
{
  public isTimezoneCompatible = false;

  public lib = 'moment-jalaali';

  public moment: typeof defaultJMoment;

  public formatTokenMap = formatTokenMap;

  constructor({ formats, instance }: AdapterOptions<string, typeof defaultJMoment> = {}) {
    super({ locale: 'fa', instance });

    this.moment = instance || defaultJMoment;
    this.locale = 'fa';
    this.formats = { ...defaultFormats, ...formats };
  }

  public date = (value?: any) => {
    if (value === null) {
      return null;
    }

    return this.moment(value).locale('fa');
  };

  public dateWithTimezone = <T extends string | null | undefined>(
    value: T,
  ): DateBuilderReturnType<T, Moment> => {
    return <DateBuilderReturnType<T, Moment>>this.date(value);
  };

  public getTimezone = (): string => {
    return 'default';
  };

  public setTimezone = (value: Moment): Moment => {
    return value;
  };

  public parseISO = (isoString: string) => {
    return this.moment(isoString).locale('fa');
  };

  public parse = (value: string, format: string) => {
    if (value === '') {
      return null;
    }

    return this.moment(value, format, true).locale('fa');
  };

  public getFormatHelperText = (format: string) => {
    return this.expandFormat(format)
      .replace(/a/gi, '(a|p)m')
      .replace('jY', 'Y')
      .replace('jM', 'M')
      .replace('jD', 'D')
      .toLocaleLowerCase();
  };

  public isValid = (value: any) => {
    // We can't to `this.moment(value)` because moment-jalaali looses the invalidity information when creating a new moment object from an existing one
    if (!this.moment.isMoment(value)) {
      return false;
    }

    return value.isValid();
  };

  public formatNumber = (numberToFormat: string) => {
    return numberToFormat
      .replace(/\d/g, (match) => NUMBER_SYMBOL_MAP[match as keyof typeof NUMBER_SYMBOL_MAP])
      .replace(/,/g, '،');
  };

  public isEqual = (value: any, comparing: any) => {
    if (value === null && comparing === null) {
      return true;
    }

    return this.moment(value).isSame(comparing);
  };

  public isSameYear = (value: Moment, comparing: Moment) => {
    // `isSame` seems to mutate the date on `moment-jalaali`
    // @ts-ignore
    return value.clone().isSame(comparing, 'jYear');
  };

  public isSameMonth = (value: Moment, comparing: Moment) => {
    // `isSame` seems to mutate the date on `moment-jalaali`
    // @ts-ignore
    return value.clone().isSame(comparing, 'jMonth');
  };

  public isAfterYear = (value: Moment, comparing: Moment) => {
    return value.jYear() > comparing.jYear();
  };

  public isBeforeYear = (value: Moment, comparing: Moment) => {
    return value.jYear() < comparing.jYear();
  };

  public startOfYear = (value: Moment) => {
    return value.clone().startOf('jYear');
  };

  public startOfMonth = (value: Moment) => {
    return value.clone().startOf('jMonth');
  };

  public endOfYear = (value: Moment) => {
    return value.clone().endOf('jYear');
  };

  public endOfMonth = (value: Moment) => {
    return value.clone().endOf('jMonth');
  };

  public addYears = (value: Moment, amount: number) => {
    return amount < 0
      ? value.clone().subtract(Math.abs(amount), 'jYear')
      : value.clone().add(amount, 'jYear');
  };

  public addMonths = (value: Moment, amount: number) => {
    return amount < 0
      ? value.clone().subtract(Math.abs(amount), 'jMonth')
      : value.clone().add(amount, 'jMonth');
  };

  public getYear = (value: Moment) => {
    return value.jYear();
  };

  public getMonth = (value: Moment) => {
    return value.jMonth();
  };

  public getDate = (value: Moment) => {
    return value.jDate();
  };

  public setYear = (value: Moment, year: number) => {
    return value.clone().jYear(year);
  };

  public setMonth = (value: Moment, month: number) => {
    return value.clone().jMonth(month);
  };

  public setDate = (value: Moment, date: number) => {
    return value.clone().jDate(date);
  };

  public getNextMonth = (value: Moment) => {
    return value.clone().add(1, 'jMonth');
  };

  public getPreviousMonth = (value: Moment) => {
    return value.clone().subtract(1, 'jMonth');
  };

  public getWeekdays = () => {
    return [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => {
      return this.date()!.weekday(dayOfWeek).format('dd');
    });
  };

  public getWeekArray = (value: Moment) => {
    const start = value.clone().startOf('jMonth').startOf('week');
    const end = value.clone().endOf('jMonth').endOf('week');

    let count = 0;
    let current = start;
    const nestedWeeks: Moment[][] = [];

    while (current.isBefore(end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);

      current = current.clone().add(1, 'day');
      count += 1;
    }

    return nestedWeeks;
  };

  public getWeekNumber = (value: Moment) => {
    return value.jWeek();
  };

  public getYearRange = (start: Moment, end: Moment) => {
    const startDate = this.moment(start).startOf('jYear');
    const endDate = this.moment(end).endOf('jYear');
    const years: Moment[] = [];

    let current = startDate;
    while (current.isBefore(endDate)) {
      years.push(current);
      current = current.clone().add(1, 'jYear');
    }

    return years;
  };

  public getMeridiemText = (ampm: 'am' | 'pm') => {
    return ampm === 'am' ? this.date()!.hours(2).format('A') : this.date()!.hours(14).format('A');
  };
}
