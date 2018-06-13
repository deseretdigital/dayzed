import React from 'react';
import Datepicker from './Datepicker';

class MinMax extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('05/01/2018'),
    minDate: new Date('05/04/2018'),
    maxDate: new Date('06/27/2018')
  };

  _handleOnChange = selected => {
    this.setState({ selectedDate: selected });
  };

  render() {
    let { selectedDate, date, minDate, maxDate } = this.state;
    return (
      <div>
        <Datepicker
          date={date}
          selected={this.state.selectedDate}
          onChange={this._handleOnChange}
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
