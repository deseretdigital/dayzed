import React from "react";
import Datepicker from "./Datepicker";

class Multi extends React.Component {
  state = {
    selectedDates: []
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
    let { selectedDates } = this.state;
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDates}
          onDateSelected={this._handleOnDateSelected}
        />
        <div style={{ paddingTop: 20, textAlign: "center" }}>
          {selectedDates.length ? <p>Selected:</p> : null}
          {selectedDates.map(date => (
            <p>{`${date.getMonth() +
              1}/${date.getDate()}/${date.getFullYear()}`}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default Multi;
