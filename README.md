# dayzed

Primitives to build simple, flexible, WAI-ARIA compliant React date-picker components.

## The problem

You need a date-picker in your application that is accessible, can fit a number of use cases (single date, multi date, range), and has styling and layout that can be easily extended. 

## This solution

This is a component that focuses on controlling user interactions so you can focus on creating beautiful, accessible, and useful date-pickers. It uses a [render function as children](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9). This means you are responsible for rendering everything, but props are provided by the render function, through a pattern called [prop getters](https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf), which can be used to help enhance what you are rendering.

This differs from other solutions which render things for their use case and then expose many options to allow for extensibility resulting in a bigger API that is less flexible as well as making the implementation more complicated and harder to contribute to.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
- [Inspiration and Thanks!](#inspiration-and-thanks)
- [Other Solutions](#other-solutions)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
```jsx
import React from "react";
import Dayzed from "dayzed";

const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Datepicker extends React.Component {
  state = { offset: 0 };

  onOffsetChanged = offset => {
    this.setState(state => ({ offset }));
  };

  render() {
    return (
      <Dayzed
        offset={this.state.offset}
        onOffsetChanged={this.onOffsetChanged}
        onDateSelected={this.props.onDateSelected}
        selected={this.props.selected}
      >
        {({ calendars, getBackProps, getForwardProps, getDateProps }) => {
          if (calendars.length) {
            return (
              <div
                style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
              >
                <div>
                  <button {...getBackProps({ calendars })}>Back</button>
                  <button {...getForwardProps({ calendars })}>Next</button>
                </div>
                {calendars.map(calendar => (
                  <div
                    key={`${calendar.month}${calendar.year}`}
                    style={{
                      display: "inline-block",
                      width: "50%",
                      padding: "0 10px 30px",
                      boxSizing: "border-box"
                    }}
                  >
                    <div>
                      {monthNamesShort[calendar.month]} {calendar.year}
                    </div>
                    {weekdayNamesShort.map(weekday => (
                      <div
                        key={`${calendar.month}${calendar.year}${weekday}`}
                        style={{
                          display: "inline-block",
                          width: "calc(100% / 7)",
                          border: "none",
                          background: "transparent"
                        }}
                      >
                        {weekday}
                      </div>
                    ))}
                    {calendar.weeks.map(week =>
                      week.map((dateObj, index) => {
                        if (!dateObj) {
                          return (
                            <div
                              key={`${calendar.year}${calendar.month}${index}`}
                              style={{
                                display: "inline-block",
                                width: "calc(100% / 7)",
                                border: "none",
                                background: "transparent"
                              }}
                            />
                          );
                        }
                        let { date, selected, selectable, today } = dateObj;
                        let background = today ? "cornflowerblue" : "";
                        background = selected ? "purple" : background;
                        background = !selectable ? "teal" : background;
                        return (
                          <button
                            style={{
                              display: "inline-block",
                              width: "calc(100% / 7)",
                              border: "none",
                              background
                            }}
                            key={`${calendar.year}${calendar.month}${index}`}
                            {...getDateProps({ dateObj })}
                          >
                            {selectable ? date.getDate() : "X"}
                          </button>
                        );
                      })
                    )}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        }}
      </Dayzed>
    );
  }
}

class Single extends React.Component {
  state = { selectedDate: null };

  _handleOnDateSelected = ({ selected, selectable, date }) => {
    this.setState(state => ({ selectedDate: date }));
  };

  render() {
    let { selectedDate } = this.state;
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
        />
        {this.state.selectedDate && (
          <div style={{ paddingTop: 20, textAlign: "center" }}>
            <p>Selected:</p>
            <p>{`${selectedDate.getMonth() +
              1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Single;

```

## Inspiration and Thanks!

- [Jen Luker](https://github.com/knittingcodemonkey)
    - For help with naming and reviewing this library.
- [Kent C. Dodds](https://github.com/kentcdodds)
    - This library borrows **heavily** from his awesome [downshift](https://github.com/paypal/downshift) library!
- [Michael Jackson](https://github.com/mjackson) & [Ryan Florence](https://github.com/ryanflorence)
    - For teaching the use of the [render prop pattern](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

## Other Solutions

Here are some other great daypicker solutions:

- [react-dates](https://github.com/airbnb/react-dates)
- [react-calendar](https://github.com/wojtekmaj/react-calendar)
- [react-day-picker](https://github.com/gpbl/react-day-picker)

## LICENSE

MIT