import React from 'react';
import BaseDatePicker from './BaseDatePicker';
import { multiDatePickerPropTypes } from './propTypes';

const getDateIndex = (dates, condition) => {
  let index;
  dates.some((date, i) => {
    index = i;
    if (condition(date.getTime())) {
      return true;
    }
    // If we loop through all the selected dates and still didn't find
    // one, make sure to add it to the end of the array.
    index++;
    return false;
  });
  return index;
};

class MultiDatePicker extends React.Component {
  /* eslint-disable-next-line */
  _handleOnDateSelected = ({ selected, selectable, date }) => {
    const {
      selected: selectedDates = [],
      onDateSelected,
      onChange
    } = this.props;
    onDateSelected && onDateSelected({ selected, selectable, date });

    if (!selectable) {
      return;
    }

    const newSelectedDates = [].concat(selectedDates);
    const selectedTime = date.getTime();
    // Remove
    if (selected) {
      const index = getDateIndex(selectedDates, time => selectedTime === time);
      newSelectedDates.splice(index, 1);
    } else {
      // Add
      const index = getDateIndex(selectedDates, time => selectedTime < time);
      newSelectedDates.splice(index, 0, date);
    }

    onChange && onChange(newSelectedDates);
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

MultiDatePicker.propTypes = multiDatePickerPropTypes;

export default MultiDatePicker;
