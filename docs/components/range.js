import React from 'react';
import glamorous from 'glamorous';
import Dayzed from '../../src/index';
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
  ({ selected, unavailable, today, isInRange }) => {
    let background = today ? 'cornflowerblue' : '';
    background = selected || isInRange ? 'purple' : background;
    background = unavailable ? 'teal' : background;
    return { background };
  }
);

let DayOfMonthEmpty = glamorous.div(dayOfMonthStyle, {
  background: 'transparent'
});

class RangeDatepicker extends React.Component {
  state = { hoveredDate: null };

  constructor(props) {
    super(props);
    ArrowKeysReact.config({
      left: () => {
        this.getKeyOffset(-1);
      },
      right: () => {
        this.getKeyOffset(1);
      },
      up: () => {
        this.getKeyOffset(-7);
      },
      down: () => {
        this.getKeyOffset(7);
      }
    });
  }

  getKeyOffset(number) {
    const e = document.activeElement;
    let buttons = document.querySelectorAll('button');
    buttons.forEach((el, i) => {
      const newNodeKey = i + number;
      if (el == e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  }

  // Calendar level
  onMouseLeave = () => {
    this.setState({ hoveredDate: null });
  };

  // Date level
  onMouseEnter(date) {
    if (!this.props.selected.length) {
      return;
    }
    this.setState({ hoveredDate: date });
  }

  isInRange = date => {
    let { selected } = this.props;
    let { hoveredDate } = this.state;
    if (selected.length) {
      let firstSelected = selected[0].getTime();
      if (selected.length === 2) {
        let secondSelected = selected[1].getTime();
        return firstSelected < date && secondSelected > date;
      } else {
        return (
          hoveredDate &&
          ((firstSelected < date && hoveredDate >= date) ||
            (date < firstSelected && date >= hoveredDate))
        );
      }
    }
    return false;
  };

  render() {
    return (
      <Dayzed
        date={this.props.date}
        onDateSelected={this.props.onDateSelected}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selected={this.props.selected}
        monthsToDisplay={this.props.monthsToDisplay}
        render={({
          calendars,
          getDateProps,
          getBackProps,
          getForwardProps
        }) => {
          if (calendars.length) {
            return (
              <Calendar
                {...ArrowKeysReact.events}
                onMouseLeave={this.onMouseLeave}
              >
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
                              dateObj,
                              onMouseEnter: () => {
                                this.onMouseEnter(date);
                              }
                            })}
                            selected={selected}
                            unavailable={!selectable}
                            today={today}
                            isInRange={this.isInRange(date)}
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

  _handleOnDateSelected = ({ selected, selectable, date }) => {
    if (!selectable) {
      return;
    }
    let dateTime = date.getTime();
    let newDates = [...this.state.selectedDates];
    if (this.state.selectedDates.length) {
      if (this.state.selectedDates.length === 1) {
        let firstTime = this.state.selectedDates[0].getTime();
        if (firstTime < dateTime) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        this.setState({ selectedDates: newDates });
      } else if (newDates.length === 2) {
        this.setState({ selectedDates: [date] });
      }
    } else {
      newDates.push(date);
      this.setState({ selectedDates: newDates });
    }
  };

  render() {
    let { selectedDates, date } = this.state;
    return (
      <div>
        <RangeDatepicker
          date={date}
          selected={this.state.selectedDates}
          onDateSelected={this._handleOnDateSelected}
          monthsToDisplay={2}
        />
        {selectedDates.length === 2 && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p>{`${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Range;
