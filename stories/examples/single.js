import React from 'react';
import Datepicker from './Datepicker';

class Single extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('04/01/2018'),
    firstDayOfWeek: 0
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

  _handleFirstDayOfWeek = () => {
    this.setState(state => ({
      firstDayOfWeek: state.firstDayOfWeek === 0 ? 1 : 0
    }));
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
    let { selectedDate, date, firstDayOfWeek } = this.state;
    return (
      <div>
        <Datepicker
          date={date}
          firstDayOfWeek={firstDayOfWeek}
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
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
          <button
            data-test="firstDayOfWeekButton"
            onClick={this._handleFirstDayOfWeek}
          >
            Switch First Day of Week to{' '}
            {firstDayOfWeek === 0 ? 'Monday' : 'Sunday'}
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
