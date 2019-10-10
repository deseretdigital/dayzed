import React from 'react';
import Datepicker from './Datepicker';

class MonthsToDisplay extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('05/01/2018'),
    monthsToDisplay: 2
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

  _toggleMonthsToDisplay = () => {
    this.setState(state => ({
      monthsToDisplay: state.monthsToDisplay === 1 ? 2 : 1
    }));
  };

  render() {
    let { selectedDate, date } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ paddingBottom: 10 }}>
          <button
            data-test="monthsToDisplay"
            onClick={this._toggleMonthsToDisplay}
          >
            Toggle Months To Display
          </button>
        </div>
        <Datepicker
          date={date}
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
          monthsToDisplay={this.state.monthsToDisplay}
        />
        {this.state.selectedDate && (
          <div style={{ paddingTop: 20 }}>
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default MonthsToDisplay;
