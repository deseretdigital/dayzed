import React from 'react';
import Datepicker from './Datepicker';

class Multi extends React.Component {
  state = {
    selectedDates: [],
    date: new Date('05/01/2018')
  };

  _handleOnChange = selected => {
    this.setState({
      selectedDates: selected
    });
  };

  render() {
    let { selectedDates, date } = this.state;
    return (
      <div>
        <Datepicker
          multi
          date={date}
          selected={this.state.selectedDates}
          onChange={this._handleOnChange}
        />
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
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
