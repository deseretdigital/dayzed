import React from 'react';
import BaseDatePicker from './BaseDatePicker';
import { datePickerPropTypes } from './propTypes';

class DatePicker extends React.Component {
  /* eslint-disable-next-line */
  _handleOnDateSelected = ({ selected, selectable, date }) => {
    const { selected: selectedDate, onChange, onDateSelected } = this.props;
    onDateSelected && onDateSelected({ selected, selectable, date });

    if (!selectable) {
      return;
    }

    let newDate = date;
    if (selectedDate && selectedDate.getTime() === date.getTime()) {
      newDate = null;
    }

    onChange && onChange(newDate);
  };

  render() {
    return (
      <BaseDatePicker
        {...this.props}
        onDateSelected={this._handleOnDateSelected}
      />
    );
  }
}

DatePicker.propTypes = datePickerPropTypes;

export default DatePicker;
