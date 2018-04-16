import React from 'react';
import Datepicker from './Datepicker';

class Single extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('04/01/2018')
  };

  _handleToday = () => {
    this.setState({
      date: new Date()
    });
  };

  _handleApril = () => {
    this.setState({
      date: new Date('04/01/2018')
    });
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
    let { selectedDate, date } = this.state;
    return (
      <div>
        <Datepicker
          date={date}
          selected={this.state.selectedDate}
          onDateSelected={this._handleOnDateSelected}
        />
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
          <button data-test="todayButton" onClick={this._handleToday}>
            Jump To Today
          </button>
        </div>
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
          <button data-test="goToAprilButton" onClick={this._handleApril}>
            Jump To April 2018
          </button>
        </div>
        {this.state.selectedDate && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p data-test="dateSelected">{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Single;
