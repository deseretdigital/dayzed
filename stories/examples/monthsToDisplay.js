import React from 'react';
import Datepicker from './Datepicker';

class MonthsToDisplay extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('05/01/2018'),
    monthsToDisplay: 2
  };

  _handleOnChange = selected => {
    this.setState({
      selectedDate: selected
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
          onChange={this._handleOnChange}
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
