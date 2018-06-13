import React from 'react';
import glamorous from 'glamorous';
import { DatePicker, MultiDatePicker } from '../../src/index';
import { monthNamesFull, weekdayNamesShort } from './calendarUtils';

let Calendar = glamorous.div({
  maxWidth: 800,
  margin: '0 auto',
  textAlign: 'center'
});

let Month = glamorous.div({
  display: 'inline-block',
  width: '50%',
  padding: '0 10px 30px',
  boxSizing: 'border-box'
});

const dayOfMonthStyle = {
  display: 'inline-block',
  width: 'calc((100% / 7) - 4px)', // make allowance for active border
  border: 'none',
  margin: '2px' // make allowance for active border
};

let DayOfMonth = glamorous.button(
  dayOfMonthStyle,
  ({ selected, unavailable, today, currentMonth }) => {
    let background = today ? 'cornflowerblue' : 'transparent';
    background = selected ? 'purple' : background;
    background = unavailable ? 'teal' : background;
    let color = !currentMonth ? 'rgba(0, 0, 0, 0.6)' : '';
    return { background, color };
  }
);

let DayOfMonthEmpty = glamorous.div(dayOfMonthStyle, {
  background: 'transparent'
});

let [sun, ...restOfWeek] = weekdayNamesShort;
let weekdayNamesShortMon = [...restOfWeek, sun];

const Datepicker = props => {
  let weekdayNames = [...weekdayNamesShort];
  if (props.firstDayOfWeek > 0) {
    let weekdaysFromFront = weekdayNames.splice(0, props.firstDayOfWeek);
    weekdayNames = weekdayNames.concat(weekdaysFromFront);
  }

  const { multi, ...rest } = props;
  const DatePickerComp = multi ? MultiDatePicker : DatePicker;

  return (
    <DatePickerComp
      {...rest}
      render={({
        calendars,
        getRootProps,
        getDateProps,
        getBackProps,
        getForwardProps
      }) => {
        if (calendars.length) {
          return (
            <Calendar {...getRootProps({ refKey: 'innerRef' })}>
              <div>
                <button
                  {...getBackProps({
                    calendars,
                    offset: 12,
                    'data-test': 'backYear'
                  })}
                >
                  {'<<'}
                </button>
                <button
                  {...getBackProps({ calendars, 'data-test': 'backMonth' })}
                >
                  Back
                </button>
                <button
                  {...getForwardProps({
                    calendars,
                    'data-test': 'forwardMonth'
                  })}
                >
                  Next
                </button>
                <button
                  {...getForwardProps({
                    calendars,
                    offset: 12,
                    'data-test': 'forwardYear'
                  })}
                >
                  {'>>'}
                </button>
              </div>
              {calendars.map(calendar => (
                <Month key={`${calendar.month}${calendar.year}`}>
                  <div data-test="monthYear">
                    {monthNamesFull[calendar.month]} {calendar.year}
                  </div>
                  {weekdayNames.map((weekday, idx) => (
                    <DayOfMonthEmpty
                      key={`${calendar.month}${calendar.year}${weekday}`}
                      {...(idx === 0 ? { 'data-test': 'firstDayOfWeek' } : {})}
                    >
                      {weekday}
                    </DayOfMonthEmpty>
                  ))}
                  <div data-test="calendarDates">
                    {calendar.weeks.map((week, windex) =>
                      week.map((dateObj, index) => {
                        let key = `${calendar.month}${
                          calendar.year
                        }${windex}${index}`;
                        if (!dateObj) {
                          return <DayOfMonthEmpty key={key} />;
                        }
                        let {
                          date,
                          selected,
                          selectable,
                          today,
                          prevMonth,
                          nextMonth
                        } = dateObj;
                        return (
                          <DayOfMonth
                            key={key}
                            {...getDateProps({
                              dateObj
                            })}
                            selected={selected}
                            unavailable={!selectable}
                            currentMonth={!prevMonth && !nextMonth}
                            today={today}
                          >
                            {selectable ? date.getDate() : 'X'}
                          </DayOfMonth>
                        );
                      })
                    )}
                  </div>
                </Month>
              ))}
            </Calendar>
          );
        }
        return null;
      }}
    />
  );
};

export default Datepicker;
