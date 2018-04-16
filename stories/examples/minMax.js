import React from 'react';
import Datepicker from './Datepicker';

class MinMax extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('05/01/2018'),
    minDate: new Date('05/04/2018'),
    maxDate: new Date('06/27/2018')
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
    let { selectedDate, date, minDate, maxDate } = this.state;
    return (
      <div>
        <Datepicker
          date={date}
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
          minDate={minDate}
          maxDate={maxDate}
        />
        {this.state.selectedDate && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default MinMax;
