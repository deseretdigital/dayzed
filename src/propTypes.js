import PropTypes from 'prop-types';

export const dayzedPropTypes = {
  render: PropTypes.func,
  children: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  monthsToDisplay: PropTypes.number,
  firstDayOfWeek: PropTypes.number,
  fillAdjacentMonths: PropTypes.bool,
  offset: PropTypes.number,
  onDateSelected: PropTypes.func.isRequired,
  onOffsetChanged: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(Date),
    PropTypes.instanceOf(Date)
  ])
};

export const baseDatePickerPropTypes = {
  ...dayzedPropTypes
};

export const datePickerPropTypes = {
  ...baseDatePickerPropTypes,
  onChange: PropTypes.func,
  onDateSelected: PropTypes.func
};

export const multiDatePickerPropTypes = {
  ...datePickerPropTypes,
  selected: PropTypes.arrayOf(Date)
};

export const rangeDatePickerPropTypes = {
  ...datePickerPropTypes,
  selected: PropTypes.arrayOf(Date)
};
