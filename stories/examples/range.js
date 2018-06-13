import React from 'react';
import glamorous from 'glamorous';
import { RangeDatePicker } from '../../src/index';
import ArrowKeysReact from 'arrow-keys-react';
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
  ({ selected, unavailable, today, inRange, start, end }) => {
    let background = today ? 'cornflowerblue' : '';
    background = selected || inRange ? 'purple' : background;
    background = unavailable ? 'teal' : background;

    let color = selected || inRange ? 'white' : 'inherit';

    return {
      background,
      color,
      ...(start
        ? { borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }
        : {}),
      ...(end
        ? { borderTopRightRadius: '16px', borderBottomRightRadius: '16px' }
        : {})
    };
  }
);

let DayOfMonthEmpty = glamorous.div(dayOfMonthStyle, {
  background: 'transparent'
});

class RangeDatepicker extends React.Component {
  render() {
    return (
      <RangeDatePicker
        {...this.props}
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
                      offset: 12
                    })}
                  >
                    {'<<'}
                  </button>
                  <button {...getBackProps({ calendars })}>Back</button>
                  <button {...getForwardProps({ calendars })}>Next</button>
                  <button
                    {...getForwardProps({
                      calendars,
                      offset: 12
                    })}
                  >
                    {'>>'}
                  </button>
                </div>
                {calendars.map(calendar => (
                  <Month key={`${calendar.month}${calendar.year}`}>
                    <div>
                      {monthNamesFull[calendar.month]} {calendar.year}
                    </div>
                    {weekdayNamesShort.map(weekday => (
                      <DayOfMonthEmpty
                        key={`${calendar.month}${calendar.year}${weekday}`}
                      >
                        {weekday}
                      </DayOfMonthEmpty>
                    ))}
                    {calendar.weeks.map((week, windex) =>
                      week.map((dateObj, index) => {
                        let key = `${calendar.month}${
                          calendar.year
                        }${windex}${index}`;
                        if (!dateObj) {
                          return <DayOfMonthEmpty key={key} />;
                        }
                        let { date, selected, selectable, today } = dateObj;
                        return (
                          <DayOfMonth
                            key={key}
                            {...getDateProps({
                              dateObj
                            })}
                            selected={selected}
                            unavailable={!selectable}
                            today={today}
                          >
                            {selectable ? date.getDate() : 'X'}
                          </DayOfMonth>
                        );
                      })
                    )}
                  </Month>
                ))}
              </Calendar>
            );
          }
          return null;
        }}
      />
    );
  }
}

class Range extends React.Component {
  state = {
    selectedDates: [],
    date: new Date('05/01/2018')
  };

  _handleOnChange = selectedDates => {
    this.setState({ selectedDates });
  };

  render() {
    let { selectedDates, date } = this.state;
    return (
      <div>
        <RangeDatepicker
          date={date}
          selected={this.state.selectedDates}
          onChange={this._handleOnChange}
          monthsToDisplay={2}
        />
        {selectedDates.length === 2 && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p
            >{`${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Range;
