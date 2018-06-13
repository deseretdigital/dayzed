import React from 'react';
import { dayzedPropTypes } from './propTypes';

import {
  composeEventHandlers,
  requiredProp,
  unwrapChildrenForPreact,
  subtractMonth,
  addMonth,
  isBackDisabled,
  isForwardDisabled,
  getCalendars
} from './utils';

class Dayzed extends React.Component {
  state = { offset: 0 };

  /*------------------------- React Component Lifecycle Methods ---*/

  render() {
    const {
      date,
      selected,
      monthsToDisplay,
      minDate,
      maxDate,
      firstDayOfWeek,
      fillAdjacentMonths
    } = this.props;
    const calendars = getCalendars({
      date,
      selected,
      monthsToDisplay,
      minDate,
      maxDate,
      offset: this.getOffset(),
      firstDayOfWeek,
      fillAdjacentMonths
    });
    const children = unwrapChildrenForPreact(
      this.props.render || this.props.children
    );
    return children({
      calendars,
      getDateProps: this.getDateProps,
      getBackProps: this.getBackProps,
      getForwardProps: this.getForwardProps
    });
  }

  /*------------------------- Prop Getters ---*/

  getBackProps = ({
    onClick,
    offset = 1,
    calendars = requiredProp('getBackProps', 'calendars'),
    ...rest
  } = {}) => {
    const { minDate } = this.props;
    const offsetMonth = this.getOffset();
    return {
      onClick: composeEventHandlers(onClick, () => {
        this.onOffsetChanged(
          offsetMonth - subtractMonth({ calendars, offset, minDate })
        );
      }),
      disabled: isBackDisabled({ calendars, offset, minDate }),
      'aria-label': `Go back ${offset} month${offset === 1 ? '' : 's'}`,
      ...rest
    };
  };

  getForwardProps = ({
    onClick,
    offset = 1,
    calendars = requiredProp('getForwardProps', 'calendars'),
    ...rest
  } = {}) => {
    const { maxDate } = this.props;
    const offsetMonth = this.getOffset();
    return {
      onClick: composeEventHandlers(onClick, () => {
        this.onOffsetChanged(
          offsetMonth + addMonth({ calendars, offset, maxDate })
        );
      }),
      disabled: isForwardDisabled({ calendars, offset, maxDate }),
      'aria-label': `Go forward ${offset} month${offset === 1 ? '' : 's'}`,
      ...rest
    };
  };

  getDateProps = ({
    onClick,
    dateObj = requiredProp('getDateProps', 'dateObj'),
    ...rest
  } = {}) => {
    return {
      onClick: composeEventHandlers(onClick, () => {
        this.props.onDateSelected(dateObj);
      }),
      disabled: !dateObj.selectable,
      'aria-label': dateObj.date.toDateString(),
      'aria-pressed': dateObj.selected,
      role: 'button',
      ...rest
    };
  };

  /*------------------------- Control Props ---*/

  getOffset = () => {
    return this.isOffsetControlled() ? this.props.offset : this.state.offset;
  };

  isOffsetControlled = () => {
    return this.props.offset !== undefined;
  };

  onOffsetChanged = newOffset => {
    if (this.isOffsetControlled()) {
      this.props.onOffsetChanged(newOffset);
    } else {
      this.setState({ offset: newOffset }, () => {
        this.props.onOffsetChanged(newOffset);
      });
    }
  };
}

Dayzed.defaultProps = {
  date: new Date(),
  monthsToDisplay: 1,
  onOffsetChanged: () => {},
  firstDayOfWeek: 0,
  fillAdjacentMonths: false
};

Dayzed.propTypes = dayzedPropTypes;

export default Dayzed;
