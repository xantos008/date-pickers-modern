import * as React from 'react';
import { PickersDay } from '../PickersDay';

<PickersDay<Date>
  day={new Date()}
  outsideCurrentMonth
  onDaySelect={(date) => date?.getDay()}
  isFirstVisibleCell={false}
  isLastVisibleCell={false}
/>;
