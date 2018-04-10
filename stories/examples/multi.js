import React from "react";
import Datepicker from "./Datepicker";

class Multi extends React.Component {
  state = {
    selectedDates: [],
    date: new Date("05/01/2018")
  };

  _getDateIndex = condition => {
    let index;
    this.state.selectedDates.some((date, i) => {
      index = i;
      if (condition(date.getTime())) {
        return true;
      }
      // If we loop through all the selected dates and still didn't find
      // one, make sure to add it to the end of the array.
      index++;
      return false;
    });
    return index;
  };

  _handleOnDateSelected = ({ selected, selectable, date }) => {
    if (!selectable) {
      return;
    }
    this.setState(state => {
      let newSelectedDates = state.selectedDates.slice();
      let selectedTime = date.getTime();
      // Remove
      if (selected) {
        let index = this._getDateIndex(time => selectedTime === time);
        newSelectedDates.splice(index, 1);
      } else {
        // Add
        let index = this._getDateIndex(time => selectedTime < time);
        newSelectedDates.splice(index, 0, date);
      }
      return { selectedDates: newSelectedDates };
    });
  };

  render() {
    let { selectedDates, date } = this.state;
    return (
      <div>
        <Datepicker
          date={date}
          selected={this.state.selectedDates}
          onDateSelected={this._handleOnDateSelected}
        />
        <div style={{ paddingTop: 20, textAlign: "center" }}>
          {selectedDates.length ? <p>Selected:</p> : null}
          {selectedDates.map(date => (
            <p key={date.getTime()}>{`${date.toLocaleDateString()}`}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Multi;
