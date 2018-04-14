import addDays from 'date-fns/add_days';
import isBefore from 'date-fns/is_before';
import isToday from 'date-fns/is_today';
import startOfDay from 'date-fns/start_of_day';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';

/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls
 * `event.preventDefault()`. Not sure this is the best
 * way to do this, but it seems legit...
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */
export function composeEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args);
      return event.defaultPrevented;
    });
}

/**
 * Throws a helpful error message for required properties. Useful
 * to be used as a default in destructuring or object params.
 * @param {String} fnName the function name
 * @param {String} propName the prop name
 */
export function requiredProp(fnName, propName) {
  throw new Error(`The property "${propName}" is required in "${fnName}"`);
}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument.
 * @param {*} arg the maybe-array
 * @return {*} the arg or it's first item
 */
export function unwrapChildrenForPreact(arg) {
  arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */ arg[0] : arg;
  return arg || noop;
}
function noop() {}

/**
 * Takes a calendars array and figures out the number of months to subtract
 * based on the current offset and the minDate allowed.
 * @param {Object} param The param object
 * @param {Array} param.calendars The calendars array created by the getCalendars function
 * @param {Number} param.offset The num of months to be subtracted
 * @param {Date} param.minDate The earliest date we are allow to subtract back to
 * @returns {Number} The number of months to subtract
 */
export function subtractMonth({ calendars, offset, minDate }) {
  if (offset > 1 && minDate) {
    const { firstDayOfMonth } = calendars[0];
    const diffInMonths = differenceInCalendarMonths(firstDayOfMonth, minDate);
    if (diffInMonths < offset) {
      offset = diffInMonths;
    }
  }
  return offset;
}

/**
 * Takes a calendars array and figures out the number of months to add
 * based on the current offset and the maxDate allowed.
 * @param {Object} param The param object
 * @param {Array} param.calendars The calendars array created by the getCalendars function
 * @param {Number} param.offset The num of months to be added
 * @param {Date} param.maxDate The furthest date we are allow to add forward to
 * @returns {Number} The number of months to add
 */
export function addMonth({ calendars, offset, maxDate }) {
  if (offset > 1 && maxDate) {
    const { lastDayOfMonth } = calendars[calendars.length - 1];
    const diffInMonths = differenceInCalendarMonths(maxDate, lastDayOfMonth);
    if (diffInMonths < offset) {
      offset = diffInMonths;
    }
  }
  return offset;
}

/**
 * Takes a calendars array and figures out if the back button should be
 * disabled based on the minDate allowed.
 * @param {Object} param The param object
 * @param {Array} param.calendars The calendars array created by the getCalendars function
 * @param {Date} param.minDate The earliest date available
 * @returns {Boolean} Whether the back button should be disabled.
 */
export function isBackDisabled({ calendars, minDate }) {
  if (!minDate) {
    return false;
  }
  const { firstDayOfMonth } = calendars[0];
  const firstDayOfMonthMinusOne = addDays(firstDayOfMonth, -1);
  if (isBefore(firstDayOfMonthMinusOne, minDate)) {
    return true;
  }
  return false;
}

/**
 * Takes a calendars array and figures out if the forward button should be
 * disabled based on the maxDate allowed.
 * @param {Object} param The param object
 * @param {Array} param.calendars The calendars array created by the getCalendars function
 * @param {Date} param.maxDate The furthest date available
 * @returns {Boolean} Whether the forward button should be disabled.
 */
export function isForwardDisabled({ calendars, maxDate }) {
  if (!maxDate) {
    return false;
  }
  const { lastDayOfMonth } = calendars[calendars.length - 1];
  const lastDayOfMonthPlusOne = addDays(lastDayOfMonth, 1);
  if (isBefore(maxDate, lastDayOfMonthPlusOne)) {
    return true;
  }
  return false;
}

/**
 * Figures out the months data needed based off the number of monthsToDisplay
 * and other options provided.
 * @param {Object} param The param object
 * @param {Date} param.date The date to start the calendar at
 * @param {Array.<Date>} param.selected An array of dates currently selected
 * @param {Number} param.monthsToDisplay The number of months to return in the calendar view
 * @param {Number} param.offset The number of months to offset based off the param.date given
 * @param {Date} param.minDate The earliest date available
 * @param {Date} param.maxDate The furthest date available
 * @returns {Array.<Object>} An array of objects with month data
 */
export function getCalendars({
  date,
  selected,
  monthsToDisplay,
  offset,
  minDate,
  maxDate
}) {
  const months = [];
  const startDate = getStartDate(date, minDate, maxDate);
  for (let i = 0; i < monthsToDisplay; i++) {
    const calendarDates = getMonths(
      startDate.getMonth() + i + offset,
      startDate.getFullYear(),
      selected,
      minDate,
      maxDate
    );
    months.push(calendarDates);
  }
  return months;
}

/**
 * Figures out the actual start date based on 
 * the min and max dates available.
 * @param {Date} date The we want to start the calendar at
 * @param {Date} minDate The earliest date available to start at
 * @param {Date} maxDate The latest date available to start at
 * @returns {Date} The actual start date
 */
function getStartDate(date, minDate, maxDate) {
  let startDate = startOfDay(date);
  if (minDate) {
    const minDateNormalized = startOfDay(minDate);
    if (isBefore(startDate, minDateNormalized)) {
      startDate = minDateNormalized;
    }
  }
  if (maxDate) {
    const maxDateNormalized = startOfDay(maxDate);
    if (isBefore(maxDateNormalized, startDate)) {
      startDate = maxDateNormalized;
    }
  }
  return startDate;
}

/**
 * Figures what week/day data to return for the given month
 * and year. Adds flags to day data if found in the given selectedDates,
 * if is selectable inside the given min and max dates, or is today.
 * @param {Number} month The month to grab data for
 * @param {Number} year The year to grab data for
 * @param {Array.<Date>} selectedDates An array of dates currently selected
 * @param {Date} minDate The earliest date available
 * @param {Date} maxDate The furthest date available
 * @returns {Object} The data for the selected month/year
 */
function getMonths(month, year, selectedDates, minDate, maxDate) {
  // Get the normalized month and year, along with days in the month.
  const daysMonthYear = getNumDaysMonthYear(month, year);
  const daysInMonth = daysMonthYear.daysInMonth;
  month = daysMonthYear.month;
  year = daysMonthYear.year;
  // Fill out the dates for the month.
  const dates = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateObj = {
      date,
      selected: isSelected(selectedDates, date),
      selectable: isSelectable(minDate, maxDate, date),
      today: isToday(date)
    };
    dates.push(dateObj);
  }
  // Fill out front week for days from 
  // preceding month with buffer.
  const firstDayOfMonth = new Date(year, month, 1);
  let firstDay = firstDayOfMonth.getDay();
  while (firstDay > 0) {
    dates.unshift("");
    firstDay--;
  }
  // Fill out back week for days from 
  // following month with buffer.
  const lastDayOfMonth = new Date(year, month, daysInMonth);
  let lastDay = lastDayOfMonth.getDay();
  while (lastDay < 6) {
    dates.push("");
    lastDay++;
  }
  // Get the filled out weeks for the 
  // given dates.
  const weeks = getWeeks(dates);
  // return the calendar data.
  return {
    firstDayOfMonth,
    lastDayOfMonth,
    month,
    year,
    weeks
  };
}

/**
 * Normalizes month (could be overflow) and year pairs and returns the
 * normalized month and year along with the number of days in the month.
 * @param {Number} month The month to normalize
 * @param {Number} year The year to normalize
 * @returns {Object} The normalized month and year along with the number of days in the month
 */
function getNumDaysMonthYear(month, year) {
  // If a parameter you specify is outside of the expected range for Month or Day, 
  // JS Date attempts to update the date information in the Date object accordingly!
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate

  // Let Date handle the overflow of the month,
  // which should return the normalized month and year.
  const normalizedMonthYear = new Date(year, month, 1);
  month = normalizedMonthYear.getMonth();
  year = normalizedMonthYear.getFullYear();
  // Overflow the date to the next month, then subtract the difference
  // to get the number of days in the previous month.
  // This will also account for leap years!
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  return { daysInMonth, month, year }
}

/**
 * Takes an array of dates, and turns them into a multi dimensional
 * array with 7 entries for each week.
 * @param {Array.<Object>} dates An array of dates
 * @returns {Array} The weeks as a multi dimensional array
 */
function getWeeks(dates) {
  const weeksLength = Math.ceil(dates.length / 7);
  const weeks = [];
  for (let i = 0; i < weeksLength; i++) {
    weeks[i] = [];
    for (let x = 0; x < 7; x++) {
      weeks[i].push(dates[i * 7 + x]);
    }
  }
  return weeks;
}

/**
 * Normalizes dates to the beginning of the day,
 * then checks to see if the day given is found
 * in the selectedDates.
 * @param {Array.<Date>} selectedDates An array of dates currently selected
 * @param {Date} date The date to search with against selectedDates
 * @returns {Boolean} Whether day is found in selectedDates
 */
function isSelected(selectedDates, date) {
  selectedDates = Array.isArray(selectedDates)
    ? selectedDates
    : [selectedDates];
  return selectedDates.some(selectedDate => {
    if (
      selectedDate instanceof Date &&
      startOfDay(selectedDate).getTime() === startOfDay(date).getTime()
    ) {
      return true;
    }
    return false;
  });
}

/**
 * Checks to see if the date given is
 * between the min and max dates.
 * @param {Date} minDate The earliest date available
 * @param {Date} maxDate The furthest date available
 * @param {Date} date The date to compare with
 * @returns {Boolean} Whether the date is between min and max date
 */
function isSelectable(minDate, maxDate, date) {
  if (
    (minDate && isBefore(date, minDate)) ||
    (maxDate && isBefore(maxDate, date))
  ) {
    return false;
  }
  return true;
}
