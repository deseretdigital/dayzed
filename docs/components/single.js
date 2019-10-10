import React from 'react';
import Datepicker from './Datepicker';

class Single extends React.Component {
  state = {
    selectedDate: null,
    date: new Date('04/01/2018'),
    firstDayOfWeek: 0,
    showOutsideDays: false
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

  _handleFirstDayOfWeek = firstDayOfWeek => {
    this.setState(state => ({
      firstDayOfWeek
    }));
  };

  _handleShowOutsideDays = () => {
    this.setState(state => ({
      showOutsideDays: !state.showOutsideDays
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
    let { selectedDate, date, firstDayOfWeek, showOutsideDays } = this.state;
    return (
      <div>
        <Datepicker
          date={date}
          selected={selectedDate}
          firstDayOfWeek={firstDayOfWeek}
          showOutsideDays={showOutsideDays}
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
          <div>Set First Day of The Week</div>
          {['Su', 'M', 'T', 'W', 'Th', 'F', 'S'].map((day, i) => (
            <button
              data-test={`firstDayOfWeekButton${day}`}
              key={day}
              onClick={this._handleFirstDayOfWeek.bind(this, i)}
              style={{ background: firstDayOfWeek === i ? 'purple' : null }}
            >
              {day}
            </button>
          ))}
        </div>
        <div style={{ paddingTop: 20, textAlign: 'center' }}>
          <button
            data-test="showOutsideDaysButton"
            onClick={this._handleShowOutsideDays}
          >
            Toggle Show Outside Days: {showOutsideDays ? 'True' : 'False'}
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
