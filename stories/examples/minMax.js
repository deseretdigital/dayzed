import React from "react";
import Datepicker from "./Datepicker";

class MinMax extends React.Component {
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
    let minDate = new Date();
    let maxDate = new Date();
    // Set maxDate as 30 days from today.
    maxDate.setDate(maxDate.getDate()+30);
    return (
      <div>
        <Datepicker
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
          minDate={minDate}
          maxDate={maxDate}
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

export default MinMax;
