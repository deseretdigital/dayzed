import React from 'react';
import isSameDay from 'date-fns/is_same_day';
import compareAsc from 'date-fns/compare_asc';

import BaseDatePicker from './BaseDatePicker';
import { composeEventHandlers, isInRange } from './utils';
import { rangeDatePickerPropTypes } from './propTypes';

class RangeDatePicker extends React.Component {
  static defaultProps = {
    selected: []
  };

  state = { hoveredDate: null };

  setHoveredDate = date => {
    this.setState(
      state => (state.hoveredDate === date ? null : { hoveredDate: date })
    );
  };

  // Calendar level
  onMouseLeave = () => {
    this.setHoveredDate(null);
  };

  // Date level
  onHoverFocusDate(date) {
    if (!this.props.selected.length) {
      return;
    }
    this.setHoveredDate(date);
  }

  /* eslint-disable-next-line */
  _handleOnDateSelected = ({ selected, selectable, date }) => {
    const { selected: selectedDates, onDateSelected, onChange } = this.props;
    onDateSelected && onDateSelected({ selected, selectable, date });

    if (!selectable) {
      return;
    }

    const dateTime = date.getTime();
    let newDates = [...selectedDates];
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        const firstTime = selectedDates[0].getTime();
        if (firstTime < dateTime) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
      } else if (newDates.length === 2) {
        newDates = [date];
      }
    } else {
      newDates.push(date);
    }

    onChange && onChange(newDates);
  };

  getEnhancedDateProps = (
    getDateProps,
    dateBounds,
    { onMouseEnter, onFocus, ...restProps }
  ) => {
    const { date } = restProps.dateObj;
    return getDateProps({
      ...restProps,
      inRange: isInRange(dateBounds, date),
      start: dateBounds[0] && isSameDay(dateBounds[0], date),
      end: dateBounds[1] && isSameDay(dateBounds[1], date),
      onMouseEnter: composeEventHandlers(onMouseEnter, () => {
        this.onHoverFocusDate(date);
      }),
      onFocus: composeEventHandlers(onFocus, () => {
        this.onHoverFocusDate(date);
      })
    });
  };

  getEnhancedRootProps = (getRootProps, props) =>
    getRootProps({
      ...props,
      onMouseLeave: this.onMouseLeave
    });

  render() {
    const { children: childrenFn, render, ...rest } = this.props;
    const children = render || childrenFn;
    const { selected } = this.props;

    const dateBounds =
      selected.length === 2 || !selected.length
        ? selected
        : [selected[0], this.state.hoveredDate].sort(compareAsc);

    return (
      <BaseDatePicker
        {...rest}
        onDateSelected={this._handleOnDateSelected}
        render={({ getRootProps, getDateProps, ...renderProps }) => {
          return children({
            ...renderProps,
            getRootProps: this.getEnhancedRootProps.bind(this, getRootProps),
            getDateProps: this.getEnhancedDateProps.bind(
              this,
              getDateProps,
              dateBounds
            )
          });
        }}
      />
    );
  }
}

RangeDatePicker.propTypes = rangeDatePickerPropTypes;

export default RangeDatePicker;
