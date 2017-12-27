import React from "react";
import glamorous, { Div } from "glamorous";
import Dayzed from "../../src/index";
import ArrowKeysReact from "arrow-keys-react";
import { monthNamesShort, weekdayNamesShort } from "./calendarUtils";

let Calendar = glamorous.div({
  maxWidth: 800,
  margin: "0 auto",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  fontSize: 16,
  paddingTop: 30
});

let Controls = glamorous.div({
  margin: "0 auto",
  width: "50%"
});

let ControlButton = glamorous.button({
  width: "25%",
  background: "#000",
  padding: 10,
  color: "#fff",
  border: "none",
  fontSize: 16,
  ":disabled": {
    color: "#4d4d4d"
  }
});

let MonthYear = glamorous.div({
  writingMode: "vertical-rl",
  textOrientation: "upright",
  display: "inline-block",
  verticalAlign: "middle",
  letterSpacing: 3,
  color: "#c1c1c1",
  padding: "0 10px"
});

let Month = glamorous.div({
  display: "inline-block",
  width: "50%",
  background: "#e1e1e1",
  padding: 10,
  boxSizing: "border-box",
  verticalAlign: "middle"
});

const dayOfMonthStyle = {
  display: "inline-block",
  width: "calc(100% / 7)",
  border: "none",
  fontSize: 16,
  background: "transparent"
};

let DayOfMonth = glamorous.button(
  dayOfMonthStyle,
  ({ selected, unavailable, today }) => {
    let background = today ? "cornflowerblue" : dayOfMonthStyle.background;
    background = selected ? "purple" : background;
    return { background };
  },
  ({ selected, unavailable, today }) =>
    (selected || today) && { color: "#fff" },
  ({ unavailable }) => unavailable && { color: "#9b9b9b" }
);

let DayOfMonthEmpty;
let WeekdayName = (DayOfMonthEmpty = glamorous.div(dayOfMonthStyle, {
  background: "transparent",
  paddingBottom: 10,
  color: "#fff"
}));

class Datepicker extends React.Component {
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
    let buttons = document.querySelectorAll("button");
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

  render() {
    return (
      <Dayzed
        date={this.props.date}
        onDateSelected={this.props.onDateSelected}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selected={this.props.selected}
        monthsToDisplay={this.props.monthsToDisplay}
      >
        {({ calendars, getDateProps, getBackProps, getForwardProps }) => {
          if (calendars.length) {
            return (
              <Calendar {...ArrowKeysReact.events}>
                <Controls>
                  <ControlButton {...getBackProps({ calendars, offset: 12 })}>
                    {"<<"}
                  </ControlButton>
                  <ControlButton {...getBackProps({ calendars })}>
                    {"<"}
                  </ControlButton>
                  <ControlButton {...getForwardProps({ calendars })}>
                    {">"}
                  </ControlButton>
                  <ControlButton
                    {...getForwardProps({ calendars, offset: 12 })}
                  >
                    {">>"}
                  </ControlButton>
                </Controls>
                {calendars.map((calendar, i) => (
                  <div key={`${calendar.month}${calendar.year}`}>
                    <MonthYear>{monthNamesShort[calendar.month]}</MonthYear>
                    <Month>
                      <Div display="none">
                        {monthNamesShort[calendar.month]} {calendar.year}
                      </Div>
                      {i === 0 &&
                        weekdayNamesShort.map(weekday => (
                          <WeekdayName
                            key={`${calendar.month}${calendar.year}${weekday}`}
                          >
                            {weekday}
                          </WeekdayName>
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
                              {...getDateProps({ dateObj })}
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
                    <MonthYear>{calendar.year}</MonthYear>
                  </div>
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

class Single extends React.Component {
  state = {
    selectedDate: null
  };

  _handleOnDateSelected = ({ selected, selectable, date }) => {
    if (!selectable) {
      return;
    }
    this.setState(state => {
      let newDate = date;
      if (
        state.selectedDate &&
        state.selectedDate.getTime() === date.getTime()
      ) {
        newDate = null;
      }
      return { selectedDate: newDate };
    });
  };

  render() {
    let { selectedDate } = this.state;
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
          minDate={new Date()}
          monthsToDisplay={3}
        />
        {this.state.selectedDate && (
          <div
            style={{
              paddingTop: 20,
              textAlign: "center",
              fontFamily: "Arial, sans-serif"
            }}
          >
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Single;
