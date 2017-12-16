import React from "react";
import glamorous from "glamorous";
import Dayzed from "../../src/index";

const monthNamesFull = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let Calendar = glamorous.div({
  maxWidth: 800,
  margin: "0 auto",
  textAlign: "center",
});

let Month = glamorous.div({
  display: "inline-block",
  width: "50%",
  padding: "0 10px 30px",
  boxSizing: "border-box",
});

const dayOfMonthStyle = {
  display: "inline-block",
  width: "calc(100% / 7)",
  border: "none",
};

let DayOfMonth = glamorous.button(
  dayOfMonthStyle,
  ({ selected, unavailable, today }) => {
    let background = today ? "cornflowerblue" : "";
    background = selected ? "purple" : background;
    background = unavailable ? "teal" : background;
    return { background };
  }
);

let DayOfMonthEmpty = glamorous.div(dayOfMonthStyle, {
  background: "transparent",
});

class Datepicker extends React.Component {
  state = {
    offset: 0,
  };

  onOffsetChanged = offset => {
    this.setState(state => ({
      offset,
    }));
  };

  normalizeDate(date) {
    let normalizeDate = new Date(date.getTime());
    normalizeDate.setHours(0, 0, 0, 0);
    return normalizeDate;
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.date &&
      this.normalizeDate(nextProps.date).getTime() !==
        this.normalizeDate(this.props.date).getTime()
    ) {
      this.setState(state => ({ offset: 0 }));
    }
  }

  render() {
    let offset = this.props.offset || this.state.offset;
    let onOffsetChanged = this.props.onOffsetChanged || this.onOffsetChanged;
    return (
      <Dayzed
        date={this.props.date}
        offset={offset}
        onDateSelected={this.props.onDateSelected}
        onOffsetChanged={onOffsetChanged}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selected={this.props.selected}
        monthsToDisplay={this.props.monthsToDisplay}
      >
        {({ calendars, getDateProps, getBackProps, getForwardProps }) => {
          if (calendars.length) {
            return (
              <Calendar>
                <div>
                  <button
                    {...getBackProps({
                      calendars,
                      offset: 12,
                    })}
                  >
                    {"<<"}
                  </button>
                  <button {...getBackProps({ calendars })}>Back</button>
                  <button {...getForwardProps({ calendars })}>Next</button>
                  <button
                    {...getForwardProps({
                      calendars,
                      offset: 12,
                    })}
                  >
                    {">>"}
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
                    {calendar.weeks.map(week =>
                      week.map((dateObj, index) => {
                        if (!dateObj) {
                          return (
                            <DayOfMonthEmpty
                              key={`${calendar.year}${calendar.month}${index}`}
                            />
                          );
                        }
                        let { date, selected, selectable, today } = dateObj;
                        return (
                          <DayOfMonth
                            key={`${calendar.year}${calendar.month}${index}`}
                            {...getDateProps({
                              dateObj,
                            })}
                            selected={selected}
                            unavailable={!selectable}
                            today={today}
                          >
                            {selectable ? date.getDate() : "X"}
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
      </Dayzed>
    );
  }
}

export default Datepicker;
